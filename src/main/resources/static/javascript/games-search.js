let isAscendingTitle = true;
let isAscendingYear= true;
let isAscendingGenre = true;

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
        if (unvalidatedGame.thumb_url !== "https://s3-us-west-1.amazonaws.com/5cc.images/games/empty+box.jpg"
            && unvalidatedGame.thumb_url !== "https://s3-us-west-1.amazonaws.com/5cc.images/games/empty+box+thumb.jpg" && !arrayOfValidatedGameObjects.includes(unvalidatedGame)
            && unvalidatedGame.primary_publisher !== undefined && unvalidatedGame.primary_publisher.name !== undefined
            && unvalidatedGame.description !== ""
            & unvalidatedGame.min_players !== null
            & unvalidatedGame.max_players !== null
            && unvalidatedGame.categories.length !== 0) {

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
                    <p id="primaryGenre${i}">${game.categories[0].id.replace('eX8uuNlQkQ', 'Card Game').replace('wTLJSVEbm6', 'Word War I').replace('fl3TogdUzX', 'World War II').replace('ZTneo8TaIO', 'Fantasy').replace('N0TkEGfEsF', 'Economic').replace('3B3QpKvXD3', 'Sci-Fi').replace('ODWOjWAJj3', 'City Building').replace('QAYkTHK1Dd', 'Medieval').replace('KUBCKBkGxV', 'Adventure').replace('upXZ8vNfNO', 'Fighting').replace('buDTYyPw4D', 'Territory Building').replace('X8J7RM6dxX', 'Party Game').replace('a8NM5cugJX', 'Ancient').replace('PinhJrhnxU', 'Bluffing').replace('MHkqIVxwtx', 'Mythology').replace('bCBXJy9qDw', 'Deduction').replace('Wr8uXcoR9p', 'Farming').replace('mavSOM8vjH', 'Dice').replace('MWoxgHrOJD', 'Animals').replace('yq6hVlbM2R', 'Exploration').replace('329DxyFL9D', 'Civilization').replace('jZEDOpx07e', 'Negotiation').replace('zyj9ZK3mHB', 'Resource Management').replace('TKQncFVX74', 'Political').replace('hBqZ3Ar4RJ', 'Abstract').replace('cAIkk5aLdQ', 'Horror').replace('TYnxiuiI3X', 'Humor').replace('7rV11PKqME', 'Family Game').replace('WVMOS3s2pb', 'Puzzle').replace('gsekjrPJz0', 'Environmental').replace('v4SfYtS2Lr', 'Expansion').replace('ge8pIhEUGE', 'Cooperative').replace('dO9HVl2TW7', 'Novel-based').replace('jX8asGGR6o', 'Wargame').replace('FC6ElKI9tk', 'Miniatures').replace('0MdRqhkNpw', 'Space Exploration').replace('4mOtRRwSoj', 'American West').replace('AeWXMxbm91', 'Medical').replace('tQGLgwdbYH', 'Racing').replace('JwHcKqxh33', 'Trains').replace('85OKv8p5Ow', '4x').replace('Hc6vcim5DS', 'Spies/Secret Agents').replace('ZhlfIPxYsw', 'Adult').replace('Sod2YBWMKi', 'TV & Movies').replace('TR4CiP8Huj', 'Travel').replace('zqFmdU4Fp2', 'Industry/Manufacturing').replace('Kk70K0524Z', 'Murder/Mystery').replace('CWYOF9xu7O', 'Transportation').replace('rrvd68LjOR', 'Kickstarter').replace('B3NRLMK4xD', 'Educational').replace('VzyslQJGrG', 'Solo/Solitaire').replace('9EIayX6n5a', 'Pirates').replace('vqZ5XzGWQD', 'Nautical').replace('djokexoK0U', 'Video Game').replace('PzWI2uaif0', 'Real-Time').replace('nuHYRFmMjU', 'Renaissance').replace('bKrxqD9mYc', 'Dexterity').replace('HKaYVNIxAJ', "Children's Game").replace('rHvAx4hH2f', 'Word Game')}</p>
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
    const primaryGenre = document.getElementById(`primaryGenre${i}`).textContent.replace('eX8uuNlQkQ', 'Card Game').replace('wTLJSVEbm6', 'Word War I').replace('fl3TogdUzX', 'World War II').replace('ZTneo8TaIO', 'Fantasy').replace('N0TkEGfEsF', 'Economic').replace('3B3QpKvXD3', 'Sci-Fi').replace('ODWOjWAJj3', 'City Building').replace('QAYkTHK1Dd', 'Medieval').replace('KUBCKBkGxV', 'Adventure').replace('upXZ8vNfNO', 'Fighting').replace('buDTYyPw4D', 'Territory Building').replace('X8J7RM6dxX', 'Party Game').replace('a8NM5cugJX', 'Ancient').replace('PinhJrhnxU', 'Bluffing').replace('MHkqIVxwtx', 'Mythology').replace('bCBXJy9qDw', 'Deduction').replace('Wr8uXcoR9p', 'Farming').replace('mavSOM8vjH', 'Dice').replace('MWoxgHrOJD', 'Animals').replace('yq6hVlbM2R', 'Exploration').replace('329DxyFL9D', 'Civilization').replace('jZEDOpx07e', 'Negotiation').replace('zyj9ZK3mHB', 'Resource Management').replace('TKQncFVX74', 'Political').replace('hBqZ3Ar4RJ', 'Abstract').replace('cAIkk5aLdQ', 'Horror').replace('TYnxiuiI3X', 'Humor').replace('7rV11PKqME', 'Family Game').replace('WVMOS3s2pb', 'Puzzle').replace('gsekjrPJz0', 'Environmental').replace('v4SfYtS2Lr', 'Expansion').replace('ge8pIhEUGE', 'Cooperative').replace('dO9HVl2TW7', 'Novel-based').replace('jX8asGGR6o', 'Wargame').replace('FC6ElKI9tk', 'Miniatures').replace('0MdRqhkNpw', 'Space Exploration').replace('4mOtRRwSoj', 'American West').replace('AeWXMxbm91', 'Medical').replace('tQGLgwdbYH', 'Racing').replace('JwHcKqxh33', 'Trains').replace('85OKv8p5Ow', '4x').replace('Hc6vcim5DS', 'Spies/Secret Agents').replace('ZhlfIPxYsw', 'Adult').replace('Sod2YBWMKi', 'TV & Movies').replace('TR4CiP8Huj', 'Travel').replace('zqFmdU4Fp2', 'Industry/Manufacturing').replace('Kk70K0524Z', 'Murder/Mystery').replace('CWYOF9xu7O', 'Transportation').replace('rrvd68LjOR', 'Kickstarter').replace('B3NRLMK4xD', 'Educational').replace('VzyslQJGrG', 'Solo/Solitaire').replace('9EIayX6n5a', 'Pirates').replace('vqZ5XzGWQD', 'Nautical').replace('djokexoK0U', 'Video Game').replace('PzWI2uaif0', 'Real-Time').replace('nuHYRFmMjU', 'Renaissance').replace('bKrxqD9mYc', 'Dexterity').replace('HKaYVNIxAJ', "Children's Game").replace('rHvAx4hH2f', 'Word Game');

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

//SORTING

function sortTableByTitle() {

    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const titleA = rowA.querySelector('[id^="gameTitle"]').textContent;
    const titleB = rowB.querySelector('[id^="gameTitle"]').textContent;
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