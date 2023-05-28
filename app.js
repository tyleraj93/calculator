let sum = 0;
let operator = '';
let a = 0;
let b = 0;
const buttons = document.querySelectorAll(".button");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, operator, b) => {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    };
};

// buttons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//         //console.log(event.target.textContent);
//         const targetClass = event.target.className.split(" ");
//         for (let index in targetClass) {
//             if (targetClass[index] == "number" && a == 0) {
//                 a = event.target.textContent;
//                 console.log(a);
//             }else if (targetClass[index] == "number")
//         }
//     })
// });