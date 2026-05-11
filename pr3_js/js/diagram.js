const svg = d3.select("svg")
    .attr("width", 800)
    .attr("height", 500);

const margin = { top: 20, right: 30, bottom: 60, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xFields = ["Тип", "Масса (тонн)", "Калибр (мм)"];
const yField = "Число экземпляров";

function processData(data, xField) {
    const result = Array.from(d3.group(data, d => d[xField]), ([key, values]) => ({
        label: key,
        min: d3.min(values, d => +d[yField]),
        max: d3.max(values, d => +d[yField])
    }));

    return result.sort((a, b) => a.label - b.label);
}

function drawChart(data) {
    g.selectAll("*").remove();

    const xFieldIndex = d3.select('input[name="rad"]:checked').property("value") || "0";
    const xField = xFields[+xFieldIndex];

    const showMax = d3.select('input[name="chckbox"][value="0"]').property("checked");
    const showMin = d3.select('input[name="chckbox"][value="1"]').property("checked");
    
    const graphType = d3.select('select[name="graphType"]').property("value") || "dotted";

    if (!showMax && !showMin) {
        d3.select('input[name="chckbox"][value="0"]').style("outline", "2px red solid");
        d3.select('input[name="chckbox"][value="1"]').style("outline", "2px red solid");
        return;
    }

    const processedData = processData(data, xField);

    const xScale = d3.scaleBand()
        .domain(processedData.map(d => d.label))
        .range([0, width])
        .padding(0.1);

    const allValues = [];
    if (showMax) allValues.push(...processedData.map(d => d.max));
    if (showMin) allValues.push(...processedData.map(d => d.min));

    const yScale = d3.scaleLinear()
        .domain(d3.extent(allValues))
        .range([height, 0]);

    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    g.append("g")
        .call(d3.axisLeft(yScale));

    if (graphType === "dotted") {
        if (showMax) {
            g.selectAll(".max")
                .data(processedData)
                .enter()
                .append("circle")
                .attr("class", "max")
                .attr("cx", d => xScale(d.label) + xScale.bandwidth() / 2)
                .attr("cy", d => yScale(d.max))
                .attr("r", 5)
                .style("fill", "red");
        }

        if (showMin) {
            g.selectAll(".min")
                .data(processedData)
                .enter()
                .append("circle")
                .attr("class", "min")
                .attr("cx", d => xScale(d.label) + xScale.bandwidth() / 2)
                .attr("cy", d => yScale(d.min))
                .attr("r", 5)
                .style("fill", "blue");
        }
    } else {
        const barCount = (showMax ? 1 : 0) + (showMin ? 1 : 0);
        const barWidth = xScale.bandwidth() / barCount;

        let barIndex = 0;
        
        if (showMax) {
            g.selectAll(".bar-max")
                .data(processedData)
                .enter()
                .append("rect")
                .attr("class", "bar-max")
                .attr("x", d => xScale(d.label) + barIndex * barWidth)
                .attr("y", d => yScale(d.max))
                .attr("width", barWidth)
                .attr("height", d => height - yScale(d.max))
                .style("fill", "red");
            barIndex++;
        }

        if (showMin) {
            g.selectAll(".bar-min")
                .data(processedData)
                .enter()
                .append("rect")
                .attr("class", "bar-min")
                .attr("x", d => xScale(d.label) + barIndex * barWidth)
                .attr("y", d => yScale(d.min))
                .attr("width", barWidth)
                .attr("height", d => height - yScale(d.min))
                .style("fill", "blue");
        }
    }
}

d3.select('input[value="Построить"]').on("click", () => drawChart(tanks));