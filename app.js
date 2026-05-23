/* SIDEBAR */

const menuToggle =
document.getElementById("menu-toggle");

const sidebar =
document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("active");
});

/* NAVIGATION */

const navButtons =
document.querySelectorAll(".nav-btn");

const modes =
document.querySelectorAll(".mode");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        navButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        modes.forEach(mode =>
            mode.classList.remove("active-mode")
        );

        const modeId =
            button.dataset.mode + "-mode";

        document
        .getElementById(modeId)
        .classList.add("active-mode");

        sidebar.classList.remove("active");
    });

});

/* BASIC */

const currentOperation =
document.getElementById("current-operation");

const previousOperation =
document.getElementById("previous-operation");

const numberButtons =
document.querySelectorAll(".number");

const operatorButtons =
document.querySelectorAll(".operator");

const equalsButton =
document.querySelector(".equals");

const clearButton =
document.querySelector(".clear");

const deleteButton =
document.querySelector(".delete");

let currentInput = "";
let previousInput = "";
let operator = null;

function updateDisplay(){

    currentOperation.innerText =
        currentInput || "0";

    previousOperation.innerText =
        operator ?
        `${previousInput} ${operator}` :
        "";
}

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentInput += button.innerText;

        updateDisplay();
    });

});

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(currentInput === "") return;

        operator = button.innerText;

        previousInput = currentInput;

        currentInput = "";

        updateDisplay();
    });

});

function calculate(){

    let result;

    const prev =
    parseFloat(previousInput);

    const current =
    parseFloat(currentInput);

    switch(operator){

        case "+":
            result = prev + current;
            break;

        case "−":
            result = prev - current;
            break;

        case "×":
            result = prev * current;
            break;

        case "÷":
            result = prev / current;
            break;

        case "%":
            result = prev % current;
            break;
    }

    currentInput = result.toString();

    operator = null;

    previousInput = "";

    updateDisplay();
}

equalsButton.addEventListener("click", calculate);

clearButton.addEventListener("click", () => {

    currentInput = "";
    previousInput = "";
    operator = null;

    updateDisplay();
});

deleteButton.addEventListener("click", () => {

    currentInput =
    currentInput.slice(0,-1);

    updateDisplay();
});

updateDisplay();

/* SCIENTIFIC */

const sciButtons =
document.querySelectorAll(".sci-btn");

const sciExpression =
document.getElementById("scientific-expression");

const sciResult =
document.getElementById("scientific-result");

const sciClear =
document.querySelector(".sci-clear");

let sciInput = "";

sciButtons.forEach(button => {

    button.addEventListener("click", () => {

        sciButtons.forEach(btn =>
            btn.classList.remove("active-sci")
        );

        button.classList.add("active-sci");

        const value = button.innerText;

        if(!isNaN(value) || value === "."){

            sciInput += value;

            sciResult.innerText = sciInput;

            return;
        }

        const number =
        parseFloat(sciInput);

        let result = 0;

        switch(value){

            case "√":
                result = Math.sqrt(number);
                break;

            case "x²":
                result = number ** 2;
                break;

            case "sin":
                result = Math.sin(number);
                break;

            case "cos":
                result = Math.cos(number);
                break;

            case "tan":
                result = Math.tan(number);
                break;

            case "log":
                result = Math.log10(number);
                break;

            case "ln":
                result = Math.log(number);
                break;

            case "π":
                result = Math.PI;
                break;

            case "e":
                result = Math.E;
                break;

            case "1/x":
                result = 1 / number;
                break;

            case "x!":

                result = 1;

                for(let i=1;i<=number;i++){

                    result *= i;
                }

                break;
        }

        sciExpression.innerText = value;

        sciResult.innerText = result;
    });

});

document
.querySelector(".sci-equals")
.addEventListener("click", () => {

    sciExpression.innerText = "=";
});

sciClear.addEventListener("click", () => {

    sciInput = "";

    sciExpression.innerText = "";

    sciResult.innerText = "0";
});

/* =========================
   FINAL WORKING CONVERTER
========================= */

const convertButtons =
document.querySelectorAll(".convert-btn");

const convertDisplay =
document.getElementById("convert-display");

const conversionResult =
document.getElementById("conversion-result");

const convertClear =
document.getElementById("convert-clear");

const convertEquals =
document.getElementById("convert-equals");

let convertInput = "";

/* BUTTON INPUT */

convertButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        if(
            value === "." &&
            convertInput.includes(".")
        ){
            return;
        }

        convertInput += value;

        convertDisplay.innerText =
            convertInput;
    });

});

/* CLEAR */

convertClear.addEventListener("click", () => {

    convertInput = "";

    convertDisplay.innerText = "0";

    conversionResult.innerText =
        "Result: 0";
});

/* CONVERSION */

convertEquals.addEventListener("click", async () => {

    const from =
    document.getElementById("from-currency").value;

    const to =
    document.getElementById("to-currency").value;

    if(
        convertInput === "" ||
        convertInput === "."
    ){

        convertInput = "1";
    }

    /* SAME CURRENCY */

    if(from === to){

        conversionResult.innerText =
            `Result: ${convertInput} ${to}`;

        return;
    }

    try{

        /* NEW API */

        const response = await fetch(
`https://open.er-api.com/v6/latest/${from}`
        );

        if(!response.ok){

            throw new Error(
                "API request failed"
            );
        }

        const data =
        await response.json();

        console.log(data);

        /* GET RATE */

        const rate =
        data.rates[to];

        if(!rate){

            throw new Error(
                "Currency not found"
            );
        }

        const result =
        (
            parseFloat(convertInput) *
            rate
        ).toFixed(2);

        conversionResult.innerText =
            `Result: ${result} ${to}`;

    }catch(error){

        console.error(error);

        conversionResult.innerText =
            "Conversion Failed";
    }

});
/* CLEAR BUTTON */

convertClear.addEventListener("click", () => {

    convertInput = "";

    convertDisplay.innerText = "0";

    conversionResult.innerText =
        "Result: 0";
});

/* CONVERT BUTTON */

convertEquals.addEventListener("click", async () => {

    const from =
    document.getElementById("from-currency").value;

    const to =
    document.getElementById("to-currency").value;

    /* EMPTY INPUT SAFETY */

    if(
        convertInput === "" ||
        convertInput === "."
    ){

        convertInput = "1";
    }

    /* SAME CURRENCY */

    if(from === to){

        conversionResult.innerText =
            `Result: ${convertInput} ${to}`;

        return;
    }

    try{

        const response = await fetch(
`https://api.frankfurter.app/latest?amount=${convertInput}&from=${from}&to=${to}`
        );

        /* RESPONSE CHECK */

        if(!response.ok){

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const data =
        await response.json();

        console.log("API DATA:", data);

        /* DATA VALIDATION */

        if(
            !data ||
            !data.rates ||
            typeof data.rates[to] === "undefined"
        ){

            throw new Error(
                "Invalid API response"
            );
        }

        const result =
        data.rates[to];

        conversionResult.innerText =
            `Result: ${result} ${to}`;

    }catch(error){

        console.error(
            "Conversion Error:",
            error
        );

        conversionResult.innerText =
            "Conversion Failed";
    }

});

/* THEMES */

document
.getElementById("light-theme")
.addEventListener("click", () => {

    document.body.classList.add("light-mode");
});

document
.getElementById("dark-theme")
.addEventListener("click", () => {

    document.body.classList.remove("light-mode");
})
