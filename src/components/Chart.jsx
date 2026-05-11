import * as d3 from "d3";
import { useState, useRef } from "react";
import ChartDraw from "./ChartDraw";
import "../css/index.css"

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false]);
    const [graphType, setGraphType] = useState("dotted")

    const oyRef = useRef(null);

    const onChange = () => {
        oyRef.current.className = "";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const checked = event.target["oy"][0].checked || event.target["oy"][1].checked;
        oyRef.current.className = checked ? "" : "error";
        if (!checked) { return; }
        
        setOx(event.target["ox"].value);
        setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])
        setGraphType(event.target["graphType"].value);
    }

    const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];
        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        return arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={ handleSubmit }>
                <p>Значение по оси OX:</p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна" }/>
                    Страна
                    <br/>
                    <input type="radio" name="ox" value="Год" />
                    Год
                </div>

                <p>Значение по оси OY:</p>
                <div ref={ oyRef }>
                    <input type="checkbox" name="oy" onChange={ onChange } defaultChecked={ oy[0] } />
                    Максимальная высота
                    <br/>
                    <input type="checkbox" name="oy" onChange={ onChange } />
                    Минимальная высота
                </div>
                <br/>

                <label for="graphType">Тип диаграммы:</label>
                <select name="graphType">
                    <option value="dotted">Точечная диаграмма</option>
                    <option value="hist">Гистограмма</option>
                </select>

                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>
            <ChartDraw data={ createArrGraph(props.data, ox) } graphType={ graphType } oy={ oy } />
        </>
    )
}

export default Chart;