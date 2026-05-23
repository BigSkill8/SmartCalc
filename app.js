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

/* CONVERTER */

const convertButtons =
document.querySelectorAll(".convert-btn");

const convertDisplay =
document.getElementById("convert-display");

let convertInput = "";

convertButtons.forEach(button => {

    button.addEventListener("click", () => {

        convertInput += button.innerText;

        convertDisplay.innerText =
            convertInput;
    });

});

document
.getElementById("convert-clear")
.addEventListener("click", () => {

    convertInput = "";

    convertDisplay.innerText = "0";
});

document
.getElementById("convert-equals")
.addEventListener("click", async () => {

    const from =
    document.getElementById("from-currency").value;

    const to =
    document.getElementById("to-currency").value;

    try{

        const response = await fetch(
`https://api.frankfurter.app/latest?amount=${convertInput}&from=${from}&to=${to}`
        );

        const data =
        await response.json();

        const result =
        data.rates[to];

        document
        .getElementById("conversion-result")
        .innerText =
            `Result: ${result} ${to}`;

    }catch(error){

        document
        .getElementById("conversion-result")
        .innerText =
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