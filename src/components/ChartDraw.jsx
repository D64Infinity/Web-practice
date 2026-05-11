import * as d3 from "d3";
import { useRef, useEffect, useState, useMemo } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });

    const margin = {
        top:10,
        bottom:60,
        left:40,
        right:10
    };

    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    let [min, max] = d3.extent(props.data.map(d => d.values[1]));
    if (props.oy[0] && props.oy[1]) {
        [min, max] = d3.extent(props.data.flatMap(d => d.values)); 
    } else if (props.oy[1]){
        [min, max] = d3.extent(props.data.map(d => d.values[0]));
    }

    const scaleX = useMemo(() => {
        return d3.scaleBand()
                 .domain(props.data.map(d => d.labelX))
                 .range([0, boundsWidth])
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3.scaleLinear()
                 .domain([min * 0.85, max * 1.1])
                 .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        const xAxis = d3.axisBottom(scaleX);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        if (props.graphType === "hist") {
            console.log(props.oy[0], props.oy[1]);

            if (props.oy[0] && props.oy[1]) {
                svg.selectAll("rect.max")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("class", "max")
                    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 6)
                    .attr("y", d => scaleY(d.values[1]))
                    .attr("width", scaleX.bandwidth() / 3)
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("fill", "red");

                svg.selectAll("rect.min")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("class", "min")
                    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("y", d => scaleY(d.values[0]))
                    .attr("width", scaleX.bandwidth() / 3)
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("fill", "blue");
            } else {
                const indexOY = (props.oy[0]) ? 1 : 0
                svg.selectAll("rect")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 3)
                    .attr("y", d => scaleY(d.values[indexOY]))
                    .attr("width", scaleX.bandwidth() / 2)
                    .attr("height", d => boundsHeight - scaleY(d.values[indexOY]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("fill", indexOY ? "red" : "blue");
            }
        } else {
            console.log(props.oy[0], props.oy[1]);

            if (props.oy[0] && props.oy[1]) {
                svg.selectAll("circle.max")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("class", "max")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");

                svg.selectAll("circle.min")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("class", "max")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            } else {
                const indexOY = (props.oy[0]) ? 1 : 0
                svg.selectAll("circle")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[indexOY]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", indexOY ? "red" : "blue");
            }
        }
    }, [scaleX, scaleY, props.data, props.graphType]);

    return (
        <svg ref={ chartRef }> </svg>
    )
}

export default ChartDraw;