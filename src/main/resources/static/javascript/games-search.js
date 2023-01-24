let isAscendingTitle = true;
let isAscendingYear= true;
let isAscendingGenre = true;
let isAscendingMinPlayers = true;
let isAscendingMaxPlayers = true;

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
            <tr class="gamesResultsHeaderRow">
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
            && unvalidatedGame.min_players !== null
            && unvalidatedGame.max_players !== null
            && unvalidatedGame.year_published !== null
            && unvalidatedGame.categories.length !== 0) {

                arrayOfValidatedGameObjects.push(unvalidatedGame);
        }
    }

    for (let i = 0; i < arrayOfValidatedGameObjects.length; i++) {
    const game = arrayOfValidatedGameObjects[i];
    console.log(arrayOfValidatedGameObjects)
        tableRows += `
            <tr id="rowIndex${i}" class="gamesResultsTableRows">
                <th class="posterCell text-center" style="vertical-align: middle; width: 225px">
                    <img class="poster" src="${game.thumb_url}"><br><br>
                    <button id="dropdown-button${i}" class="btn btn-primary" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i});">Add to Collection</button>
                    <form id="userCollectionDropdown${i}" style="display:none;"><br>
                        <button type="button" class="btn btn-success" onclick="addNewGameToDatabase();">Confirm</button>
                    </form>
                </th>
                <th class="titleCell" style="vertical-align: middle;">
                    <a id="gameTitle${i}" href="${game.name}">${game.name}</a><br>
                    <p id="boardGameAtlasApiId${i}" hidden>${game.id}</p>
                    <p id="gameCreator${i}" hidden>${game.primary_publisher.name}</p>
                </th>
                <th class="yearCell" style="vertical-align: middle;">
                    <p id="gameDate${i}">${game.year_published}</p>
                </th>
                <th class="genre1Cell" style="vertical-align: middle;">
                    <p id="primaryGenre${i}">${game.categories[0].id.replace('eX8uuNlQkQ', 'Card Game').replace('wTLJSVEbm6', 'Word War I').replace('fl3TogdUzX', 'World War II').replace('ZTneo8TaIO', 'Fantasy').replace('N0TkEGfEsF', 'Economic').replace('3B3QpKvXD3', 'Sci-Fi').replace('ODWOjWAJj3', 'City Building').replace('QAYkTHK1Dd', 'Medieval').replace('KUBCKBkGxV', 'Adventure').replace('upXZ8vNfNO', 'Fighting').replace('buDTYyPw4D', 'Territory Building').replace('X8J7RM6dxX', 'Party Game').replace('a8NM5cugJX', 'Ancient').replace('PinhJrhnxU', 'Bluffing').replace('MHkqIVxwtx', 'Mythology').replace('bCBXJy9qDw', 'Deduction').replace('Wr8uXcoR9p', 'Farming').replace('mavSOM8vjH', 'Dice').replace('MWoxgHrOJD', 'Animals').replace('yq6hVlbM2R', 'Exploration').replace('329DxyFL9D', 'Civilization').replace('jZEDOpx07e', 'Negotiation').replace('zyj9ZK3mHB', 'Resource Management').replace('TKQncFVX74', 'Political').replace('hBqZ3Ar4RJ', 'Abstract').replace('cAIkk5aLdQ', 'Horror').replace('TYnxiuiI3X', 'Humor').replace('7rV11PKqME', 'Family Game').replace('WVMOS3s2pb', 'Puzzle').replace('gsekjrPJz0', 'Environmental').replace('v4SfYtS2Lr', 'Expansion').replace('ge8pIhEUGE', 'Cooperative').replace('dO9HVl2TW7', 'Novel-based').replace('jX8asGGR6o', 'Wargame').replace('FC6ElKI9tk', 'Miniatures').replace('0MdRqhkNpw', 'Space Exploration').replace('4mOtRRwSoj', 'American West').replace('AeWXMxbm91', 'Medical').replace('tQGLgwdbYH', 'Racing').replace('JwHcKqxh33', 'Trains').replace('85OKv8p5Ow', '4x').replace('Hc6vcim5DS', 'Spies/Secret Agents').replace('ZhlfIPxYsw', 'Adult').replace('Sod2YBWMKi', 'TV & Movies').replace('TR4CiP8Huj', 'Travel').replace('zqFmdU4Fp2', 'Industry/Manufacturing').replace('Kk70K0524Z', 'Murder/Mystery').replace('CWYOF9xu7O', 'Transportation').replace('rrvd68LjOR', 'Kickstarter').replace('B3NRLMK4xD', 'Educational').replace('VzyslQJGrG', 'Solo/Solitaire').replace('9EIayX6n5a', 'Pirates').replace('vqZ5XzGWQD', 'Nautical').replace('djokexoK0U', 'Video Game').replace('PzWI2uaif0', 'Real-Time').replace('nuHYRFmMjU', 'Renaissance').replace('bKrxqD9mYc', 'Dexterity').replace('HKaYVNIxAJ', "Children's Game").replace('rHvAx4hH2f', 'Word Game')}</p>
                    <p id="gameGenres${i}" hidden>${game.categories}</p>
                </th>
                <th class="minPlayersCell" style="vertical-align: middle;">
                    <p id="gameMinPlayers${i}">${game.min_players}</p>
                </th>
                <th class="maxPlayersCell" style="vertical-align: middle;">
                    <p id="gameMaxPlayers${i}">${game.max_players}</p>
                </th>
                <th class="synopsisCell" style="vertical-align: middle;">
                    <p id="gameSynopsis${i}" class="synopsisText">${game.description_preview}</p>
                    <a href="/game/details/${game.name}" class="readMore">Read more</a>
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

    //Fills in the creator on the form on search.html form
    document.getElementById("creatorSubmission").value = gameCreator;

    //Fills in the date the game was first added to the database on the form on search.html
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

function sortTableByYear() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const yearA = rowA.querySelector('[id^="gameDate"]').textContent;
    const yearB = rowB.querySelector('[id^="gameDate"]').textContent;
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

function sortTableByGenre1() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const genreA = rowA.querySelector('[id^="primaryGenre"]').textContent;
    const genreB = rowB.querySelector('[id^="primaryGenre"]').textContent;
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
    table.tBodies[0].append(...rows);
}

function sortTableByMinPlayers() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const minPlayersA = Number(rowA.querySelector('[id^="gameMinPlayers"]').textContent);
    const minPlayersB = Number(rowB.querySelector('[id^="gameMinPlayers"]').textContent);
    if (minPlayersA < minPlayersB) {
        return -1;
    } else if (minPlayersA > minPlayersB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingMinPlayers) {
        rows.reverse();
    }

    isAscendingMinPlayers = !isAscendingMinPlayers;
    //Same thing as using:  table.tBodies[0].append(rows[0], rows[1], rows[2], ...)
    table.tBodies[0].append(...rows);
}

function sortTableByMaxPlayers() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const maxPlayersA = Number(rowA.querySelector('[id^="gameMaxPlayers"]').textContent);
    const maxPlayersB = Number(rowB.querySelector('[id^="gameMaxPlayers"]').textContent);
    if (maxPlayersA < maxPlayersB) {
        return -1;
    } else if (maxPlayersA > maxPlayersB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingMaxPlayers) {
        rows.reverse();
    }

    isAscendingMaxPlayers = !isAscendingMaxPlayers;
    //Same thing as using:  table.tBodies[0].append(rows[0], rows[1], rows[2], ...)
    table.tBodies[0].append(...rows);
}

function generateCreatorCheckboxHTML() {
    console.log('Generate Creator Checkbox HTML being called')
    let creators = [];
    let creatorsWithCheckbox = "";
    let i = 0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (document.getElementById(`rowIndex${i}`).style.display !== "none") {
            creator = document.getElementById(`gameCreator${i}`).innerHTML;
            console.log('Creator: ' + creator)
            if (!creators.includes(creator)) {
                creators.push(creator);
                console.log(creators);
                creatorsWithCheckbox += `<input type="checkbox" name="creator" value="${creator}" checked> ${creator}`;
            }
        }
        i++;
    }
    document.getElementById("creatorCheckboxes").innerHTML = creatorsWithCheckbox;

}

function generateGenreCheckboxHTML() {

    let genres = [];
    let genresWithCheckbox = "";

    let i = 0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (document.getElementById(`rowIndex${i}`).style.display !== "none") {
            genre = document.getElementById(`primaryGenre${i}`).innerHTML;
            if (!genres.includes(genre)) {
                genres.push(genre);
                genresWithCheckbox += `<input type="checkbox" name="genre" value="${genre}" checked> ${genre}`;
            }
        }
        i++;
    }
    document.getElementById("genreCheckboxes").innerHTML = genresWithCheckbox;
}

function showOrHideRowsBasedOnCreatorCheckboxFilters() {

    let selectedCreators = [];
    const checkboxContainer = document.querySelector('#creatorCheckboxes');
    const checkboxes = checkboxContainer.querySelectorAll('input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
        selectedCreators.push(checkboxes[i].value);
        }
    }
    let i=0;
    while (document.getElementById(`rowIndex${i}`) !== null) {
        if (!selectedCreators.includes(document.getElementById(`gameCreator${i}`).innerHTML)) {
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
        if (!selectedGenres.includes(document.getElementById(`primaryGenre${i}`).innerHTML)) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
        i++;
    }
}

function toggleCheckUncheckCreatorBoxes() {

    const selectAllCreatorsButton = document.getElementById('selectAllCreatorsButton');
    const unselectAllCreatorsButton = document.getElementById('unselectAllCreatorsButton');
    const creatorCheckboxes = document.getElementById('creatorCheckboxes');
    let checkboxState = false;

    selectAllCreatorsButton.addEventListener('click', function() {
        checkboxState = true;
        const checkboxes = creatorCheckboxes.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = checkboxState;
        });
    });

    unselectAllCreatorsButton.addEventListener('click', function() {
        checkboxState = false;
        const checkboxes = creatorCheckboxes.querySelectorAll('input[type=checkbox]');
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
        let creator = document.getElementById(`gameCreator{i}`);
        let yearString = document.getElementById(`gameDate${i}`).innerHTML;
        let year = parseInt(yearString);

        if (year < yearMin || year > yearMax) {
            document.getElementById(`rowIndex${i}`).style.display = "none";
        } else {
            document.getElementById(`rowIndex${i}`).style.display = "";
        }
        i++;
    }
}
