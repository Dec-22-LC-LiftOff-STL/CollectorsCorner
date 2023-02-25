window.onload = function() {
        const screenMode = document.getElementById('screenMode').innerText;
        if (screenMode === 'light') {

        } else if (screenMode === 'Dark') {
            document.body.style.backgroundColor = "rgb(23,23,23)";
            document.body.style.color = "rgb(183, 183, 183)";
            const tds = document.querySelectorAll("td")
            for (var i = 0; i < tds.length; i++) {
                tds[i].style.backgroundColor = 'rgb(22,22,22)';
            }
        }
    };


function sortTable(n, table) {
    let tableName = table;
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(table);
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers and the final row
    that holds the delete button): */
    for (i = 1; i < (rows.length - 2); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* NH: If we sort by director, pull ONLY the last name out of the <td> cell and sort by that below */
        if ((n === 3 && tableName === 'movieTable') || (n===3 && tableName === 'bookTable')) {
            let allWordsInDirectorNameArrayX = x.innerHTML.split(">")[1].split("<")[0].split(" ");
            let allWordsInDirectorNameArrayY = y.innerHTML.split(">")[1].split("<")[0].split(" ");
            x = allWordsInDirectorNameArrayX[allWordsInDirectorNameArrayX.length - 1];
            y = allWordsInDirectorNameArrayY[allWordsInDirectorNameArrayY.length - 1];
        }
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
            //Typical functionality
            if (typeof x === "object") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            //Modified functionality - compare two STRINGS (two director last names).
            if (x > y) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        } else if (dir == "desc") {
            //Typical functionality
            if (typeof x === "object") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            //Modified functionality - compare two STRINGS (two director last names).
            if (x < y) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
    }
    if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
    } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
    }
    }
}