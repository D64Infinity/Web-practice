const createPathLetter = () => {
    const svg = d3.select("svg");
    const width = svg.attr("width");
    const height = svg.attr("height");

    let data = [];
    const padding = 100;
    
    let posX = padding;
    let posY = height - padding;
    const h = 5;

    while (posY > padding) {
        data.push({'x': posX, 'y': posY});
        posY -= h;
    }

    while (posX < width - padding) {
        data.push({'x': posX, 'y': posY});
        posX += h;
    }

    return data;
}

const createPathCircle = () => {
    const svg = d3.select("svg");
    const width = svg.attr("width");
    const height = svg.attr("height");

    let data = [];
    for (let t = 0; t <= Math.PI * 2; t += 0.1) {
        data.push({
            'x': width / 2  + width / 3 * Math.sin(t),
            'y': height / 2 + height / 3 * Math.cos(t)
            }
        );
    }

    return data;
}

const drawPath = (typePath) => {
    const dataPoints = (typePath == "letter") ? createPathLetter() : createPathCircle();
    const line = d3.line()
        .x(d => d['x'])
        .y(d => d['y']);
    const svg = d3.select("svg");
    const path = svg.append("path")
        .attr("d", line(dataPoints))
        .attr("stroke", "none")
        .attr("fill", "none");

    return path;
}

const translateAlong = (path) => {
    const length = path.getTotalLength();

    return function(t) {
        const {x, y} = path.getPointAtLength(t * length);
        return `translate(${x}, ${y})`;
    }
}