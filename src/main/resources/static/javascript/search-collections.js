//See: Rich's commented out JavaScript at the bottom


//This is the refactored version of the function above that allows for us to add new filters as needed by adding a row to the map
function movieCollectionFilter() {
    // Retrieves the selected radio button
    let choice = "keyword"
    let choiceList = document.getElementsByName('movieFilter');
    for (i = 0; i < choiceList.length; i++) {
        if (choiceList[i].checked)
            choice = choiceList[i].value;
    }

    let input = document.getElementById("movieInput");
    let table = document.getElementById("movieCollectionTable");
    let row = table.getElementsByTagName("tr");

    //Creates a map of possible columns tied to filter choices
    const movieFilterDataByValueMap = new Map([
        ['keyword', [0]],
        ['director', [1]],
        ['genre', [2, 3, 4]],
        ['collector', [5]]
    ]);

    //for each row (beginning after the table header) we check the columns that match the chosen filter contains the data that our user has input
    for (let i = 1; i < row.length; i++) {
        let columnsChosen = movieFilterDataByValueMap.get(choice)
        let columnHasValue = false;
        for (let j = 0; j < columnsChosen.length; j++){
            let tableData = row[i].getElementsByTagName("td")[columnsChosen[j]];
            let textValue = tableData.textContent || tableData.innerText;
            if (textValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                columnHasValue = true;
            }
        }
        if (columnHasValue == true) {
            row[i].style.display = "";
        } else {
            row[i].style.display = "none";
        }
    }
}

function toggleCollectionDetails(event, button) {
    if (event.target.nodeName === 'A') {
        event.stopPropagation();
        return;
    }

    const collectionDetails = button.nextElementSibling;
    if (collectionDetails.style.display === 'none') {
        collectionDetails.style.display = 'block';
    } else {
    collectionDetails.style.display = 'none';
    }
}

function bookCollectionFilter() {
    let choice = "keyword"
    let choiceList = document.getElementsByName('bookFilter');
    for (i = 0; i < choiceList.length; i++) {
        if (choiceList[i].checked)
            choice = choiceList[i].value;
    }

    let input = document.getElementById("bookInput");
    let table = document.getElementById("bookCollectionTable");
    let row = table.getElementsByTagName("tr");

//Creates a map of possible columns corresponding to the filter choices
    const bookFilterDataByValueMap = new Map([
        ['keyword', [0]],
        ['author', [1]],
        ['genre', [2]]
    ]);

//for each row (beginning after the table header at row [0]) we check if the selected column(s) contains the search term data that our user has input
    for (let i = 1; i < row.length; i++) {
        let columnsChosen = bookFilterDataByValueMap.get(choice)
        let columnHasValue = false;
        for (let j = 0; j < columnsChosen.length; j++){
            let tableData = row[i].getElementsByTagName("td")[columnsChosen[j]];
            let textValue = tableData.textContent || tableData.innerText;
            if (textValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                columnHasValue = true;
            }
        }
        if (columnHasValue == true) {
            row[i].style.display = "";
        } else {
            row[i].style.display = "none";
        }

    }
}

function gameCollectionFilter() {
    // Retrieves the selected radio button

    let choice = "keyword"
    let choiceList = document.getElementsByName('gameFilter');
    for(i = 0; i < choiceList.length; i++){
        if(choiceList[i].checked)
            choice = choiceList[i].value;
    }

    let input = document.getElementById("gameInput");
    let table = document.getElementById("gameCollectionTable");
    let row = table.getElementsByTagName("tr");

    //Creates a map of possible columns corresponding to the filter choices

    const gameFilterDataByValueMap = new Map([
        ['keyword', [0]],
        ['creator', [1]],
        ['genre', [2]]
    ]);

    //for each row (beginning after the table header at row [0]) we check if the selected column(s) contains the search term data that our user has input

    for (let i = 1; i < row.length; i++) {
        let columnsChosen = gameFilterDataByValueMap.get(choice);
        let columnHasValue = false;
        for (let j = 0; j < columnsChosen.length; j++){
            let tableData = row[i].getElementsByTagName("td")[columnsChosen[j]];
            let textValue = tableData.textContent || tableData.innerText;
            if (textValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                columnHasValue = true;
            }
        }
        if (columnHasValue == true) {
            row[i].style.display = "";
        } else {
            row[i].style.display = "none";
        }

    }
}

function toggleMovieTableDisplay(){
let movieTable = document.getElementById("movieCollectionTable");
    if (movieTable.rows.length < 2) {
        document.getElementById("movieCollectionTable").style.display = "none";
        document.getElementById("movieFilterBlock").style.display = "none";
        document.getElementById("movieColumnBlock").style.display = "none";
        document.getElementById("movieDivider").style.display = "none";
    }
}

function toggleBookTableDisplay(){
let bookTable = document.getElementById("bookCollectionTable");
    if (bookTable.rows.length < 2) {
        document.getElementById("bookCollectionTable").style.display = "none";
        document.getElementById("bookFilterBlock").style.display = "none";
        document.getElementById("bookDivider").style.display = "none";
    }
}

function toggleGameTableDisplay(){
let gameTable = document.getElementById("gameCollectionTable");
    if (gameTable.rows.length < 2) {
        document.getElementById("gameCollectionTable").style.display = "none";
        document.getElementById("gameFilterBlock").style.display = "none";
    }
}








