document.addEventListener("DOMContentLoaded", () => {
    const names = d3.selectAll("div a")
        .nodes()
        .map(d => d.textContent.trim());
    console.log(names);
    const developersDiv = d3.select("div.menu");
    const changePageButton = d3.select("#changePageButton");

    changePageButton.on("click", () => {
        developersDiv.selectAll("a")
                     .data(names)
                     .enter()
                     .append("a")
                     .property("href", "#");
        developersDiv.selectAll("a")
                     .data(names)
                     .text(d => d);
    });
});

