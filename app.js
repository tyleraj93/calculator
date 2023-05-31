let operator = "";
let a = "";
let b = "";
const error = "   error";

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const switchButtom = document.querySelector(".switch");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const modulus = (a, b) => a % b;
const operate = (a, operator, b) => {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            // Used toFixed(4) because I'm rounding to the 8th place and want
            // a whole number divided by a number and multiplied by the same
            // number to be the same as the original for example:
            // 25 / 6 = 4.16666667 * 6 = 25 without any hanging zeros
            if (((a * b) % 1).toFixed(7) == 0) {
                return multiply(a, b).toFixed(0);
            } else {
                return multiply(a, b).toFixed(8);
            }
        case "/":
            if (b === 0) {
                return "3RR0R";
            } else if ((a / b) % 1 === 0) {
                return divide(a, b);
            } else {
                return divide(a, b).toFixed(8);
            }
        case "%":
            return modulus(a, b).toFixed(8);
    };
};

numberButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        const number = event.target.textContent;
        if (number === "." && display.textContent.length < 8) {
            if (operator === "") {
                if (a === "" || (a !== "" && !a.toString().includes("."))) {
                    a = a.toString() + number;
                    display.textContent = a;
                }
            } else {
                if (b === "" || (b !== "" && !b.toString().includes("."))) {
                    b = b.toString() + number;
                    display.textContent = b;
                }
            }
        } else if (display.textContent.length <8) {
            if (operator === "") {
                a = parseFloat(a.toString() + number);
                display.textContent = a;
            } else if (operator !== "") {
                b = parseFloat(b.toString() + number);
                display.textContent = b;
            }
        } else {
            display.textContent = error;
        };
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        operator = event.target.textContent;
    });
});

equalButton.addEventListener("click", function () {
    a = operate(a, operator, b);
    operator = "";
    b = "";
    if (a.toString().length < 8) {
        display.textContent = a;
    } else {
        display.textContent = error;
    }
    
});

clearButton.addEventListener("click", function () {
    a = "";
    b = "";
    operator = "";
    display.textContent = "";
})

switchButtom.addEventListener("click", function () {
    if(display.textContent.length < 8){
        if (operator === "") {
            a = -a;
            display.textContent = a;
        } else {
            b = -b;
            display.textContent = b;
        }
    }
})