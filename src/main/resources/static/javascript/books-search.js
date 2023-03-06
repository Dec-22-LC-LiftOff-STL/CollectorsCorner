//For toggling sort asc/desc
let isAscendingTitle = true;
let isAscendingAuthor = true;
let isAscendingYear = true;
let isAscendingGenre = true;

window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}

function limitSynopsisTextHeight() {
    const elements = document.getElementsByClassName("synopsisText");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].scrollHeight <= 150) {
            elements[i].classList.remove("synopsisText");
        }
    }
}

//SEARCH AND BUILD HTML

function searchTitle() {
    const searchTerm = document.getElementById("userSearchTerm").value;
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=AIzaSyA_fNlN4nm1Dkba-D2XE1smV04vA5_42zY&maxResults=30&langRestrict=en";
    buildHTMLResultsTable(url);
    document.getElementById("showFiltersButton").style.display = "block";
}

function searchAuthor() {
    let searchTerm = document.getElementById("userSearchTerm").value;
    let url = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + searchTerm + "&key=AIzaSyA_fNlN4nm1Dkba-D2XE1smV04vA5_42zY&maxResults=30&langRestrict=en";
    buildHTMLResultsTable(url);
    //Only display the "Show Filters" button after someone searches
    document.getElementById("showFiltersButton").style.display = "block";
}

function searchIsbn() {
    let searchTerm = document.getElementById("userSearchTerm").value.replace("-","");
    let url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + searchTerm + "&key=AIzaSyA_fNlN4nm1Dkba-D2XE1smV04vA5_42zY&maxResults=10";
    buildHTMLResultsTable(url);
    //Only display the "Show Filters" button after someone searches
    document.getElementById("showFiltersButton").style.display = "block";
}

function handleSearch() {
    const searchTerm = searchTypeDropdown.value;
    if (searchTerm === 'title') {
        searchTitle();
        event.preventDefault();
    } else if (searchTerm === 'author') {
        searchAuthor();
        event.preventDefault();
    } else if (searchTerm === 'isbn') {
        searchIsbn();
        event.preventDefault();
    }
}

function buildHTMLResultsTable(url) {
    fetch(url)
    .then(function(response) {
    response.json().then(function(json) {
        const arrayOfBookObjects = json.items;
        const resultsTableDiv = document.getElementById("resultsTable"); //Lives on search.html template
        const filtersDiv = document.getElementById("filters"); //Lives on search.html template
        let tableBeginning = `
            <table id="booksResultsTable">
                <thead>
                    <tr class="booksResultsHeaderRow">
                        <th id="posterColumnHeader"></th>
                        <th id="titleColumnHeader" onclick="sortTableByTitle()">Title</th>
                        <th id="authorColumnHeader" onclick="sortTableByAuthor()">Author</th>
                        <th id="yearColumnHeader" onclick="sortTableByYear()">Year</th>
                        <th id="genreColumnHeader" onclick="sortTableByGenre()">Genre</th>
                        <th id="synopsisColumnHeader">Synopsis</th>
                    </tr>
                </thead>
                <tbody>
        `;
        let tableRows = "";
        //Validation - clean up results by skipping books where the author/image/year/genre/synopsis is missing from its JSON data
        const arrayOfValidatedBookObjects = [];
        for (let i = 0; i < arrayOfBookObjects.length; i++) {
            const unvalidatedBook = arrayOfBookObjects[i];
            if (unvalidatedBook.volumeInfo.authors && unvalidatedBook.volumeInfo.imageLinks && unvalidatedBook.volumeInfo.publishedDate !== null
                && unvalidatedBook.volumeInfo.categories && unvalidatedBook.volumeInfo.description) {
                arrayOfValidatedBookObjects.push(unvalidatedBook);
            }
        }
        //Loop through array of book objects that passed the validation
        for (let i = 0; i < arrayOfValidatedBookObjects.length; i++) {
        const book = arrayOfValidatedBookObjects[i];
        //Turns date from 'yyyy-mm-dd' to 'yyyy'
        const year = book.volumeInfo.publishedDate.slice(0, 4);
        //Generate Results Table Rows
        tableRows += `
            <tr id="rowIndex${i}" class="booksResultsTableRows">
                <th class="posterCell">
                    <img class="poster" src="${book.volumeInfo.imageLinks.thumbnail}"><br>
                    <p id="bookImageURL${i}" hidden> ${book.volumeInfo.imageLinks.thumbnail}</p><br>
                    <button id="dropdown-button${i}" class="btn btn-primary" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i})">Add to Collection</button>
                    <form id="userCollectionDropdown${i}" style="display:none;"><br>
                        <button class="btn btn-success confirmButton" onclick="addNewBookToDatabase(event);">Confirm</button>
                    </form>
                </th>
                <th class="titleCell">
                    <a id="bookTitle${i}" href="/books/details/${book.volumeInfo.title}">${book.volumeInfo.title}</a>
                    <p id="googleBooksApiId${i}" hidden>${book.id}</p>
                </th>
                <th class="authorCell">
                    <p id="bookAuthor${i}" class="bookAuthor">${book.volumeInfo.authors[0]}</p>
                </th>
                <th class="yearCell">
                    <p id="bookDate${i}" class="bookDate">${year}</p>
                </th>
                <th class="genre1Cell">
                    <p id="bookGenres${i}" class="bookGenres">${book.volumeInfo.categories}</p>
                </th>
                <th class="synopsisCell">
                    <p id="bookSynopsis${i}" class="synopsisText">${book.volumeInfo.description}</p>
                    <a href="/books/details/${book.volumeInfo.title}" class="readMore">Read more</a>
                </th>
            </tr>
        `;
        }
        let tableEnding = `</tbody></table>`;
        resultsTableDiv.innerHTML = tableBeginning + tableRows + tableEnding;
        screenModeTable();
    });
    });
}

function toggleAddToCollectionDropdownForm(i) {
    const dropdownForm = document.getElementById(`userCollectionDropdown${i}`);
    if (dropdownForm.style.display === "none") {
        dropdownForm.style.display = "block";
    } else {
        dropdownForm.style.display = "none";
    }
}

function toggleShowHideFilters() {
    if (document.getElementById("showFiltersButton").innerHTML === "Show Filters") {
        document.getElementById("showFiltersButton").innerHTML = "Hide Filters";
        document.getElementById("showFiltersButton").className = "btn btn-danger";
    } else {
        document.getElementById("showFiltersButton").innerHTML = "Show Filters"
        document.getElementById("showFiltersButton").className = "btn btn-primary";
    }
    if (document.getElementById("filtersSection").style.display === "block") {
        document.getElementById("filtersSection").style.display = "none";
    } else {
        document.getElementById("filtersSection").style.display = "block";
    }
}

//DATABASE INTERACTION

function prepareDatabaseInformationForm(i) {
    const googleBooksApiIdApiId = document.getElementById(`googleBooksApiId${i}`).textContent;
    const bookTitle = document.getElementById(`bookTitle${i}`).textContent;
    const bookAuthor = document.getElementById(`bookAuthor${i}`).textContent;
    const bookDate = document.getElementById(`bookDate${i}`).textContent.slice(0,4);
    const bookSynopsis = document.getElementById(`bookSynopsis${i}`).textContent;
    const bookGenres = document.getElementById(`bookGenres${i}`).textContent;
    const bookImageURL = document.getElementById(`bookImageURL${i}`).textContent;

    document.getElementById("titleSubmission").value = bookTitle;
    document.getElementById("authorSubmission").value = bookAuthor;
    document.getElementById("dateSubmission").value = new Date();
    document.getElementById("imageURLSubmission").value = bookImageURL;
    document.getElementById("genreSubmission").value = bookGenres.split(",")[0]
    document.getElementById("yearSubmission").value = bookDate.slice(0,4);
    document.getElementById("synopsisSubmission").value = bookSynopsis
}

function addNewBookToDatabase() {
    event.preventDefault();
    let collectionDropdown = document.getElementById("collectionNamesDropdown");
    let collectionIdsAndBooks = document.getElementById("collectionIdsAndBooks");
    let collectionIdsAndBooksArray = collectionIdsAndBooks.innerHTML.split('}],');
        if (collectionDropdown.value === '') {
            alert("Don't forget to select the collection you want to add to!")
            return;
        }
        for (let i=0; i<collectionIdsAndBooksArray.length; i++) {
            //Split each iteration into array with length 2. First index = collectionId, Second index = .toString() of all books in that collection
            let id = collectionIdsAndBooksArray[i].split('=[Book{')[0];
            let text = collectionIdsAndBooksArray[i].split('=[Book{')[1];
            //If the collection is empty, allow any addition.
            if (text === undefined) {
                break;
            }
            // If the id matches the id of the Collection the user chose in the collection dropdown below the search bar, check the .toString()
            // text for an exact match of the book the user is attempting to add to that collection. If there is already an exact match,
            // prevent the addition by presenting an alert warning and return (preventing a duplicate addition of the book to the collection)
            if (id.includes(collectionDropdown.value) && text.includes(document.getElementById('synopsisSubmission').value)) {
                alert(collectionNamesDropdown.options[collectionNamesDropdown.selectedIndex].text + ' already contains ' + document.getElementById('titleSubmission').value + '!');
                return;
            }
        }
    document.getElementById("databaseInformation").submit();
}

//SORTING

function sortTableByTitle() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const titleA = rowA.querySelector('[id^="bookTitle"]').textContent;
    const titleB = rowB.querySelector('[id^="bookTitle"]').textContent;
    if (titleA < titleB) {
        return -1;
    } else if (titleA > titleB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingTitle) {
        rows.reverse();
    }

    isAscendingTitle = !isAscendingTitle;
    //Same thing as using:  table.tBodies[0].append(rows[0], rows[1], rows[2], ...)
    table.tBodies[0].append(...rows);
}

function sortTableByAuthor() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const nameArrayAuthorA = rowA.querySelector('[id^="bookAuthor"]').textContent.split(' ');
    const authorA = nameArrayAuthorA[nameArrayAuthorA.length - 1]
    console.log(typeof authorA)

    const nameArrayAuthorB = rowB.querySelector('[id^="bookAuthor"]').textContent.split(' ');
    const authorB = nameArrayAuthorB[nameArrayAuthorB.length - 1]
    if (authorA < authorB) {
        return -1;
    } else if (authorA > authorB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingAuthor) {
        rows.reverse();
    }

    isAscendingAuthor = !isAscendingAuthor;
    //Same thing as using:  table.tBodies[0].append(rows[0], rows[1], rows[2], ...)
    table.tBodies[0].append(...rows);
} //sorts by author last name

function sortTableByYear() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const yearA = rowA.querySelector('[id^="bookDate"]').textContent;
    const yearB = rowB.querySelector('[id^="bookDate"]').textContent;
    if (yearA < yearB) {
        return -1;
    } else if (yearA > yearB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingYear) {
        rows.reverse();
    }

    isAscendingYear = !isAscendingYear;
    //Same thing as using:  table.tBodies[0].append(rows[0], rows[1], rows[2], ...)
    table.tBodies[0].append(...rows);
}

function sortTableByGenre() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const genreA = rowA.querySelector('[id^="bookGenre"]').textContent;
    const genreB = rowB.querySelector('[id^="bookGenre"]').textContent;
    if (genreA < genreB) {
        return -1;
    } else if (genreA > genreB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingGenre) {
        rows.reverse();
    }

    isAscendingGenre = !isAscendingGenre;
    //Same thing as using:  table.tBodies[0].append(rows[0], rows[1], rows[2], ...)
    table.tBodies[0].append(...rows);
}

//FILTERS - CHECKBOXES

function generateAuthorCheckboxHTML() {
    let authors = [];
    let authorsWithCheckbox = "";
    let i = 0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (document.getElementById(`rowIndex${i}`).style.display !== "none") {
            author = document.getElementById(`bookAuthor${i}`).innerHTML;
            if (!authors.includes(author)) {
                authors.push(author);
                authorsWithCheckbox += `<label><input type="checkbox" name="author" value="${author}" checked> ${author}</label>`;
            }
        }
        i++;
    }
    document.getElementById("authorCheckboxes").innerHTML = authorsWithCheckbox;
}

function generateGenreCheckboxHTML() {
    let genres = [];
    let genresWithCheckbox = "";

    let i = 0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (document.getElementById(`rowIndex${i}`).style.display !== "none") {
            genre = document.getElementById(`bookGenres${i}`).innerHTML;
            if (!genres.includes(genre)) {
                genres.push(genre);
                genresWithCheckbox += `<label><input type="checkbox" name="genre" value="${genre}" checked> ${genre}</label>`;
            }
        }
        i++;
    }
    document.getElementById("genreCheckboxes").innerHTML = genresWithCheckbox;
}

function showOrHideRowsBasedOnAuthorCheckboxFilters() {
    let selectedAuthors = [];
    const checkboxContainer = document.querySelector('#authorCheckboxes');
    const checkboxes = checkboxContainer.querySelectorAll('input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
        selectedAuthors.push(checkboxes[i].value);
        }
    }
    let i=0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (!selectedAuthors.includes(document.getElementById(`bookAuthor${i}`).innerHTML)) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
        i++;
    }
}

function showOrHideRowsBasedOnGenreCheckboxFilters() {
    let selectedGenres = [];
    const checkboxContainer = document.querySelector('#genreCheckboxes');
    const checkboxes = checkboxContainer.querySelectorAll('input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedGenres.push(checkboxes[i].value);
        }
    }
    let i=0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (!selectedGenres.includes(document.getElementById(`bookGenres${i}`).innerHTML)) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
        i++;
    }
}

function toggleCheckUncheckAuthorBoxes() {
    const selectAllAuthorsButton = document.getElementById('selectAllAuthorsButton');
    const unselectAllAuthorsButton = document.getElementById('unselectAllAuthorsButton');
    const authorCheckboxes = document.getElementById('authorCheckboxes');
    let checkboxState = false;

    selectAllAuthorsButton.addEventListener('click', function() {
        checkboxState = true;
        const checkboxes = authorCheckboxes.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = checkboxState;
        });
    });

    unselectAllAuthorsButton.addEventListener('click', function() {
        checkboxState = false;
        const checkboxes = authorCheckboxes.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = checkboxState;
        });
    });
}

function toggleCheckUncheckGenreBoxes() {

    const selectAllGenresButton = document.getElementById('selectAllGenresButton');
    const unselectAllGenresButton = document.getElementById('unselectAllGenresButton');
    const genreCheckboxes = document.getElementById('genreCheckboxes');

    selectAllGenresButton.addEventListener('click', function() {
        const checkboxes = genreCheckboxes.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = true;
        });
    });

    unselectAllGenresButton.addEventListener('click', function() {
        const checkboxes = genreCheckboxes.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
    });
}

//Fixes a bug that requires two clicks of the Unselect All button for Genres
window.addEventListener('load', toggleCheckUncheckGenreBoxes);

//FILTERS - YEARS

function filterYears (userYearMin, userYearMax) {
    let yearMin = userYearMin.value;
    let yearMax = userYearMax.value;

    if (userYearMin.value === '') {
        yearMin = 0;
    }

    if (userYearMax.value === '') {
        yearMax = 2100;
    }

    let i=0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        let author = document.getElementById(`bookAuthor${i}`);
        let yearString = document.getElementById(`bookDate${i}`).innerHTML;
        let year = parseInt(yearString);

        if (year < yearMin || year > yearMax) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
        i++;
    }
}
