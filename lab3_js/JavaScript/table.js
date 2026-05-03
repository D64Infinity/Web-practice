const showTable = (d3Table, data) => {
    const rows = d3Table.selectAll("tr")
                      .data(data)
                      .enter()
                      .append("tr")
                      .style("display", "")
                      .style("background-color", (_, i) => i % 2 == 1 ? "#d1d1d1" : "#ffffff");

    const cells = rows.selectAll("td")
                      .data(d => Object.values(d))
                      .enter()
                      .append("td")
                      .text(d => d);

    const head = d3Table.insert("tr", "tr")
                      .selectAll("th")
                      .data(() => Object.keys(data[0]))
                      .enter()
                      .append("th")
                      .text(d => d)
                      .style("background-color", "#d1d1d1");

}