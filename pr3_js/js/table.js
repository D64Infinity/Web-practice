const createTable = (tableId, data) => {
    const table = d3.select(`#${tableId}`);
    clearTable(tableId);

    if (!data || data.length === 0) {
        createHeader(table, Object.keys(colsToKeys));
        return;
    }

    createHeader(table, Object.keys(colsToKeys));
    createBody(table, data);
}

const createHeader = (table, colsNames) => {
    const headerRow = table.append('tr');
    headerRow.selectAll('th')
        .data(colsNames)
        .enter()
        .append('th')
        .text(d => d);
}

const createBody = (table, rowsData) => {
    const tbody = table.append('tbody');
    const rows = tbody.selectAll('tr')
        .data(rowsData)
        .enter()
        .append('tr');

    rows.selectAll('td')
        .data(d => Object.values(d))
        .enter()
        .append('td')
        .text(d => d);
}

const clearTable = (tableId) => {
    d3.select(`#${tableId}`).selectAll("*").remove();
}