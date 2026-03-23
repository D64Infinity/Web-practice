const dataFilter = dataForm => {
    let dictFilter = {};
    for (const element of dataForm.elements) {
        let valInput = element.value;

        if (element.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (element.type === "number") {
            if (element.value !== "") {
                valInput = parseFloat(valInput);
            } else {
                if (element.id.includes("From")) {
                    valInput = -Infinity;
                } else if (element.id.includes("To")) {
                    valInput = +Infinity;
                }
            }
        } 

        dictFilter[element.id] = valInput;
    }
    return dictFilter;
};

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);
    let tableFilter = data.filter(item => {
        let result = true;

        Object.entries(item).map(([key, val]) => {
            if (typeof val === "string") {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]])
            } else if (typeof val === "number") {
                const [idFrom, idTo] = correspond[key];
                const minVal = datafilter[idFrom];
                const maxVal = datafilter[idTo];
                result &&= (val >= minVal && val <= maxVal);
            }
        });

        return result;
    });

    clearTable(idTable);
    createTable(tableFilter, idTable);
};

const clearFilter = (data, idTable, dataForm) => {
    dataForm.reset();
    clearTable(idTable);
    createTable(data, idTable);
}