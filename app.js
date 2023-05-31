let operator = ""; // Holds the current operator (+, -, *, /, %)
let a = ""; // First operand
let b = ""; // Second operand
const error = "   error"; // Error message

const display = document.querySelector(".display"); // DOM element for display
const numberButtons = document.querySelectorAll(".number"); // DOM elements for number buttons
const operatorButtons = document.querySelectorAll(".operator"); // DOM elements for operator buttons
const equalButton = document.querySelector(".equals"); // DOM element for equal button
const clearButton = document.querySelector(".clear"); // DOM element for clear button
const switchButtom = document.querySelector(".switch"); // DOM element for switch button

// Arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const modulus = (a, b) => a % b;

// Perform arithmetic operation based on the operator
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
                return "3RR0R"; // Indicates division by zero error
            } else if ((a / b) % 1 === 0) {
                return divide(a, b);
            } else {
                return divide(a, b).toFixed(8);
            }
        case "%":
            return modulus(a, b).toFixed(8);
    }
};

// Event listeners for number buttons
numberButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        const number = event.target.textContent;
        if (number === "." && display.textContent.length < 8) {
            // Decimal point input
            if (operator === "") {
                // If no operator is selected, update the first operand (a)
                if (a === "" || (a !== "" && !a.toString().includes("."))) {
                    a = a.toString() + number;
                    display.textContent = a;
                }
            } else {
                // If an operator is selected, update the second operand (b)
                if (b === "" || (b !== "" && !b.toString().includes("."))) {
                    b = b.toString() + number;
                    display.textContent = b;
                }
            }
        } else if (display.textContent.length < 8) {
            // Numeric input
            if (operator === "") {
                // If no operator is selected, update the first operand (a)
                a = parseFloat(a.toString() + number);
                display.textContent = a;
            } else if (operator !== "") {
                // If an operator is selected, update the second operand (b)
                b = parseFloat(b.toString() + number);
                display.textContent = b;
            }
        } else {
            // Maximum length reached
            display.textContent = error;
        }
    });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        operator = event.target.textContent;
    });
});

// Event listener for equal button
equalButton.addEventListener("click", function () {
    a = operate(a, operator, b); // Perform the operation
    operator = ""; // Reset the operator
    b = ""; // Reset the second operand
    if (a.toString().length < 8) {
        display.textContent = a; // Display the result
    } else {
        display.textContent = error; // Display an error message if result exceeds length limit
    }
});

// Event listener for clear button
clearButton.addEventListener("click", function () {
    a = ""; // Reset the first operand
    b = ""; // Reset the second operand
    operator = ""; // Reset the operator
    display.textContent = ""; // Clear the display
});

// Event listener for switch button
switchButtom.addEventListener("click", function () {
    if (display.textContent.length < 8) {
        if (operator === "") {
            a = -a; // Switch the sign of the first operand
            display.textContent = a; // Update the display
        } else {
            b = -b; // Switch the sign of the second operand
            display.textContent = b; // Update the display
        }
    }
});
