window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}

function searchTitle() {

    let urlBeginning = "https://api.boardgameatlas.com/api/search?name=";
    let searchTerm;
    let urlEnding = "&client_id=P3yvzSB2mt";

    searchTerm = document.getElementById("userSearchTerm").value;

    let url = urlBeginning + searchTerm + urlEnding;
    buildHTMLResultsTable(url);
    //Only display the "Show Filters" button after someone searches
    document.getElementById("showFiltersButton").style.display = "block";
}

function buildHTMLResultsTable(url) {
    fetch(url).then(function(response) {
    response.json().then(function(json) {
    const arrayOfGameObjects = json.games;
    const resultsTable = document.getElementById("resultsTable"); //See search.html template
    let tableBeginning = `
    <table>
        <thead>
            <tr>
                <th id="posterColumnHeader"></th>
                <th id="titleColumnHeader" onclick="sortTableByTitle()">Title</th>
                <th id="yearColumnHeader" onclick="sortTableByYear()">Year</th>
                <th id="genre1ColumnHeader" onclick="sortTableByGenre1()">Genre</th>
                <th id="minPlayersColumnHeader" onclick="sortTableByMinPlayers()">Min. Players</th>
                <th id="maxPlayersColumnHeader" onclick="sortTableByMaxPlayers()">Max. Players</th>
                <th id="synopsisColumnHeader">Synopsis</th>
            </tr>
        </thead>
        <tbody>
    `;
    let tableRows = "";
    const arrayOfValidatedGameObjects = [];
    for (let i = 0; i < arrayOfGameObjects.length; i++) {
        const unvalidatedGame = arrayOfGameObjects[i];
        const blankCategory = [{ id: ' '}]
        if (unvalidatedGame.categories.length === 0) {
            unvalidatedGame.categories = blankCategory;
        }
        if (unvalidatedGame.thumb_url !== "https://s3-us-west-1.amazonaws.com/5cc.images/games/empty+box+thumb.jpg" && !arrayOfValidatedGameObjects.includes(unvalidatedGame)
            && unvalidatedGame.primary_publisher !== undefined && unvalidatedGame.primary_publisher.name !== undefined) {

                arrayOfValidatedGameObjects.push(unvalidatedGame);
        }
    }

    for (let i = 0; i < arrayOfValidatedGameObjects.length; i++) {
    const game = arrayOfValidatedGameObjects[i];
    console.log(arrayOfValidatedGameObjects)
        tableRows += `
            <tr>
                <th class="posterCell">
                    <img class="poster" src="${game.thumb_url}"><br>
                </th>
                <th class="titleCell">
                    <a id="gameTitle${i}" href="${game.name}">${game.name}</a><br><br>
                    <button id="dropdown-button${i}" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i});">Add to Collection</button>
                    <p id="boardGameAtlasApiId${i}" hidden>${game.id}</p>
                    <p id="gameCreator${i}" hidden>${game.primary_publisher.name}</p>
                    <form id="userCollectionDropdown${i}" style="display:none;"><hr>
                        <div id="selectDropdownDiv"></div>
                    <button type="button" onclick="addNewGameToDatabase();">Submit</button>
                    </form>
                </th>
                <th class="yearCell">
                    <p id="gameDate${i}">${game.year_published}</p>
                </th>
                <th class="genre1Cell">
                    <p id="primaryGenre${i}">${game.categories[0].id}</p>
                    <p id="gameGenres${i}" hidden>${game.categories}</p>
                </th>
                <th class="minPlayersCell">
                    <p id="gameMinPlayers${i}">${game.min_players}</p>
                </th>
                <th class="maxPlayersCell">
                    <p id="gameMaxPlayers${i}">${game.max_players}</p>
                </th>
                <th class="synopsisCell">
                    <p id="gameSynopsis${i}">${game.description_preview}</p>
                </th>

            </tr>
            `;
    }
    let tableEnding = `</tbody></table>`;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
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

//DATABASE INTERACTION

function prepareDatabaseInformationForm(i) {
    const boardGameAtlasApiId = document.getElementById(`boardGameAtlasApiId${i}`).textContent;
    const gameTitle = document.getElementById(`gameTitle${i}`).textContent;
    const gameCreator = document.getElementById(`gameCreator${i}`).textContent;
    const gameDate = document.getElementById(`gameDate${i}`).textContent.slice(0,4);
    const gameSynopsis = document.getElementById(`gameSynopsis${i}`).textContent;
    const gameMinPlayers = document.getElementById(`gameMinPlayers${i}`).textContent;
    const gameMaxPlayers = document.getElementById(`gameMaxPlayers${i}`).textContent;
    const primaryGenre = document.getElementById(`primaryGenre${i}`).textContent;

    //Fills in the title on the form on search.html
    document.getElementById("titleSubmission").value = gameTitle;

    //Fills in the author on the form on search.html form
    document.getElementById("creatorSubmission").value = gameCreator;

    //Fills in the date the book was first added to the database on the form on search.html
    document.getElementById("dateSubmission").value = new Date();

    //Fills in the genres on the form on search.html
    document.getElementById("genreSubmission").value = primaryGenre;

    //Fills in the minimum player amount on the form on search.html
    document.getElementById("minPlayersSubmission").value = gameMinPlayers;

    //Fills in the maximum player amount on the form on search.html
    document.getElementById("maxPlayersSubmission").value = gameMaxPlayers;

    //Fills in the release year on the form on search.html form
    document.getElementById("synopsisSubmission").value = gameSynopsis;
}

function addNewGameToDatabase() {

    document.getElementById("databaseInformation").submit();

}