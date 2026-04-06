const createLemniscatePath = () => {
    const svg = d3.select("svg");
    const width = svg.attr("width");
    const height = svg.attr("height");
    let a = 350;

    let data = [];
    const cx = width/2;
    const cy = height/2;
    data.push({x: cx, y: cy});
    for (let t = -Math.PI/4; t <= Math.PI/4; t += 0.01) {
        const cos2t = Math.cos(2*t);
        if (cos2t < 0) continue;
        
        const r = Math.sqrt(2*a*a*cos2t);
        const x = cx + r*Math.cos(t);
        const y = cy + r*Math.sin(t);
        data.push({x, y});
    }
    data.push({x: cx, y: cy});

    for (let t = Math.PI*5/4; t >= 3*Math.PI/4; t -= 0.01) {
        const cos2t = Math.cos(2*t);
        if (cos2t < 0) continue;
        const r = Math.sqrt(2*a*a*cos2t);
        const x = cx + r*Math.cos(t);
        const y = cy + r*Math.sin(t);
        data.push({x, y});
    }
    data.push({x: cx, y: cy});

    return data;
}

const drawPath = () => {
    const dataPoints = createLemniscatePath();
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    const svg = d3.select("svg");
    const path = svg.append("path")
        .attr("d", line(dataPoints))
        .attr("stroke", "black")
        .attr("fill", "none");
    
    return path;
}

const translateAlong = (path, dataForm) => {
    const length = path.getTotalLength();

    return function(t) {
        const {x, y} = path.getPointAtLength(t * length);
        const scaleXBegin = +dataForm.select("input[name=\"scaleXBegin\"]").property("value");
        const scaleXEnd = +dataForm.select("input[name=\"scaleXEnd\"]").property("value");
        const scaleYBegin = +dataForm.select("input[name=\"scaleYBegin\"]").property("value");
        const scaleYEnd = +dataForm.select("input[name=\"scaleYEnd\"]").property("value");
        const rotateBegin = +dataForm.select("input[name=\"rotateBegin\"]").property("value");
        const rotateEnd = +dataForm.select("input[name=\"rotateEnd\"]").property("value");

        let currentScaleX = scaleXBegin + (scaleXEnd - scaleXBegin) * t;
        let currentScaleY = scaleYBegin + (scaleYEnd - scaleYBegin) * t;
        let currentRotate = rotateBegin + (rotateEnd - rotateBegin) * t;
        return `translate(${x-85*scaleXEnd}, ${y-10*scaleYEnd})
                scale(${currentScaleX}, ${currentScaleY})
                rotate(${currentRotate}, ${85}, ${10})`;
    }
}