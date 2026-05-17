import { useState, useRef } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Filter from "./Filter";
import Sort from "./Sort";



const Table = (props) => {
    const sortResetRef = useRef();

    const [activePage, setActivePage] = useState("3");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    }

    const [dataTable, setDataTable] = useState(props.data);
    const [filteredData, setFilteredData] = useState(props.data);
    const updateDataTable = (value) => {
        setFilteredData(value)
        setDataTable(value);
        setActivePage("1");

        if (sortResetRef.current) {
            sortResetRef.current();
        }
    }

    const applySorting = (data, sortOptions) => {
        const numericCols = ["Масса (тонн)", "Калибр (мм)", "Макс. скорость", "Число экземпляров"];

        return [...data].sort((a, b) => {
            const levels = ["lvl1", "lvl2", "lvl3"];

            for (let level of levels) {
                const { col, desc } = sortOptions[level];
                
                if (col === "Нет") continue;

                let [aVal, bVal] = [a[col], b[col]];

                if (numericCols.includes(col)) {
                    aVal = Number(aVal);
                    bVal = Number(bVal);
                }

                let comparison = 0;
                if (aVal > bVal) comparison = 1 
                if (aVal < bVal) comparison = -1;

                if (comparison !== 0) {
                    return desc ? -comparison : comparison;
                }
            }
            return 0;
        });
    }

    const handleSort = (sortOptions) => {
        const sortedData = applySorting(filteredData, sortOptions);
        setDataTable(sortedData);
        setActivePage("1");
    }

    const handleResetFilter = () => {
        setFilteredData(props.data);
        setDataTable(props.data);
        setActivePage("1");
        
        if (sortResetRef.current) {
            sortResetRef.current();
        }
    }

    const handleResetSort = () => {
        setDataTable(filteredData);
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
            <Filter filtering={ updateDataTable } fullData={ props.data } onResetFilter={ handleResetFilter } />

            <h4>Сортировка</h4>
            <Sort data={ props.data } onSort={ handleSort } onResetSort={ handleResetSort } resetRef={ sortResetRef } />

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