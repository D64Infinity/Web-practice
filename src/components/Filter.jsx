const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": 
                [event.target["yearFrom"].value
                 ? Number(event.target["yearFrom"].value)
                 : -Infinity,
                 event.target["yearTo"].value
                 ? Number(event.target["yearTo"].value)
                 : Infinity],
            "Высота":
                [event.target["heightFrom"].value
                 ? Number(event.target["heightFrom"].value)
                 : -Infinity,
                
                event.target["heightTo"].value
                ? Number(event.target["heightTo"].value)
                : Infinity]
        };

        let arr = props.fullData;
        for (const key in filterField) {
            if (key != "Год" && key != "Высота") {
                arr = arr.filter(item => item[key].toLowerCase().includes(filterField[key]));
            } else {
                arr = arr.filter(item => Number(item[key]) >= Number(filterField[key][0]) && Number(item[key]) <= Number(filterField[key][1]));
            }
        }

        props.filtering(arr);
    }

    const handleReset = (event) => {
        props.filtering(props.fullData);
    }

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Название: </label>
                <input type="text" name="structure" />
            </p>
            <p>
                <label>Тип: </label>
                <input type="text" name="type" />
            </p>
            <p>
                <label>Страна: </label>
                <input type="text" name="country" />
            </p>
            <p>
                <label>Город: </label>
                <input type="text" name="city" />
            </p>
            <p>
                <label>Год от </label>
                <input type="number" name="yearFrom" />
                <label> до </label>
                <input type="number" name="yearTo" />
            </p>
            <p>
                <label>Высота от </label>
                <input type="number" name="heightFrom" />
                <label> до </label>
                <input type="number" name="heightTo" />
            </p>            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    );
}

export default Filter;