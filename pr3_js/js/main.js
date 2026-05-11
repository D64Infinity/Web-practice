
document.addEventListener("DOMContentLoaded", function () {
    createTable('tanksTable', tanks);
    drawChart(tanks);

    const checkboxGraphMax = d3.select('input[name="chckbox"][value="0"]');
    const checkboxGraphMin = d3.select('input[name="chckbox"][value="1"]');

    checkboxGraphMax.on("change", () => {
        checkboxGraphMax.style("outline", "none");
        checkboxGraphMin.style("outline", "none");
    });
    checkboxGraphMin.on("change", () => {
        checkboxGraphMax.style("outline", "none");
        checkboxGraphMin.style("outline", "none");
    });
    // const dataForm = d3.select('#filterForm');
    // const sortForm = d3.select('#sortForm');
    // const filterButton = d3.select('#filterButton');
    // const resetFilterButton = d3.select('#resetFilterButton');
    // const fieldsFirst = d3.select('#fieldsFirst');
    // const fieldsSecond = d3.select('#fieldsSecond');
    // const fieldsThird = d3.select('#fieldsThird');
    // const sortButton = d3.select('#sortButton');
    // const resetSortButton = d3.select('#resetSortButton');
    // fieldsSecond.property("disabled", "true");
    // fieldsThird.property("disabled", "true");

    // filterButton.on("click", () => {
    //     filterTable('tanksTable', dataForm, tanks);
    //     sortForm.reset();
    //     fieldsSecond.property("disabled", "true");
    //     fieldsThird.property("disabled", "true");
    // });
    // resetFilterButton.on("click", () => {
    //     resetFilter('tanksTable', dataForm, tanks);
    //     resetSort('tanksTable', sortForm, tanks);
    // });
    // fieldsFirst.on("change", (event) => {
    //     changeNextSelect(event.target, 'fieldsSecond');
    //     changeNextSelect(fieldsSecond, 'fieldsThird');
    // });
    // fieldsSecond.on("change", (event) => {
    //     changeNextSelect(event.target, 'fieldsThird');
    // })
    // sortButton.on("click", () => {
    //     sortTable('tanksTable', sortForm, tanks);
    // });
    // resetSortButton.on("click", () => {
    //     resetSort('tanksTable', sortForm, tanks);
    //     resetFilter('tanksTable', dataForm, tanks);
    // })
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