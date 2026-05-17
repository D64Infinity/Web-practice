import { useState, useEffect } from "react";

const Sort = (props) => {
    const [sortOptions, setSortOptions] = useState({
        lvl1: { col: "Нет", desc: false },
        lvl2: { col: "Нет", desc: false },
        lvl3: { col: "Нет", desc: false }
    });

    const allFields = Object.keys(props.data[0]);

    const level2Disabled = sortOptions.lvl1.col === "Нет";
    const level3Disabled = level2Disabled || sortOptions.lvl2.col === "Нет";

    const level1Options = ["Нет", ...allFields];
    const level2Options = ["Нет", ...allFields.filter(col => col !== sortOptions.lvl1.col)];
    const level3Options = ["Нет", ...allFields.filter(col => 
        col !== sortOptions.lvl1.col && col !== sortOptions.lvl2.col
    )];

    const handleLevel1Change = (event) => {
        const newField = event.target.value;
        setSortOptions({
            lvl1: { col: newField, desc: false },
            lvl2: { col: "Нет", desc: false },
            lvl3: { col: "Нет", desc: false }
        });
    };

    const handleLevel2Change = (event) => {
        const newField = event.target.value;
        setSortOptions(prev => ({
            ...prev,
            lvl2: { col: newField, desc: false },
            lvl3: { col: "Нет", desc: false }
        }));
    };

    const handleLevel3Change = (event) => {
        const newField = event.target.value;
        setSortOptions(prev => ({
            ...prev,
            lvl3: { col: newField, desc: false }
        }));
    };

    const handleDescChange = (level, checked) => {
        setSortOptions(prev => ({
            ...prev,
            [level]: { ...prev[level], desc: checked }
        }));
    };

    const handleSort = () => {
        props.onSort(sortOptions);
    };

    const resetSortFields = () => {
        setSortOptions({
            lvl1: { col: "Нет", desc: false },
            lvl2: { col: "Нет", desc: false },
            lvl3: { col: "Нет", desc: false }
        });
    }        

    if (props.resetRef) props.resetRef.current = resetSortFields;

    const handleReset = () => {
        resetSortFields();
        props.onResetSort();
    };

    return (
        <div>            
            <p>
                <label>Первый уровень: </label>
                <select value={ sortOptions.lvl1.col } onChange={ handleLevel1Change }>
                    {level1Options.map(col => (
                        <option value={ col }>{ col }</option>
                    ))}
                </select>
                {sortOptions.lvl1.col !== "Нет" && (
                    <label>
                        <input type="checkbox" checked={ sortOptions.lvl1.desc } onChange={(e) => 
                            handleDescChange('lvl1', e.target.checked)} /> по убыванию?
                    </label>
                )}
            </p>
            <p>
                <label>Второй уровень: </label>
                <select value={ sortOptions.lvl2.col } onChange={ handleLevel2Change } disabled={ level2Disabled }>
                    {level2Options.map(col => (
                        <option value={col}>{col}</option>
                    ))}
                </select>
                {sortOptions.lvl2.col !== "Нет" && (
                    <label>
                        <input type="checkbox" checked={ sortOptions.lvl2.desc } onChange={(e) =>
                        handleDescChange('lvl2', e.target.checked)} /> по убыванию?
                    </label>
                )}
            </p>
            <p>
                <label>Третий уровень: </label>
                <select value={ sortOptions.lvl3.col } onChange={ handleLevel3Change } disabled={ level3Disabled }>
                    {level3Options.map(col => (
                        <option value={col}>{col}</option>
                    ))}
                </select>
                {sortOptions.lvl3.col !== "Нет" && (
                    <label>
                        <input type="checkbox" checked={sortOptions.lvl3.desc} onChange={(e) =>
                        handleDescChange('lvl3', e.target.checked)} /> по убыванию?
                    </label>
                )}
            </p>
            <p>
                <button onClick={ handleSort }>Сортировать</button>
                <button onClick={ handleReset }>Очистить сортировку</button>
            </p>
        </div>
    );
};

export default Sort;