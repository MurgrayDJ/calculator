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
        changeDisplay(button.textContent);
    })
});

const display = document.getElementById('display');
function changeDisplay(btnSymbol){
    let currentValue = parseInt(display.value);
    let nextSymbol = parseInt(btnSymbol);
    
    //If current value is a number and button click is a number
    if(!isNaN(currentValue) && !isNaN(nextSymbol)){
        if(currentValue === 0){
            display.value = '';
        }
        display.value = display.value + btnSymbol;
    }
    //If current value is a number and button click is not a number
    else if(!isNaN(currentValue) && isNaN(nextSymbol)){
        display.value = btnSymbol;
    }
    //If current value is not a number and button click is a number
    else if(isNaN(currentValue) && !isNaN(nextSymbol)){
        display.value = btnSymbol;
    }
}