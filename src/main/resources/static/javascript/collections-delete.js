function sortTable(tableId, column) {
    var table = document.getElementById(tableId);
    var rows = Array.from(table.tBodies[0].rows);
    var sortOrder = table.getAttribute('data-sort-order') || 'asc';
    var sortDirection = sortOrder === 'asc' ? 1 : -1;

    rows.sort(function(rowA, rowB) {
        var cellA = rowA.cells[column].textContent.trim().toLowerCase();
        var cellB = rowB.cells[column].textContent.trim().toLowerCase();

        if (tableId !== 'gamesTable' && column === 3) {
            // Extract the last word (surname) for other tables and column 3
            var lastWordA = cellA.split(' ').pop();
            var lastWordB = cellB.split(' ').pop();

            cellA = lastWordA;
            cellB = lastWordB;
        }

        if (cellA === cellB) {
            return 0;
        }

        return cellA < cellB ? -1 * sortDirection : sortDirection;
    });

    table.tBodies[0].append(...rows);

    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    table.setAttribute('data-sort-order', sortOrder);
}