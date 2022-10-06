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

let firstValue, secondValue, operator, currentTotal;

const display = document.getElementById('display');
function changeDisplay(btnSymbol){
    let currentValue = parseInt(display.value);
    let nextSymbol = parseInt(btnSymbol);
    
    //If current value is a number and button click is a number
    if(!isNaN(currentValue) && !isNaN(nextSymbol)){
        //Restart
        if(currentValue === 0 || (currentValue !== 0 && currentTotal)){
            display.value = nextSymbol;
            firstValue = parseInt(display.value);
            secondValue, operator, currentTotal = null;
        }
        // else if(currentValue !== 0 && currentTotal){

        // }
        else{
            display.value = display.value + btnSymbol;
            if(secondValue){
                secondValue = parseInt(display.value);
            }
        }
        
        //firstValue = parseInt(display.value);
    }
    //If current value is a number and button click is not a number
    else if(!isNaN(currentValue) && isNaN(nextSymbol)){
        if(!firstValue && firstValue !== 0){
            firstValue = parseInt(display.value);
        }
        display.value = btnSymbol;
        
        if(btnSymbol === "="){
            display.value = operate(operator, firstValue, secondValue);
            currentTotal = parseInt(display.value);
        }
        //operator = btnSymbol;
    }
    //If current value is not a number and button click is a number
    else if(isNaN(currentValue) && !isNaN(nextSymbol)){
        operator = display.value;
        display.value = btnSymbol;
        secondValue = parseInt(display.value);
        //display.value = operate(operator, firstValue, secondValue);
    }
}