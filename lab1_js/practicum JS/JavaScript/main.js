const sortForm = document.getElementById('sort');
document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');
    setSortSelects(buildings, sortForm);
});

const dataForm = document.getElementById('filter');
const filterButton = document.getElementById('filterButton');
const clearFilterButton = document.getElementById('clearFilterButton');
const fieldsFirst = document.getElementById('fieldsFirst');
const fieldsSecond = document.getElementById('fieldsSecond');
const sortButton = document.getElementById('sortButton');
const clearSortButton = document.getElementById('clearSortButton');

filterButton.addEventListener("click", () => {
    filterTable(buildings, 'list', dataForm);
    sortForm.reset();
    fieldsSecond.disabled = true;
});
clearFilterButton.addEventListener("click", () => {
    clearFilter(buildings, 'list', dataForm);
    clearSort(buildings, 'list', sortForm);
});
fieldsFirst.addEventListener("change", (event) => {
    changeNextSelect(event.target, 'fieldsSecond');
});
sortButton.addEventListener("click", () => {
    sortTable(buildings, 'list', sortForm);
});
clearSortButton.addEventListener("click", () => {
    clearSort(buildings, 'list', sortForm);
    clearFilter(buildings, 'list', dataForm);
});

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
};

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
};

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data[0]);
    const allSelect = dataForm.getElementsByTagName('select');
    setSortSelect(head, allSelect[0]);
    allSelect[0].disabled = false;

    for (let i = 1; i < allSelect.length; i++) {
        setSortSelect(head, allSelect[i]);
        allSelect[i].disabled = true;
    }
};

const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
        nextSelect.value = 0
    }
}

