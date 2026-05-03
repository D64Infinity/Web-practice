const createArrGraph = (data, key) => {
    let arrGraph = [];
    
    const groupObj = d3.group(data, d => d[key]);
    for (let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX: entry[0], values: minMax});
    }

    return arrGraph;
}

const drawGraph = (data) => {
    const keyX = (d3.select("input[name=\"CountryOrYear\"]:checked").property("value") == "Country") ? "Страна" : "Год";
    let arrGraph = createArrGraph(data, keyX);
    
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const attr_area = {
        width: parseFloat(svg.style("width")),
        height: parseFloat(svg.style("height")),
        marginX: 50,
        marginY: 50
    }

    const minHeightChecked = d3.select("input[name=\"MinMaxHeight\"][value=\"Min\"]").property("checked") == true;
    const maxHeightChecked = d3.select("input[name=\"MinMaxHeight\"][value=\"Max\"]").property("checked") == true;
    const graphType = d3.select("select[name=\"graphType\"]").property("value");
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, minHeightChecked, maxHeightChecked);
    createChart(svg, arrGraph, scX, scY, attr_area, minHeightChecked, maxHeightChecked, graphType);
}

const createAxis = (svg, data, attr_area, minHeightFlag, maxHeightFlag) => {
    const [min, max] = (maxHeightFlag) ? d3.extent(data.map(d => d.values[1])) : d3.extent(data.map(d => d.values[0]));

    let domainX = data.map(d => d.labelX);
    if (!isNaN(domainX[0])) {
        domainX.sort((a, b) => a - b);
    }

    const scaleX = d3.scaleBand()
                     .domain(domainX)
                     .range([0, attr_area.width - 2*attr_area.marginX]);

    const scaleY = d3.scaleLinear()
                     .domain([min*0.85, max*1.1])
                     .range([attr_area.height - 2*attr_area.marginY, 0]);
    
    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
       .attr("transform", `translate(${attr_area.marginX},
                                     ${attr_area.height - attr_area.marginY})`)
       .call(axisX)
       .selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", ".8em")
       .attr("dy", ".15em")
       .attr("transform", d => "rotate(-45)");

    svg.append("g")
       .attr("transform", `translate(${attr_area.marginX},
                                     ${attr_area.marginY})`)
       .call(axisY);

    return [scaleX, scaleY];
}

const createChart = (svg, data, scaleX, scaleY, attr_area, minHeightFlag, maxHeightFlag, graphType) => {
    if (graphType == "dot") {
        const r = 4;

        if (minHeightFlag) {
            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", r)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values[0]))
                .attr("transform", `translate(${attr_area.marginX},
                                     ${attr_area.marginY})`)
                .style("fill", "blue");
        }
        if (maxHeightFlag) {
            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", r)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values[1]))
                .attr("transform", `translate(${attr_area.marginX},
                                     ${attr_area.marginY})`)
                .style("fill", "red");
        }
    } else {
        const barWidth = scaleX.bandwidth() / 4;

        if (maxHeightFlag && minHeightFlag) {
            svg.selectAll(".bar")
               .data(data)
               .enter()
               .append("rect")
               .attr("x", d => scaleX(d.labelX) + barWidth * 2)
               .attr("y", d => scaleY(d.values[1]))
               .attr("width", barWidth)
               .attr("height", d => scaleY(0) - scaleY(d.values[1]) - 146)
               .attr("transform", `translate(${attr_area.marginX},
                                             ${attr_area.marginY})`)
               .style("fill", "red");

            svg.selectAll(".bar")
               .data(data)
               .enter()
               .append("rect")
               .attr("x", d => scaleX(d.labelX) + barWidth)
               .attr("y", d => scaleY(d.values[0]))
               .attr("width", barWidth)
               .attr("height", d => scaleY(0) - scaleY(d.values[0]) - 146)
               .attr("transform", `translate(${attr_area.marginX},
                                             ${attr_area.marginY})`)
               .style("fill", "blue");
        } else if (minHeightFlag && !maxHeightFlag) {
            svg.selectAll(".bar")
               .data(data)
               .enter()
               .append("rect")
               .attr("x", d => scaleX(d.labelX) + barWidth)
               .attr("y", d => scaleY(d.values[0]))
               .attr("width", barWidth)
               .attr("height", d => scaleY(0) - scaleY(d.values[0]) - 216 - 8 * ((d3.select("input[name=\"CountryOrYear\"][value=\"Year\"]").property("checked") == true) ? 1 : 0))
               .attr("transform", `translate(${attr_area.marginX},
                                             ${attr_area.marginY})`)
               .style("fill", "blue");
        } else {
            if (minHeightFlag) {
                svg.selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + barWidth)
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", barWidth)
                    .attr("height", d => scaleY(0) - scaleY(d.values[0]) - 126)
                    .attr("transform", `translate(${attr_area.marginX},
                                             ${attr_area.marginY})`)
                    .style("fill", "blue");
            }
            if (maxHeightFlag) {
                svg.selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + barWidth * 2)
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", barWidth)
                    .attr("height", d => scaleY(0) - scaleY(d.values[1]) - 146)
                    .attr("transform", `translate(${attr_area.marginX},
                                             ${attr_area.marginY})`)
                    .style("fill", "red");
            }
        }
    }
}



