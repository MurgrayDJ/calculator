//Author: Murgray D. John
//Date: Started 10/5/2022
//Purpose: To create a functional calculator

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    let answer;
    switch (operator) {
        case '+': answer = add(num1, num2);
            break;
        case '-': answer = subtract(num1, num2);
            break;
        case '*': answer = multiply(num1, num2);
            break;
        case '/': answer = divide(num1, num2);
            break;
    }
    return answer;
}

const buttons = document.querySelectorAll('button');
[...buttons].forEach(button => {
    button.addEventListener('click', () => {
        displayButton(button.textContent);
    })
});

const display = document.getElementById('display');
function displayButton(btnSymbol){
    display.value = btnSymbol;
}