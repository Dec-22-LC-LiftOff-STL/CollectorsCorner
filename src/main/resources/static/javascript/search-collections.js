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
        ['keyword', [1]],
        ['director', [2]],
        ['genre', [3, 4, 5]],
        ['collector', [6]]
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
        ['keyword', [1]],
        ['author', [2]],
        ['genre', [3]],
        ['collector', [4]]
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
        ['keyword', [1]],
        ['creator', [2]],
        ['genre', [3]],
        ['collector', [4]]
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

function toggleCollectionDetails(event, element) {
    event.preventDefault();
    const collectionDetails = element.nextElementSibling;
    if (collectionDetails.style.display === "none") {
            collectionDetails.style.display = "block";
    } else {
    collectionDetails.style.display = "none";
    }
}

function toggleIcon(span) {
    if (span.innerText === "▶") {
        span.innerText = "▼";
    } else {
        span.innerText = "▶";
    }
}

//DataTables external library jQuery
window.onload = function() {
    if (document.getElementById("movieCollectionTable").style.display === '') {
        $(document).ready(function() {
            $('#movieCollectionTable').DataTable({
                "paging": true,
                "lengthChange": false, // disable length change
                "stateSave": true,
                "searching": false,
                "info": false,
                "ordering": true,
                "order": [],
                "columnDefs": [
                { "orderable": false, "targets": 0 },
                { "sorting": false, "targets": '_all' }
                ]
            });
        });
    }
    if (document.getElementById("bookCollectionTable").style.display === '') {
        $(document).ready(function() {
            $('#bookCollectionTable').DataTable({
                "paging": true,
                "lengthChange": false, // disable length change
                "stateSave": true,
                "searching": false,
                "info": false,
                "ordering": true,
                "order": [],
                "columnDefs": [
                { "orderable": false, "targets": 0 },
                { "sorting": false, "targets": '_all' }
                ]
            });
        });
    }
    if (document.getElementById("gameCollectionTable").style.display === '') {
        $(document).ready(function() {
            $('#gameCollectionTable').DataTable({
                "paging": true,
                "lengthChange": false, // disable length change
                "stateSave": true,
                "searching": false,
                "info": false,
                "ordering": true,
                "order": [],
                "columnDefs": [
                { "orderable": false, "targets": 0 },
                { "sorting": false, "targets": '_all' }
                ]
            });
        });
    }
};








