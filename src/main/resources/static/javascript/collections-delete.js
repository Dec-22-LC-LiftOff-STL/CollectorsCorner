function sortTable(table, column) {
    var validTables = ["moviesTable", "booksTable"];
    if (!validTables.includes(table)) {
        console.error("Invalid table name. Expected 'moviesTable' or 'booksTable'.");
        return;
    }

    var tableElement = document.getElementById(table);
    var rows = Array.from(tableElement.tBodies[0].rows);
    var sortOrder = tableElement.getAttribute('data-sort-order') || 'asc';
    var sortDirection = sortOrder === 'asc' ? 1 : -1;

    rows.sort(function(rowA, rowB) {
        var cellA = rowA.cells[column].textContent.trim().toLowerCase();
        var cellB = rowB.cells[column].textContent.trim().toLowerCase();

        // Extract last word (surname) from cell value if table is 'moviesTable' or 'booksTable'
        if (table === 'moviesTable' || table === 'booksTable') {
            var surnameA = cellA.split(' ').pop();
            var surnameB = cellB.split(' ').pop();

            if (surnameA === surnameB) {
                return 0;
            }

            return surnameA < surnameB ? -1 * sortDirection : sortDirection;
        } else {
            // Default sorting logic for other tables
            if (cellA === cellB) {
                return 0;
            }

            return cellA < cellB ? -1 * sortDirection : sortDirection;
        }
    });

    tableElement.tBodies[0].append(...rows);

    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    tableElement.setAttribute('data-sort-order', sortOrder);
}