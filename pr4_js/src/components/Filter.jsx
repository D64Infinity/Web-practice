const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            "Название": event.target["name"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Масса (тонн)": 
                [event.target["weightFrom"].value
                 ? Number(event.target["weightFrom"].value)
                 : -Infinity,
                 event.target["weightTo"].value
                 ? Number(event.target["weightTo"].value)
                 : Infinity],
            "Калибр (мм)": 
                [event.target["caliberFrom"].value
                 ? Number(event.target["caliberFrom"].value)
                 : -Infinity,
                 event.target["caliberTo"].value
                 ? Number(event.target["caliberTo"].value)
                 : Infinity],
            "Макс. скорость": 
                [event.target["speedFrom"].value
                 ? Number(event.target["speedFrom"].value)
                 : -Infinity,
                 event.target["speedTo"].value
                 ? Number(event.target["speedTo"].value)
                 : Infinity],
            "Число экземпляров":
                [event.target["amountFrom"].value
                 ? Number(event.target["amountFrom"].value)
                 : -Infinity,
                
                event.target["amountTo"].value
                ? Number(event.target["amountTo"].value)
                : Infinity]
        };

        let arr = props.fullData;
        for (const key in filterField) {
            if (key === "Название" || key === "Тип") {
                arr = arr.filter(item => item[key].toLowerCase().includes(filterField[key]));
            } else {
                arr = arr.filter(item => Number(item[key]) >= Number(filterField[key][0]) && Number(item[key]) <= Number(filterField[key][1]));
            }
        }

        props.filtering(arr);
    }

    const handleReset = (event) => {
        props.filtering(props.fullData);
        props.onResetFilter();
    }

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Название: </label>
                <input type="text" name="name" />
            </p>
            <p>
                <label>Тип: </label>
                <input type="text" name="type" />
            </p>
            <p>
                <label>Масса (тонн) от </label>
                <input type="number" name="weightFrom" />
                <label> до </label>
                <input type="number" name="weightTo" />
            </p>
            <p>
                <label>Калибр (мм) от </label>
                <input type="number" name="caliberFrom" />
                <label> до </label>
                <input type="number" name="caliberTo" />
            </p>
            <p>
                <label>Макс. скорость от </label>
                <input type="number" name="speedFrom" />
                <label> до </label>
                <input type="number" name="speedTo" />
            </p>
            <p>
                <label>Число экземпляров от </label>
                <input type="number" name="amountFrom" />
                <label> до </label>
                <input type="number" name="amountTo" />
            </p>                        <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Сбросить</button>
            </p>
        </form>
    );
}

export default Filter;