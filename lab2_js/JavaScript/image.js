function drawSmile(svg) {
    let smile = svg.append("g") //init
        .style("stroke", "brown")
        .style("stroke-width", 2)
        .style("fill", "brown");
    
    smile.append("circle")  // face
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "yellow");

    smile.append("circle")  //left eye
        .attr("cx", -20)
        .attr("cy", -10)
        .attr("r", 5);

    smile.append("circle") //right eye
        .attr("cx", 20)
        .attr("cy", -10)
        .attr("r", 5);
    
    let arc = d3.arc()  //smile
        .innerRadius(35)
        .outerRadius(35);

    smile.append("path")
        .attr("d", arc({startAngle: Math.PI / 3 * 2, endAngle: Math.PI / 3 * 4}))
        .style("stroke", "brown");

    return smile;
}