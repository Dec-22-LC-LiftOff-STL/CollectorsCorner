function searchTitle() {

    let urlBeginning = "https://api.boardgameatlas.com/api/search?name=";
    let searchTerm;
    let urlEnding = "&client_id=P3yvzSB2mt";

    searchTerm = document.getElementById("userSearchTerm").value;

    let url = urlBeginning + searchTerm + urlEnding;
    buildHTMLResultsTable(url);
    //Only display the "Show Filters" button after someone searches
    document.getElementById("showFiltersButton").style.display = "block";
    //Hides Submit button after a search and has user use New Search button for a new search so filters are not mixed up
    document.getElementById("searchTermAndType").style.display = "none";
}

function buildHTMLResultsTable(url) {
    fetch(url).then(function(response) {
    response.json().then(function(json) {
    const arrayOfGameObjects = json.results;
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
                <th id="addToCollectionHeader"></th>
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
                    <a id="movieTitle${i}" href="/movies/details/${movie.title}">${movie.title}</a><br><br>

                    <!-- For demonstration purposes only currently -->
                    <button id="dropdown-button${i}" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i});">Add to Collection</button>
                    <p id="themoviedbApiId${i}" hidden>${movie.id}</p>
                    <form id="userCollectionDropdown${i}" style="display:none;"><hr>
                        <div id="selectDropdownDiv"></div>
                    <button type="button" onclick="addNewMovieToDatabase();">Submit</button>
                    </form>
                    <!-- -->
                </th>
                <th class="yearCell">
                    <p id="movieDate${i}">${movie.release_date}</p>
                </th>
                <th class="genre1Cell">
                    <p id="primaryGenre${i}">${movie.genre_ids[0].toString().replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")}</p>
                    <p id="movieGenres${i}" hidden>${movie.genre_ids}</p>
                </th>
                <th class="synopsisCell">
                    <p id="movieSynopsis${i}">${movie.overview}</p>

                </th>
                <th class="streamingPlatformsCell">
                    <button onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}); toggleStreamingServicesDiv(streamingDiv${i})">Streaming Platforms</button>
                    <div id="streamingDiv${i}" class="hidden"></div>
                </th>
            </tr>
            `;
    }

    let tableEnding = `</tbody></table>`;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
    });
    });
}