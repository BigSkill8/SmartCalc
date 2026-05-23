/* =========================
   FINAL STABLE CONVERTER
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

/* NUMBER PAD INPUT */

convertButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        /* PREVENT MULTIPLE DECIMALS */

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
