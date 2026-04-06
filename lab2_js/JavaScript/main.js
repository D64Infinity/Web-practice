document.addEventListener("DOMContentLoaded", () => {
    const width = 1500;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    // let pict = drawSmile(svg);
    // pict.attr("transform", "translate(200, 200)")
    // let upsideDownPict = drawSmile(svg);
    // upsideDownPict.attr("transform", "translate(400, 400) scale(1.5, 1.5) rotate(180)");

    const dataForm = d3.select('#settings');
    const pictButton = d3.select('#pictButton');
    const clrButton = d3.select('#clrButton');
    const animationSwitch = d3.select('#animationSwitch');
    const waySwitch = d3.select('#waySwitch');
    waySwitch.property("checked", false);

    const selectAnimation = d3.select('#selectAnimation');
    const animateButton = d3.select('#animateButton');
    const cxF = d3.select('#cx_f');
    const cyF = d3.select('#cy_f');
    const mxF = d3.select('#mx_f');
    const myF = d3.select('#my_f');
    const rotateF = d3.select('#rotate_f');
    const wayMod = d3.select('#wayMod');
    const wayModP = d3.select('#wayModP');
    const coordsModP = d3.select('#coordsModP');
    const scaleP = d3.select('#scaleP');
    const rotateP = d3.select('#rotateP');

    selectAnimation.style("display", "none");
    animateButton.style("display", "none");
    cxF.style("display", "none");
    cyF.style("display", "none");
    mxF.style("display", "none");
    myF.style("display", "none");
    rotateF.style("display", "none");
    wayMod.style("display", "none");
    wayModP.style("display", "none");

    pictButton.on("click", () => {
        draw(dataForm);
    });
    clrButton.on("click", () => {
        svg.selectAll('*').remove();
    });
    animationSwitch.on("change", () => {
        selectAnimation.style("display", animationSwitch.property("checked") ? "inline-block" : "none");
        animateButton.style("display", animationSwitch.property("checked") ? "inline-block" : "none");
        cxF.style("display", animationSwitch.property("checked") ? "inline-block" : "none");
        cyF.style("display", animationSwitch.property("checked") ? "inline-block" : "none");
        mxF.style("display", animationSwitch.property("checked") ? "inline-block" : "none");
        myF.style("display", animationSwitch.property("checked") ? "inline-block" : "none");
        rotateF.style("display", animationSwitch.property("checked") ? "inline-block" : "none");
        wayMod.style("display", animationSwitch.property("checked") ? "block" : "none");
        waySwitch.property("checked", false);
        coordsModP.style("display", "block");
        wayModP.style("display", "none");
    });
    waySwitch.on("change", () => {
        coordsModP.style("display", waySwitch.property("checked") ? "none" : "block");
        wayModP.style("display", waySwitch.property("checked") ? "block" : "none");
        scaleP.style("display", waySwitch.property("checked") ? "none" : "block");
        rotateP.style("display", waySwitch.property("checked") ? "none" : "block");
    });
    animateButton.on("click", () => {
        runAnimation(dataForm);
    });

    const draw = (dataForm) => {
        const svg = d3.select("svg");
        let pict = drawSmile(svg);
        pict.attr("transform", `translate(${dataForm.select("#cx").property("value")}, ${dataForm.select("#cy").property("value")}) 
            scale(${dataForm.select("#mx").property("value")}, ${dataForm.select("#my").property("value")})
            rotate(${dataForm.select("#rotate").property("value")})`);
    }

    const runAnimation = (dataForm) => {
        if (waySwitch.property("checked")) {
            const path = drawPath(dataForm.select("#selectWay").property("value"));
            let pict = drawSmile(svg);
            pict.transition()
                .ease(d3["ease" + d3.select("#selectAnimation").property("value")])
                .duration(6000)
                .attrTween("transform", () => translateAlong(path.node()));    
        } else {
            const svg = d3.select("svg");
            let pict = drawSmile(svg);
            pict.attr("transform", `translate(${dataForm.select("#cx").property("value")}, ${dataForm.select("#cy").property("value")}) 
                scale(${dataForm.select("#mx").property("value")}, ${dataForm.select("#my").property("value")})
                rotate(${dataForm.select("#rotate").property("value")})`)
                .transition()
                .duration(6000)
                .ease(d3["ease" + d3.select("#selectAnimation").property("value")])
                .attr("transform", `translate(${dataForm.select("#cx_finish").property("value")}, ${dataForm.select("#cy_finish").property("value")}) 
                    scale(${dataForm.select("#mx_finish").property("value")}, ${dataForm.select("#my_finish").property("value")})
                    rotate(${dataForm.select("#rotate_finish").property("value")})`);
        }
    }
});

