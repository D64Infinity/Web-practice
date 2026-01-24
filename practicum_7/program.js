const form = document.getElementById("figure-form");
const img = document.getElementById("figure-img");
const fieldsDiagonals = document.getElementById("diagonals");
const fieldsSideNAngle = document.getElementById("side-n-angle");
const errorText = document.getElementById("error");
const resultText = document.getElementById("results");
const resultOptions = document.getElementById("results-checkbox");

const {
    d1,
    d2,
    side,
    alpha,
    radius,
    height,
    perimeter,
    inputType
} = form.elements;

document.getElementById("show-button").onclick = () => {
    clearErrors();
    resultText.innerHTML = "";

    if (inputType.value === "diagonals") {
        fieldsDiagonals.style.display = "block";
        fieldsSideNAngle.style.display = "none";
        img.src = "figure-by-diagonals.png";
    } else {
        fieldsDiagonals.style.display = "none";
        fieldsSideNAngle.style.display = "block";
        img.src = "figure-by-side-n-angle.png";
    }
};

document.getElementById("calculate-button").onclick = () => {
    clearErrors();
    resultText.innerHTML = "";
    let hasError = false;
    let r, h, p;

    if (!radius.checked && !height.checked && !perimeter.checked) {
        resultOptions.classList.add("checkbox-error");
        hasError = true;
    }

    if (inputType.value === "diagonals") {
        const dVal1 = parseFloat(d1.value);
        const dVal2 = parseFloat(d2.value);
        if (!checkNumber(dVal1, d1)) {
            hasError = true;
        }
        if (!checkNumber(dVal2, d2)) {
            hasError = true;
        }
        if (!hasError) {
            const sideVal= Math.sqrt((dVal1 / 2) ** 2 + (dVal2 / 2) ** 2);
            r = (dVal1 * dVal2) / (4 * sideVal);
            h = (dVal1 * dVal2) / (2 * sideVal);
            p = 4 * sideVal;
        }
    } else if (inputType.value === "side-n-angle"){
        const sideVal = parseFloat(side.value);
        const angleVal = parseFloat(alpha.value);
        if (!checkNumber(sideVal, side)) {
            hasError = true;
        }
        if (!checkAngle(angleVal, alpha)) {
            hasError = true
        };
        if (!hasError) {
            const angleRad = angleVal * Math.PI / 180;
            r = sideVal * Math.sin(angleRad) / 2;
            h = sideVal * Math.sin(angleRad);
            p = 4 * sideVal;
        }
    }

    if (hasError) {
        return;
    }
    if (radius.checked) {
        resultText.innerHTML += `Радиус вписанной окружности: ${r.toFixed(2)}<br>`
    };
    if (height.checked) {
        resultText.innerHTML += `Высота: ${h.toFixed(2)}<br>`
    };
    if (perimeter.checked) {
        resultText.innerHTML += `Периметр: ${p.toFixed(2)}<br>`
    };
};

document.getElementById("clear-button").onclick = () => {
    [d1, d2, side, alpha].forEach(field => field.value = "");
    [radius, height, perimeter].forEach(check => check.checked = false);
    clearErrors();
    resultText.innerHTML = "";
    img.src = "figure-by-default.png";
};


function checkNumber(value, field) {
    if (isNaN(value) || value <= 0) {
        field.classList.add("error");
        let text = errorText.appendChild(document.createElement("p"));
        text.textContent = "Поле должно содержать натуральное значение";
        return false;
    }
    return true;
}

function checkAngle(value, field) {
    if (isNaN(value) || value < 1 || value > 90) {
        field.classList.add("error");
        let text = errorText.appendChild(document.createElement("p"));
        text.textContent = "Угол должен быть от 1 до 90 градусов";
        return false;
    }
    return true;
}

function checkResultsSelected() {
    if (!radius.checked && !height.checked && !perimeter.checked) {
        resultOptions.classList.add("checkbox-error");
        return false;
    }
    return true;
}

function clearErrors() {
    errorText.textContent = "";
    [...form.elements].forEach(el => el.classList.remove("error"));
    resultOptions.classList.remove("checkbox-error");
}

d1.addEventListener("focus", () => d1.classList.remove("error"));
d1.addEventListener("input", () => errorText.textContent = "");
d2.addEventListener("focus", () => d2.classList.remove("error"));
d2.addEventListener("input", () => errorText.textContent = "");
side.addEventListener("focus", () => side.classList.remove("error"));
side.addEventListener("input", () => errorText.textContent = "");
alpha.addEventListener("focus", () => alpha.classList.remove("error"));
alpha.addEventListener("input", () => errorText.textContent = "");

radius.addEventListener("change", () => {
    resultOptions.classList.remove("checkbox-error");
    errorText.textContent = "";
});
height.addEventListener("change", () => {
    resultOptions.classList.remove("checkbox-error");
    errorText.textContent = "";
});
perimeter.addEventListener("change", () => {
    resultOptions.classList.remove("checkbox-error");
    errorText.textContent = "";
});


