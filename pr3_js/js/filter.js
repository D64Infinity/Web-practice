const dataFilter = formData => {
    let dictFilter = {};
    for (const elem of formData.elements) {
        let valInput = elem.value;

        if (elem.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (elem.type === "number") {
            if (elem.value !== "") {
                valInput = parseFloat(valInput);
            } else {
                if (elem.id.includes("From")) {
                    valInput = -Infinity;
                } else if (elem.id.includes("To")) {
                    valInput = +Infinity;
                }
            }
        } 

        dictFilter[elem.id] = valInput;
    }
    return dictFilter;
}

const filterTable = (tableId, formData, data) => {
    const datafilter = dataFilter(formData);
    let tableFilter = data.filter(item => {
        let res = true;

        Object.entries(item).map(([key, val]) => {
            if (typeof val === "string") {
                res &&= val.toLowerCase().includes(datafilter[colsToKeys[key]])
            } else if (typeof val === "number") {
                const [idFrom, idTo] = colsToKeys[key];
                const minVal = datafilter[idFrom];
                const maxVal = datafilter[idTo];
                res &&= (val >= minVal && val <= maxVal);
            }
        });

        return res;
    });

    clearTable(tableId);
    createTable(tableId, tableFilter);
}

const resetFilter = (tableId, formData, data) => {
    formData.reset();
    clearTable(tableId);
    createTable(tableId, data);
}