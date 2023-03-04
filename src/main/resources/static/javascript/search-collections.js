//Rich's commented out JavaScript at the bottom


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









//function movieCollectionFilter() {
//
//// Retrieves the selected radio button
//
//    let choice = "keyword"
//    let choiceList = document.getElementsByName('movieFilter');
//    for(i = 0; i < choiceList.length; i++){
//        if(choiceList[i].checked)
//            choice = choiceList[i].value;
//    }
//
//    let input = document.getElementById("movieInput");
//    let table = document.getElementById("movieCollectionTable");
//    let row = table.getElementsByTagName("tr");
//
//
//    for (let i = 0; i < row.length; i++) {
//        let tableData = row[i].getElementsByTagName("td")[0];
//        let directorData = row[i].getElementsByTagName("td")[1];
//        let genreData = row[i].getElementsByTagName("td")[2];
//        let genre2Data = row[i].getElementsByTagName("td")[3];
//        let genre3Data = row[i].getElementsByTagName("td")[4];
//
//        if (tableData) {
//            let txtValue = tableData.textContent || tableData.innerText;
//            let directorTxtValue = directorData.textContent || tableData.innerText;
//            let genreTxtValue = genreData.textContent || tableData.innerText;
//            let genre2TxtValue = genre2Data.textContent || tableData.innerText;
//            let genre3TxtValue = genre3Data.textContent || tableData.innerText;
//
//
//            if(choice == "keyword" || choice == ""){
//                if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
//                    row[i].style.display = "";
//                } else {
//                    row[i].style.display = "none";
//                }
//            } else if (choice == "director"){
//                if (directorTxtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
//                    row[i].style.display = "";
//                } else {
//                    row[i].style.display = "none";
//                }
//            } else if (choice == "genre"){
//                if (
//                    genreTxtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1 ||
//                    genre2TxtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1 ||
//                    genre3TxtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1
//                ){
//                    row[i].style.display = "";
//                } else {
//                    row[i].style.display = "none";
//                }
//            }
//        }
//    }
//}