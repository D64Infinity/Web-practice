
document.addEventListener("DOMContentLoaded", function () {
    createTable('tanksTable', tanks);

    const dataForm = document.getElementById('filterForm');
    const sortForm = document.getElementById('sortForm');
    const filterButton = document.getElementById('filterButton');
    const resetFilterButton = document.getElementById('resetFilterButton');
    const fieldsFirst = document.getElementById('fieldsFirst');
    const fieldsSecond = document.getElementById('fieldsSecond');
    const fieldsThird = document.getElementById('fieldsThird');
    const sortButton = document.getElementById('sortButton');
    const resetSortButton = document.getElementById('resetSortButton');
    fieldsSecond.disabled = true;
    fieldsThird.disabled = true;

    filterButton.addEventListener("click", () => {
        filterTable('tanksTable', dataForm, tanks);
        sortForm.reset();
        fieldsSecond.disabled = true;
        fieldsThird.disabled = true;
    });
    resetFilterButton.addEventListener("click", () => {
        resetFilter('tanksTable', dataForm, tanks);
        resetSort('tanksTable', sortForm, tanks);
    });
    fieldsFirst.addEventListener("change", (event) => {
        changeNextSelect(event.target, 'fieldsSecond');
        changeNextSelect(fieldsSecond, 'fieldsThird');
    });
    fieldsSecond.addEventListener("change", (event) => {
        changeNextSelect(event.target, 'fieldsThird');
    })
    sortButton.addEventListener("click", () => {
        console.log(sortForm, '\n', tanks)
        sortTable('tanksTable', sortForm, tanks);
    });
    resetSortButton.addEventListener("click", () => {
        resetSort('tanksTable', sortForm, tanks);
        resetFilter('tanksTable', dataForm, tanks);
    })
});



const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
        nextSelect.value = 0;
    }
}