const width = 1300;
const height = 750;

document.addEventListener("DOMContentLoaded", () => {
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("stroke-width", 2)
        .style("border", "solid")
        .style("border-color", "blue")
        .style("border-width", "1px")
        .style("margin-left", `${100}px`);

//  drawTank(svg);
    const settingsForm = d3.select("#settings");

    const animationButton = d3.select("#animationButton");
    const clearSvgButton = d3.select("#clearSvgButton");
    
    animationButton.on("click", () => {
        runAnimation(settingsForm);
    });
    clearSvgButton.on("click", () => {
        svg.selectAll("*").remove();
        settingsForm.node().reset();
    });

    const runAnimation = (settingsForm) => {
    const path = drawPath();
    let pict = drawTank(svg);
    pict.transition()
        .ease(d3["easeLinear"])
        .duration(settingsForm.select("input[name=\"animDurationInputMillis\"]").property("value"))
        .attrTween("transform", () => translateAlong(path.node(), settingsForm));
}
});
