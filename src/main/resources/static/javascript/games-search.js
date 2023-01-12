function searchTitle() {

    let urlBeginning = "https://api.boardgameatlas.com/api/search?name=";
    let searchTerm;
    let urlEnding = "&client_id=P3yvzSB2mt";

    searchTerm = document.getElementById("userSearchTerm").value;

    let url = urlBeginning + searchTerm + urlEnding;
    buildHTMLResultsTable(url);
    //Only display the "Show Filters" button after someone searches
//    document.getElementById("showFiltersButton").style.display = "block";
    //Hides Submit button after a search and has user use New Search button for a new search so filters are not mixed up
//    document.getElementById("searchTermAndType").style.display = "none";
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
    for (let i = 0; i < arrayOfGameObjects.length; i++) {
        const game = arrayOfGameObjects[i];
        console.log(game);
//        if (!game.release_date) {
//            break;
//        }
//        //Cleans up presentation by slicing only the year from "2012-12-12" date format
//        movie.release_date = movie.release_date.slice(0,4);
//        //Cleans up presentation by ignoring search results that do not have a movie poster
//        if (movie.poster_path === null) {
//            break;
//        }
//        //Cleans up results by removing movies provided without a genre
//        if (movie.genre_ids[0] === undefined) {
//            break;
//        }
//        //Cleans up results by removing movies provided without a synopsis
//        if (movie.overview === "") {
//            break;
//        }

        tableRows += `
            <tr>
                <th class="posterCell">
                    <img class="poster" src="${game.thumb_url}"><br>
                </th>
                <th class="titleCell">
                    <a id="gameTitle${i}" href="${game.name}">${game.name}</a><br><br>

                    <!-- For demonstration purposes only currently -->
                    <button id="dropdown-button${i}" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i});">Add to Collection</button>
                    <p id="boardGameAtlasApiId${i}" hidden>${game.id}</p>
                    <form id="userCollectionDropdown${i}" style="display:none;"><hr>
                        <div id="selectDropdownDiv"></div>
                    <button type="button" onclick="addNewMovieToDatabase();">Submit</button>
                    </form>
                    <!-- -->
                </th>
                <th class="yearCell">
                    <p id="gameDate${i}">${game.year_published}</p>
                </th>
                <th class="genre1Cell">
                    <p id="primaryGenre${i}">${game.categories[0]}</p>
                    <p id="gameGenres${i}" hidden>${game.categories}</p>
                </th>
                <th class="minPlayersCell">
                    <p id="gameMinPlayers${i}">${game.min_players}</p>
                </th>
                <th class="maxPlayersCell">
                    <p id="gameMaxPlayers${i}">${game.max_players}</p>
                </th>
                <th class="synopsisCell">
                    <p id="gameSynopsis${i}">${game.description}</p>
                </th>

            </tr>
            `;
    }

    let tableEnding = `</tbody></table>`;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
    });
    });
}