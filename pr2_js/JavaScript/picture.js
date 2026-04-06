function drawTank(svg) {
    let tank = svg.append("g")  //init
        .style("stroke", "black")
        .style("stroke-width", 2)
        .attr("transform", `translate(${width/2}, ${height/2})`)

    tank.append("polygon")  //hull
        .attr("points", "0,40 20,0 150,0 170,40")
        .style("fill", "green")

    tank.append("polygon")  //turret
        .attr("points", "50,0 50,-40 120,-30 120,0")
        .style("fill", "green")

    tank.append("polygon")  //hatch
        .attr("points", "60,-40 80,-40, 80,-35")
        .style("fill", "brown")
        .style("stroke-width", 1);

    tank.append("line") //auto-gun
        .attr("x1", 120)
        .attr("y1", -20)
        .attr("x2", 165)
        .attr("y2", -20)
        .style("stroke-width", 3);

    tank.append("line") //joint machinegun
        .attr("x1", 120)
        .attr("y1", -18)
        .attr("x2", 140)
        .attr("y2", -18)

    tank.append("ellipse")  //track
        .attr("cx", "85")
        .attr("cy", "60")
        .attr("rx", "90")
        .attr("ry", "20")
        .attr("fill", "none");

    tank.append("ellipse")  //frst wheel (left-to-right) 
        .attr("cx", "10")
        .attr("cy", "60")
        .attr("rx", "10")
        .attr("ry", "10")
        .attr("fill", "grey");

    tank.append("ellipse")  //scnd wheel (left-to-right) 
        .attr("cx", "40")
        .attr("cy", "60")
        .attr("rx", "15")
        .attr("ry", "15")
        .attr("fill", "grey");

    tank.append("ellipse")  //thrd wheel (left-to-right) 
        .attr("cx", "85")
        .attr("cy", "60")
        .attr("rx", "20")
        .attr("ry", "20")
        .attr("fill", "grey");

    tank.append("ellipse")  //frth wheel (left-to-right) 
        .attr("cx", "130")
        .attr("cy", "60")
        .attr("rx", "15")
        .attr("ry", "15")
        .attr("fill", "grey");

    tank.append("ellipse")  //fifth wheel (left-to-right) 
        .attr("cx", "160")
        .attr("cy", "60")
        .attr("rx", "10")
        .attr("ry", "10")
        .attr("fill", "grey");

    return tank;
}