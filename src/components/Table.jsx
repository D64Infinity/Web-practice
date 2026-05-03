import { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Filter from "./Filter";



const Table = (props) => {

    const [activePage, setActivePage] = useState("3");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    }

    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage("1");
    }
    
    const n = Math.ceil(dataTable.length / props.amountRows);
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    const pages = arr.map((item, index) => 
        <span key={ index } onClick={ changeActive } className={
            index+1 == activePage ? "current" : "not-current"
        }> { item } </span>
    );

    return (
        <>
            <h4>Фильтры</h4>
            <Filter filtering={ updateDataTable } /*data={ dataTable }*/ fullData={ props.data } />

            <table>
                <TableHead head={ Object.keys(props.data[0]) } />
                {props.enablePages == "true" ? (
                    <TableBody body={ dataTable } amountRows={ props.amountRows } numPage={ activePage } />
                ) : (
                    <TableBody body={ dataTable } amountRows={ props.data.length } numPage="1" />
                )}
            </table>

            {props.enablePages == "true" ? (
                <div>
                    { pages }
                </div>
            ) : (
                <> </>
            )}
        </>
    )
}

export default Table;