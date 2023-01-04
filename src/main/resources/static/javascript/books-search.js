let authorArray = [];

function searchTitle() {

    let urlBeginning = "https://www.googleapis.com/books/v1/volumes?q=";
    let searchTerm;
    let urlEnding = "&key=AIzaSyA_fNlN4nm1Dkba-D2XE1smV04vA5_42zY&maxResults=20";

    searchTerm = document.getElementById("userSearchTerm").value;

    let url = urlBeginning + searchTerm + urlEnding;

    buildHTMLResultsTable(url);
    //Only display the "Show Filters" button after someone searches
    document.getElementById("showFiltersButton").style.display = "block";
}

function buildHTMLResultsTable(url) {
    fetch(url)
    .then(function(response) {
    response.json().then(function(json) {
        const arrayOfBookObjects = json.items;
        const resultsTableDiv = document.getElementById("resultsTable"); //Lives on search.html template
        const filtersDiv = document.getElementById("filters"); //Lives on search.html template
        let tableBeginning = `
            <table>
                <thead>
                    <tr>
                        <th id="posterColumnHeader"></th>
                        <th id="titleColumnHeader" onclick="sortTableByTitle()">Title</th>
                        <th id="authorColumnHeader" onclick="sortTableByAuthor">Author</th>
                        <th id="yearColumnHeader" onclick="sortTableByYear()">Year</th>
                        <th id="genreColumnHeader" onclick="sortTableByGenre()">Genre</th>
                        <th id="synopsisColumnHeader">Synopsis</th>
                    </tr>
                </thead>
                <tbody>
        `;
        let tableRows = "";
        //Validation - clean up results by skipping books where the author/image/year/genre is missing from its JSON data
        const arrayOfValidatedBookObjects = [];
        for (let i = 0; i < arrayOfBookObjects.length; i++) {
            const unvalidatedBook = arrayOfBookObjects[i];
            if (unvalidatedBook.volumeInfo.authors && unvalidatedBook.volumeInfo.imageLinks && unvalidatedBook.volumeInfo.publishedDate !== null && unvalidatedBook.volumeInfo.categories) {
                arrayOfValidatedBookObjects.push(unvalidatedBook);
            }
        }
        //Loop through array of book objects that passed the validation
        for (let i = 0; i < arrayOfValidatedBookObjects.length; i++) {
        const book = arrayOfValidatedBookObjects[i];
        const year = book.volumeInfo.publishedDate.slice(0, 4);
        //Generate Results Table Rows
        tableRows += `
            <tr id="rowIndex${i}">
                <th class="posterCell">
                    <img class="poster" src="${book.volumeInfo.imageLinks.thumbnail}"><br>
                </th>
                <th class="titleCell">
                    <a id="bookTitle${i}" href="/books/details/${book.volumeInfo.title}">${book.volumeInfo.title}</a><br><br>
                    <button id="dropdown-button${i}" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i})">Add to Collection</button>
                    <p id="googleBooksApiId${i}" hidden>${book.id}</p>
                    <form id="userCollectionDropdown${i}" style="display:none;"><hr>
                        <label>User Collection:</label><br>
                        <select>
                            <option value="collection1" selected>Collection 1</option>
                            <option value="collection2">Collection 2</option>
                            <option value="collection3">Collection 3</option>
                        </select>
                        <button type="button" onclick="addNewMovieToDatabase();">Submit</button>
                    </form>
                </th>
                <th class="authorCell">
                    <p id="bookAuthor${i}">${book.volumeInfo.authors[0]}</p>
                </th>
                <th class="yearCell">
                    <p id="bookDate${i}">${year}</p>
                </th>
                <th class="genre1Cell">
                    <p id="bookGenres${i}">${book.volumeInfo.categories}</p>
                </th>
                <th class="synopsisCell">
                    <p id="bookSynopsis${i}">${book.volumeInfo.description}</p>
                </th>
            </tr>
        `;
        }
        let tableEnding = `</tbody></table>`;
        resultsTableDiv.innerHTML = tableBeginning + tableRows + tableEnding;
    });
    });
}

function prepareDatabaseInformationForm(i) {
    const googleBooksApiIdApiId = document.getElementById(`googleBooksApiId${i}`).textContent;
    const bookTitle = document.getElementById(`bookTitle${i}`).textContent;
    const bookAuthor = document.getElementById(`bookAuthor${i}`).textContent;
    const bookDate = document.getElementById(`bookDate${i}`).textContent.slice(0,4);
    const bookSynopsis = document.getElementById(`bookSynopsis${i}`).textContent;
    const bookGenres = document.getElementById(`bookGenres${i}`).textContent;

    //Fills in the title on the form on search.html
    document.getElementById("titleSubmission").value = bookTitle;

    //Fills in the author on the form on search.html form
    document.getElementById("titleSubmission").value = bookAuthor;

    //Fills in the date on the form on search.html
    document.getElementById("dateSubmission").value = new Date();

    //Fills in the genres on the form on search.html
    document.getElementById("genreSubmission").value = bookGenres.split(",")[0]

    //Fills in the release year on the form on search.html form
    document.getElementById("yearSubmission").value = bookDate.slice(0,4);

    //Fills in the release year on the form on search.html form
    //The string is sliced to abide by the MySQL VARCHAR character limit
    document.getElementById("synopsisSubmission").value = bookSynopsis.slice(0,250);
}

function filterYears (userYearMin, userYearMax) {

    let yearMin = userYearMin.value;
    let yearMax = userYearMax.value;

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

function toggleShowHideFilters() {
    //Toggle button text between Show Filters & Hide Filters
    if (document.getElementById("showFiltersButton").innerHTML === "Show Filters") {
        document.getElementById("showFiltersButton").innerHTML = "Hide Filters";
    } else {
        document.getElementById("showFiltersButton").innerHTML = "Show Filters"
    }
    //Toggle between showing/hiding <div id="filtersSection"> on search.html
    if (document.getElementById("filtersSection").style.display === "block") {
        document.getElementById("filtersSection").style.display = "none";
    } else {
        document.getElementById("filtersSection").style.display = "block";
    }
}

function generateAuthorCheckboxHTML() {
    //Generate HTML
    let authors = [];
    let authorsWithCheckbox = "";
    let i = 0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (document.getElementById(`rowIndex${i}`).style.display !== "none") {
            author = document.getElementById(`bookAuthor${i}`).innerHTML;
            if (!authors.includes(author)) {
                authors.push(author);
                authorsWithCheckbox += `<input type="checkbox" name="author" value="${author}"> ${author}`;
            }
        }
        i++;
    }
    document.getElementById("authorCheckboxes").innerHTML = authorsWithCheckbox;

}

function handleAuthorCheckboxFilters() {
    let selectedAuthors = [];
    const checkboxContainer = document.querySelector('#authorCheckboxes');
    const checkboxes = checkboxContainer.querySelectorAll('input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
        selectedAuthors.push(checkboxes[i].value);
        }

    }
    for (let i=0; i<20; i++) {
        if (!selectedAuthors.includes(document.getElementById(`bookAuthor${i}`).innerHTML)) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
    }
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
                genresWithCheckbox += `<input type="checkbox" name="genre" value="${genre}"> ${genre}`;
            }
        }
        i++;
    }
    document.getElementById("genreCheckboxes").innerHTML = genresWithCheckbox;
}

function handleGenreCheckboxFilters() {
    let selectedGenres = [];
    const checkboxContainer = document.querySelector('#genreCheckboxes');
    const checkboxes = checkboxContainer.querySelectorAll('input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
        selectedGenres.push(checkboxes[i].value);
        }
    }
    for (let i=0; i<20; i++) {
        if (!selectedGenres.includes(document.getElementById(`bookGenres${i}`).innerHTML)) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
    }
}