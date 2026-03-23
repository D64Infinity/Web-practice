const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    if (!data || data.length === 0) {
        table.append(createHeaderRow(Object.keys(correspond)));
        return;
    }

    const header = Object.keys(data[0]);
    const headerRow = createHeaderRow(header);
    const bodyRows = createBodyRows(data);

    table.append(headerRow);
    table.append(bodyRows);
};

const createHeaderRow = headers => {
    const tr = document.createElement('tr');
    headers.forEach(element => {
        const th = document.createElement('th');
        th.innerHTML = element;
        tr.append(th);
    });
    return tr;
};

const createBodyRows = rows => {
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        Object.keys(row).forEach(key => {
            const td = document.createElement('td');
            td.innerHTML = row[key];
            tr.append(td);
        });
        tbody.append(tr);
    });
    return tbody;
};

const clearTable = idTable => {
    const table = document.getElementById(idTable);
    table.innerHTML = "";
}