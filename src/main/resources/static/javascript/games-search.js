window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}

function searchTitle() {
    let searchTerm = document.getElementById("userSearchTerm").value;
    let url = "https://api.boardgameatlas.com/api/search?name=" + searchTerm + "&client_id=P3yvzSB2mt";
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
    <table id="gamesTable">
        <thead>
            <tr class="gamesResultsHeaderRow">
                <th id="posterColumnHeader"></th>
                <th id="titleColumnHeader" onclick="sortTable('gamesTable', 1)">Title</th>
                <th id="yearColumnHeader" onclick="sortTable('gamesTable', 2)">Year</th>
                <th id="genre1ColumnHeader" onclick="sortTable('gamesTable', 3)">Genre</th>
                <th id="minPlayersColumnHeader" onclick="sortTable('gamesTable', 4)">Min. Players</th>
                <th id="maxPlayersColumnHeader" onclick="sortTable('gamesTable', 5)">Max. Players</th>
                <th id="synopsisColumnHeader" hidden>Synopsis</th>
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
        tableRows += `
            <tr id="rowIndex${i}" class="gamesResultsTableRows">
                <th class="posterCell">
                    <img class="poster" src="${game.thumb_url}">
                    <p id="gameImageURL${i}" hidden> ${game.thumb_url}</p><br>
                    <button id="dropdown-button${i}" class="btn btn-primary addToCollectionButton" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i});">Add to Collection</button>
                    <form id="userCollectionDropdown${i}" style="display:none;"><br>
                        <button type="button" class="btn btn-success" onclick="addNewGameToDatabase(event);">Confirm</button>
                    </form>
                </th>
                <th class="titleCell">
                    <a id="gameTitle${i}" href="${game.name}">${game.name}</a><br>
                    <p id="boardGameAtlasApiId${i}" hidden>${game.id}</p>
                    <p id="gameCreator${i}" hidden>${game.primary_publisher.name}</p>
                </th>
                <th class="yearCell">
                    <p id="gameDate${i}">${game.year_published}</p>
                </th>
                <th class="genre1Cell">
                    <p id="primaryGenre${i}">${game.categories[0].id.replace('eX8uuNlQkQ', 'Card Game').replace('wTLJSVEbm6', 'Word War I').replace('fl3TogdUzX', 'World War II').replace('ZTneo8TaIO', 'Fantasy').replace('N0TkEGfEsF', 'Economic').replace('3B3QpKvXD3', 'Sci-Fi').replace('ODWOjWAJj3', 'City Building').replace('QAYkTHK1Dd', 'Medieval').replace('KUBCKBkGxV', 'Adventure').replace('upXZ8vNfNO', 'Fighting').replace('buDTYyPw4D', 'Territory Building').replace('X8J7RM6dxX', 'Party Game').replace('a8NM5cugJX', 'Ancient').replace('PinhJrhnxU', 'Bluffing').replace('MHkqIVxwtx', 'Mythology').replace('bCBXJy9qDw', 'Deduction').replace('Wr8uXcoR9p', 'Farming').replace('mavSOM8vjH', 'Dice').replace('MWoxgHrOJD', 'Animals').replace('yq6hVlbM2R', 'Exploration').replace('329DxyFL9D', 'Civilization').replace('jZEDOpx07e', 'Negotiation').replace('zyj9ZK3mHB', 'Resource Management').replace('TKQncFVX74', 'Political').replace('hBqZ3Ar4RJ', 'Abstract').replace('cAIkk5aLdQ', 'Horror').replace('TYnxiuiI3X', 'Humor').replace('7rV11PKqME', 'Family Game').replace('WVMOS3s2pb', 'Puzzle').replace('gsekjrPJz0', 'Environmental').replace('v4SfYtS2Lr', 'Expansion').replace('ge8pIhEUGE', 'Cooperative').replace('dO9HVl2TW7', 'Novel-based').replace('jX8asGGR6o', 'Wargame').replace('FC6ElKI9tk', 'Miniatures').replace('0MdRqhkNpw', 'Space Exploration').replace('4mOtRRwSoj', 'American West').replace('AeWXMxbm91', 'Medical').replace('tQGLgwdbYH', 'Racing').replace('JwHcKqxh33', 'Trains').replace('85OKv8p5Ow', '4x').replace('Hc6vcim5DS', 'Spies/Secret Agents').replace('ZhlfIPxYsw', 'Adult').replace('Sod2YBWMKi', 'TV & Movies').replace('TR4CiP8Huj', 'Travel').replace('zqFmdU4Fp2', 'Industry/Manufacturing').replace('Kk70K0524Z', 'Murder/Mystery').replace('CWYOF9xu7O', 'Transportation').replace('rrvd68LjOR', 'Kickstarter').replace('B3NRLMK4xD', 'Educational').replace('VzyslQJGrG', 'Solo/Solitaire').replace('9EIayX6n5a', 'Pirates').replace('vqZ5XzGWQD', 'Nautical').replace('djokexoK0U', 'Video Game').replace('PzWI2uaif0', 'Real-Time').replace('nuHYRFmMjU', 'Renaissance').replace('bKrxqD9mYc', 'Dexterity').replace('HKaYVNIxAJ', "Children's Game").replace('rHvAx4hH2f', 'Word Game').replace('eFaACC6y2c', 'Apocalyptic').replace('QB4sEpx1Uu', 'Aviation').replace('G5kfqnPBP6', 'Comics').replace('fW5vusE96B', 'Campaign').replace('k0dglq5j6N', 'Art').replace('KSBdPfxs6F', 'Roman Empire')}</p>
                    <p id="gameGenres${i}" hidden>${game.categories}</p>
                </th>
                <th class="minPlayersCell">
                    <p id="gameMinPlayers${i}">${game.min_players}</p>
                </th>
                <th class="maxPlayersCell">
                    <p id="gameMaxPlayers${i}">${game.max_players}</p>
                </th>
                <th class="synopsisCell" hidden>
                    <p id="gameSynopsis${i}" class="synopsisText">${game.description_preview}</p>
                    <a href="/game/details/${game.name}" class="readMore">Read more</a>
                </th>
            </tr>
            `;
    }
    let tableEnding = `</tbody></table>`;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
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
    //Toggle button text between Show Filters & Hide Filters
    if (document.getElementById("showFiltersButton").innerHTML === "Show Filters") {
        document.getElementById("showFiltersButton").innerHTML = "Hide Filters";
        document.getElementById("showFiltersButton").className = "btn btn-danger";
    } else {
        document.getElementById("showFiltersButton").innerHTML = "Show Filters"
        document.getElementById("showFiltersButton").className = "btn btn-primary";
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
    const gameImageURL = document.getElementById(`gameImageURL${i}`).textContent;
    //Fills in the title on the form on search.html
    document.getElementById("titleSubmission").value = gameTitle;

    //Fills in the creator on the form on search.html form
    document.getElementById("creatorSubmission").value = gameCreator;

    //Fills in the date the game was first added to the database on the form on search.html
    document.getElementById("dateSubmission").value = new Date();

      //Fills in the imageURL on the form on search.html
        document.getElementById("imageURLSubmission").value = gameImageURL;

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
    event.preventDefault()
    let collectionDropdown = document.getElementById("collectionNamesDropdown");
    let collectionIdsAndGames = document.getElementById("collectionIdsAndGames");
    let collectionIdsAndGamesArray = collectionIdsAndGames.innerHTML.split('}],');
        if (collectionDropdown.value === '') {
            alert("Don't forget to select the collection you want to add to!")
            const collectionNameDropdownLabel = document.getElementById('collectionNameDropdownLabel');
            collectionNameDropdownLabel.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        for (let i=0; i<collectionIdsAndGamesArray.length; i++) {
            //Split each iteration into array with length 2. First index = collectionId, Second index = .toString() of all games in that collection
            let id = collectionIdsAndGamesArray[i].split('=[Game{')[0];
            let text = collectionIdsAndGamesArray[i].split('=[Game{')[1];
            //If the collection is empty, allow any addition.
            if (text === undefined) {
                break;
            }
            // If the id matches the id of the Collection the user chose in the collection dropdown below the search bar, check the .toString()
            // text for an exact match of the game the user is attempting to add to that collection. If there is already an exact match,
            // prevent the addition by presenting an alert warning and return (preventing a duplicate addition of the game to the collection)
            if (id.includes(collectionDropdown.value) && text.includes(document.getElementById('synopsisSubmission').value)) {
                alert(collectionNamesDropdown.options[collectionNamesDropdown.selectedIndex].text + ' already contains ' + document.getElementById('titleSubmission').value + '!');
                return;
            }
        }
    document.getElementById("databaseInformation").submit();
}

//SORTING
function sortTable(tableId, column) {
    var table = document.getElementById(tableId);
    var rows = Array.from(table.tBodies[0].rows);
    var sortOrder = table.getAttribute('data-sort-order') || 'asc';
    var sortDirection = sortOrder === 'asc' ? 1 : -1;

    rows.sort(function(rowA, rowB) {
        var cellA = rowA.cells[column].textContent.trim().toLowerCase();
        var cellB = rowB.cells[column].textContent.trim().toLowerCase();

        if (cellA === cellB) {
            return 0;
        }

        return cellA < cellB ? -1 * sortDirection : sortDirection;
    });

    table.tBodies[0].append(...rows);

    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    table.setAttribute('data-sort-order', sortOrder);
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
                creatorsWithCheckbox += `<label><input type="checkbox" name="creator" value="${creator}" checked> ${creator}</label>`;
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
                genresWithCheckbox += `<label><input type="checkbox" name="genre" value="${genre}" checked> ${genre}</label>`;
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
