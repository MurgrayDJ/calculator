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

let calculation = {
    num1: null,
    num2: null,
    operator: null,
    total: null,
    run: function() {
        this.total = operate(this.operator, this.num1, this.num2);
        return this.total;
    },
    clear: function(){
        this.num1 = null;
        this.num2 = null;
        this.operator = null;
        this.total = null;
    }
}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
[...buttons].forEach(button => {
    button.addEventListener('click', () => {checkBtnVal(button)})
});

function checkBtnVal(button){
    let buttonVal = button.textContent;
    let buttonIsNum = !isNaN(parseInt(buttonVal));
    
    if(buttonIsNum){
        changeDisplay(parseInt(buttonVal));
    }
    else{
        useOperators(buttonVal);
    }
}

function changeDisplay(buttonVal){
    let displayValue = parseInt(display.value);
    
    if(displayValue === 0){
        display.value = calculation.num1 = buttonVal;
    }
    else{
        if(!calculation.operator){
            display.value += buttonVal;
            calculation.num1 = parseInt(display.value);
        }
        else{
            if(!calculation.num2){
                display.value = calculation.num2 = buttonVal;
            }
            else{
                display.value += buttonVal;
                calculation.num2 = parseInt(display.value);
            }
        }
    }
}

function useOperators(buttonVal){
    switch (buttonVal){
        case "=": display.value = calculation.run();
            calculation.clear();
            break;
        case "AC": calculation.clear();
            display.value = 0;
            break;
        default:
            if(!calculation.num1){
                calculation.num1 = parseInt(display.value);
            }
            if(calculation.num1 && calculation.num2){
                display.value = calculation.run();
                calculation.num1 = parseInt(display.value);
                calculation.num2 = null;
            }
            calculation.operator = buttonVal;
    }
}