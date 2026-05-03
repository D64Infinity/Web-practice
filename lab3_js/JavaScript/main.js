document.addEventListener("DOMContentLoaded", () => {
    const table = d3.select("#build");
    table.style("margin-top", "0.6vmax");
    showTable(table, buildings);
    drawGraph(buildings);

    const switchTableDisplayButton = d3.select("#switchTableDisplayButton");
    switchTableDisplayButton.style("margin-bottom", "0.6vmax")
                            .style("margin-top", "0.6max");
    const buildDiagram = d3.select("#buildDiagram");
    buildDiagram.style("margin-bottom", "0.6vmax")
                .style("margin-top", "10px");
    const maxHeightCheck = d3.select("input[name=\"MinMaxHeight\"][value=\"Max\"]");
    const minHeightCheck = d3.select("input[name=\"MinMaxHeight\"][value=\"Min\"]");

    switchTableDisplayButton.on("click", () => {
        if (switchTableDisplayButton.property("value") == "Скрыть таблицу") {
            table.style("display", "none");
            switchTableDisplayButton.property("value", "Показать таблицу");
        } else {
            table.style("display", "");
            switchTableDisplayButton.property("value", "Скрыть таблицу")
        }
    });
    buildDiagram.on("click", () => {
        drawGraph(buildings);
    });
    maxHeightCheck.on("change", () => {
        if (!(maxHeightCheck.property("checked") || minHeightCheck.property("checked"))) {
            minHeightCheck.style("outline", "2px solid red");
            maxHeightCheck.style("outline", "2px solid red");
        } else {
            minHeightCheck.style("outline", "none");
            maxHeightCheck.style("outline", "none");
        }
    });
    minHeightCheck.on("change", () => {
        if (!(maxHeightCheck.property("checked") || minHeightCheck.property("checked"))) {
            minHeightCheck.style("outline", "2px solid red");
            maxHeightCheck.style("outline", "2px solid red");
        } else {
            minHeightCheck.style("outline", "none");
            maxHeightCheck.style("outline", "none");
        }
    });
})