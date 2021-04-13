const equal = document.querySelector('[data-equal]')
const numbers = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll('[data-operation]')
const allClear = document.querySelector('[data-ac]')
const del = document.querySelector('[data-del]')
const display = document.querySelector('[data-output]')
const points = document.querySelector('[data-point]')

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldReset = false;
let shouldEvaluate = false;
let nextOperation = null;



let displayValue = "";

function add(a,b) {
    return parseFloat(a) + parseFloat(b);
    
}

function substract(a,b) {
    return a - b;
    
}

function divide(a,b) {
    return a / b;
   
}

function multiply(a,b) {
    return a * b;
 
}

function operate(operation, a, b) {
    switch (operation) {
      case "+":
        return add(a, b);
      case "-":
        return substract(a, b);
      case "*":
        return multiply(a, b);
      case "/":
        if (b == null || b == 0 || b === "0" ) {
            alert("You can't divide per 0 !")
            return null ;}
        else return divide(a, b);
    }
  }

  function displayNumbers(number){
      
    if (currentOperation === null && shouldReset === false){
    firstOperand += number.toString();
    }


    else if (firstOperand === display.textContent && shouldReset === true ){
        firstOperand = "";
        currentOperation = null;
        firstOperand += number.toString()
        display.textContent = "";
        shouldReset = false;
        shouldEvaluate = false;

    }

    else if (firstOperand === display.textContent && shouldEvaluate === true){
        display.textContent = "";
        secondOperand += number.toString();
        shouldReset = false;
        
        
    }

    else {
    secondOperand += number.toString();
    
    }
       
    display.textContent += number;
}


  function displayPoint(){
      if (display.textContent.includes(".")) {
        return;
      }
      else {
      firstOperand += ".";
      display.textContent += ".";}
  }


  function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }



  function setOperation(operator) {
    if (currentOperation !== null && secondOperand !== "") {
    nextOperation = operator;
    evaluate2();}
    else if (shouldEvaluate === true) {
        shouldReset = false;
        evaluate2();}
    else if (currentOperation === null){
    currentOperation = operator ;
    display.textContent += currentOperation;}
    
  }
 
  function evaluate(){
      if (secondOperand === ""){
          return;
      }
      else {
      display.textContent = roundResult(operate(currentOperation,firstOperand,secondOperand));
      firstOperand = display.textContent;
      secondOperand = "";
      currentOperation = null;
      shouldReset = true
      shouldEvaluate = false
      
      }
    }

    
  function evaluate2(){
    if (secondOperand === ""){
        return;
    }
    else {
    display.textContent = roundResult(operate(currentOperation,firstOperand,secondOperand));
    firstOperand = display.textContent;
    secondOperand = "";
    currentOperation = nextOperation;
    shouldEvaluate = true
    
    }
  }
    

  function deleteNumber() {
    return display.textContent = display.textContent.toString().slice(0,-1)
  }

  function clearNumber(){
       firstOperand = "";
       secondOperand = "";
       currentOperation = null;
       shouldEvaluate = false;
       display.textContent = ""
  }




numbers.forEach(button =>
    button.addEventListener('click', () => displayNumbers(button.textContent)) )

operation.forEach(button => 
    button.addEventListener('click', () => setOperation(button.textContent)))

equal.addEventListener('click',evaluate);

points.addEventListener('click',displayPoint);

del.addEventListener('click', deleteNumber);

allClear.addEventListener('click', clearNumber)

