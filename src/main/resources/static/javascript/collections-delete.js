function sortTable(table, column) {
    var table = document.getElementById(table);
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