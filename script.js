//Author: Murgray D. John
//Date: Started 10/5/2022
//Purpose: To create a functional calculator


//Program ran by these event listeners
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
[...buttons].forEach(button => {
    button.addEventListener('click', () => {checkBtnVal(button)})
});

//Move through program based on if value is a number or operator
function checkBtnVal(button){
    let buttonVal = button.textContent;
    let buttonIsNum = !isNaN(parseFloat(buttonVal));
    
    if(buttonIsNum){
        changeDisplay(parseFloat(buttonVal));
    }
    else{
        useOperators(buttonVal);
    }
}





/************* Calculation Object *************/
let calculation = {
    num1: null,
    num2: null,
    operator: null,
    total: 0,
    run: function() {
        this.total = operate(this.operator, this.num1, this.num2);
        this.total = +this.total.toFixed(5);
        return this.total;
    },
    clear: function(){
        this.num1 = null;
        this.num2 = null;
        this.operator = null;
        //this.total = null;
    }
}
/************* Calculation Object -END *************/







/************* Operand change section *************/
function changeDisplay(newDigit){
    if(calculation.num1 === null){
        setNum1(newDigit);
    }
    else{ //num1 is not null and there is no operator, means entering in multi digit number
        if(!calculation.operator){ 
            display.value += newDigit;
            calculation.num1 = parseFloat(display.value);
        }else{ //if there's an operator, we're entering in num2
            setNum2(newDigit);
        }
    }
}

function setNum1(newDigit){
    if(display.value === "0"
        || (display.value !== `0.` && display.value !== `${calculation.total}.`)){
            
        display.value = calculation.num1 = newDigit;
    }
    else{
        display.value += newDigit;
        calculation.num1 = parseFloat(display.value);
    }
}

function setNum2(newDigit){
    if(display.value === "0" 
        || (display.value !== "0." && calculation.num2 === null)){ 
        
        display.value = calculation.num2 = newDigit;
    }
    else{
        display.value += newDigit;
        calculation.num2 = parseFloat(display.value);
    }
}

/************* Basic Operations *************/
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
/************* Basic Operations -END *************/
/************* Operand change section -END *************/









/******************  Operator section ******************/
function useOperators(operator){
    switch (operator){
        case "=": useEqualSign();
            break;
        case "AC": calculation.clear();
            display.value = 0;
            break;
        case "CE": clearEntry();
            break;
        case ".": pointOperator();
            break;
        case "+/-": unaryOperation(operator);
            break;
        case "%": unaryOperation(operator);
            break;
        default: //Button is +, -, *, or /
            basicOperation(operator);
    }
}

function useEqualSign(){
    if(calculation.operator === "/" && calculation.num2 === 0){
        display.value = calculation.total = ">:(";
    }
    else if(calculation.num1 !== null && calculation.num2 === null){
        display.value = calculation.total = calculation.num1;
    }
    else{
        display.value = calculation.run();
    }
    calculation.clear();
}

function clearEntry(){
    if(display.value !== "0" && display.value.length !== 1){
        display.value = display.value.slice(0, -1)
        updateOperands();
    }
    else if(display.value.length === 1){
        display.value = '0';
        updateOperands();
    }
}

function pointOperator(){
    //If user presses "." without a 0 first
    if(calculation.num1 && calculation.operator && !calculation.num2){
        display.value = "0.";
    }
    else if(!display.value.includes(".")){
        display.value += ".";
    }
}

function unaryOperation(operator){
    if(display.value !== "0" && display.value !== "0."){
        
        if(operator === "%") {display.value /= 100}
        else if(operator === "+/-") {display.value *= -1};

        updateOperands();
    }
}

//Button is +, -, *, or /
function basicOperation(operator){
    if(!calculation.num1){
        calculation.num1 = parseFloat(display.value);
    }
    if(calculation.num1 && calculation.num2){
        display.value = calculation.run();
        calculation.num1 = parseFloat(display.value);
        calculation.num2 = null;
    }
    calculation.operator = operator;
}




//Helper function
//Resets operands to default values or updates them to 
//current display value
function updateOperands(){
    if(!calculation.operator){
        if(display.value !== "0"){
            calculation.num1 = parseFloat(display.value);
        }
        else{
            calculation.num1 = null;
        }
    }
    else{
        calculation.num2 = parseFloat(display.value);
    }
}
/******************  Operator section -END ******************/