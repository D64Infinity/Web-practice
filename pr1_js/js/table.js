const createTable = (tableId, data) => {
    const table = document.getElementById(tableId);
    if (!data || data.length === 0) {
        table.append(createHeader(Object.keys(colsToKeys)));
        return;
    }

    const headerRow = createHeader(Object.keys(colsToKeys));
    const bodyRows = createBody(data);
    table.append(headerRow);
    table.append(bodyRows);
}

const createHeader = (colsNames) => {
    const colsRow = document.createElement('tr');
    colsNames.forEach(name => {
        const colsRowCell = document.createElement('th');
        colsRowCell.innerHTML = name;
        colsRow.append(colsRowCell);
    });
    return colsRow;
}

const createBody = (rowsData) => {
    const dataRows = document.createElement('tbody');
    rowsData.forEach(dataRow => {
        const tableRow = document.createElement('tr');
        Object.keys(dataRow).forEach(col => {
            const tableCell = document.createElement('td');
            tableCell.innerHTML = dataRow[col];
            tableRow.append(tableCell);
        });
        dataRows.append(tableRow);
    });
    return dataRows;
}

const clearTable = (tableId) => {
    const table = document.getElementById(tableId);
    table.innerHTML = "";
}