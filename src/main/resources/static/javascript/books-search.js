let authorArray = [];

function searchTitle() {

    let urlBeginning = "https://www.googleapis.com/books/v1/volumes?q=";
    let searchTerm;
    let urlEnding = "&key=AIzaSyA_fNlN4nm1Dkba-D2XE1smV04vA5_42zY&maxResults=20";

    searchTerm = document.getElementById("userSearchTerm").value;

    let url = urlBeginning + searchTerm + urlEnding;

    buildHTMLResultsTable(url);

}

function buildHTMLResultsTable(url) {
    fetch(url)
    .then(function(response) {
    response.json().then(function(json) {
        const arrayOfBookObjects = json.items;
        const resultsTable = document.getElementById("resultsTable"); //See search.html template
        const filters = document.getElementById("filters"); //See search.html template
        let tableBeginning = `
            <table>
                <thead>
                    <tr>
                        <th id="posterColumnHeader"></th>
                        <th id="titleColumnHeader" onclick="sortTableByTitle()">Title</th>
                        <th id="authorColumnHeader" onclick="sortTableByAuthor">Author</th>
                        <th id="yearColumnHeader" onclick="sortTableByYear()">Year</th>
                        <th id="genre1ColumnHeader" onclick="sortTableByGenre1()">Genre</th>
                        <th id="synopsisColumnHeader">Synopsis</th>
                    </tr>
                </thead>
                <tbody>
        `;
        let tableRows = "";
        //Generate Filter HTML
        let yearFilterHTML = `
            <input type="number" id="userYearMin">
            <input type="number" id="userYearMax">
        `
        let authorsListItems = "";
        for (let i = 0; i < arrayOfBookObjects.length; i++) {
            const book = arrayOfBookObjects[i];
            if (book.volumeInfo.publishedDate === null) {
                break;
            }
            if (!authorArray.includes(book.volumeInfo.authors[0])){
                authorArray.push(book.volumeInfo.authors[0]);
                authorsListItems += `<input type="checkbox" value="${book.volumeInfo.authors[0]}">${book.volumeInfo.authors[0]}</input>`
            }
            if (!book.volumeInfo.imageLinks) {
                break;
            }

        //Generate Results Table Rows
        tableRows += `
            <tr id="rowIndex${i}">
                <th class="posterCell">
                    <img class="poster" src="${book.volumeInfo.imageLinks.thumbnail}"><br>
                </th>
                <th class="titleCell">
                    <a id="bookTitle${i}" href="/books/details/${book.title}">${book.volumeInfo.title}</a><br><br>
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
                    <p id="bookDate${i}">${book.volumeInfo.publishedDate}</p>
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
        filters.innerHTML = yearFilterHTML + authorsListItems;
        let tableEnding = `</tbody></table>`;
        resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
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

function filter (userYearMin, userYearMax) {
    //Author Filtering - Checkboxes
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkedBoxes = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedBoxes.push(checkboxes[i].value);
        }
    }

    //Date Filtering - Year Range
    let yearMin = userYearMin.value;
    let yearMax = userYearMax.value;

    for (let i=0; i<100; i++) {
        let author = document.getElementById(`bookAuthor${i}`);
        let year;
        let yearElement = document.getElementById(`bookDate${i}`);
        if (yearElement === null) {
            break;
        } else {
            year = yearElement.innerHTML;
        }
        let year1 = parseInt(year.slice(0,4));
        console.log(year1)
        console.log(typeof year1)
        console.log(yearMin.value)
        console.log(yearMax.value)
        if (author !== null && author.innerHTML !== undefined) {
            let array = Object.keys(checkedBoxes).map(key => checkedBoxes[key]);
            if (!array.includes(author.innerHTML)) {
                document.getElementById(`rowIndex${i}`).style.display = "none";
            } else {
                document.getElementById(`rowIndex${i}`).style.display = "";
            }
        if (year1 < yearMin || year1 > yearMax) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
        }
    }

    //Year Range Filtering
}