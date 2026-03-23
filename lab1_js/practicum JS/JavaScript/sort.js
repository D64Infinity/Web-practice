const createSortArr = data => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push({
            column: keySort - 1,
            direction: desc
        });
    }
    return sortArr;
};

const compare = (a, b) => a - b;
const sortTable = (data, idTable, formData) => {
    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        clearTable(idTable);
        createTable(data, idTable);
        return false;
    }

    console.log(sortArr);
    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    let headerRow = rowData.shift();

    rowData.sort((first, second) => {
        for (let {column, direction} of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;
            let comparison;

            if (column !== 4 && column !== 5) {
                comparison = firstCell.localeCompare(secondCell);
            } else {
                comparison = compare(Number(firstCell), Number(secondCell));
            }

            if (comparison !== 0) {
                return (direction ? -comparison : comparison);
            }
        }
        return 0;
    });

    table.append(headerRow);
    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
    table.append(tbody);
};

const clearSort = (data, idTable, formData) => {
    formData.reset();
    document.getElementById('fieldsSecond').disabled = true;
    clearTable(idTable);
    createTable(data, idTable);
}
