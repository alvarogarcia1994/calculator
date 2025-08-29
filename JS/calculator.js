//Arithmetic operations stored in an object
const arithmetic_Operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => b !== 0 ? a / b : 'Zero division error',
    '%': (a, b) => a % b
};

//Main variables
let currentInput = '';
let previousInput = '';
let selectedOperation = '';

//Variable block of element buttons to apply events with addEventlistener further
const numericKeys = document.querySelectorAll('.numeric_key');
const arithmeticOperations = document.querySelectorAll('.arithmetic-operation');
const clearKey = document.querySelector('#clear');
const toggleKey = document.querySelector('#light-n-dark-mode');
const decimalKey = document.querySelector('#decimal');
const equalKey = document.querySelector('#equal');
const displayElement = document.querySelector('input[type="text"]');

//Event handle to the previous block of element buttons
//numericKeys group
numericKeys.forEach(btn => {
    btn.addEventListener('click', () => {
        giveNumber(btn.textContent.trim());
    });
})

//arithmeticOperations group
arithmeticOperations.forEach(op => {
    op.addEventListener('click', () =>{
        appendOperation(op.textContent.trim())
    })
})

//clearKey
clearKey.addEventListener('click', function(){
    clearDisplay();
});

//toggleKey
toggleKey.addEventListener('click', function(){
    toggleMode();
})

//decimalKey
decimalKey.addEventListener('click', function(){
    addDecimal();
})

//equalKey
equalKey.addEventListener('click', function(){
    performOperation()
})



//Config array to glow the buttons of the calculator
const config = [
    {selector: '.numeric_key',              glowClass: 'glow-green'},
    {selector: '.arithmetic-operation',     glowClass: 'glow-orange'},
    {selector: '#clear',                    glowClass: 'glow-red'},
    {selector: '#light-n-dark-mode',        glowClass: 'glow-blue'},
    {selector: '#decimal',                  glowClass: 'glow-blue'},
    {selector: '#equal',                    glowClass: 'glow-orangered'},
]

//Iterating each button of the calculator with two parameters: selector and glow class
config.forEach(({ selector, glowClass }) => {

    //Variable to apply to each element
    const elements = document.querySelectorAll(selector);
    
    //Nested forEach to apply and or remove glow class
    elements.forEach(el => {
        
        //Mouseenter event
        el.addEventListener('mouseenter', () => {
            //Message in the console to indicate the application of glowclass
            console.log(`mouseenter: adding ${glowClass}`);
            el.classList.add('hover-animated', glowClass);
        });

        //Mouseleave event
        el.addEventListener('mouseleave', () => {
            //Same procedure but in reverse
            console.log(`mouseleave: removing ${glowClass}`);
            el.classList.remove('hover-animated', glowClass);
        });
    });
});

//Function to clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    updateDisplay('');
}

//Function to toggle between light and dark mode
function toggleMode(){
    displayElement.classList.toggle('dark-mode');
}

//Function to append a number
function giveNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

//Function to update the display
function updateDisplay(value) {
    displayElement.value = value;
}

//Funtion to add decimal values
function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += currentInput === '' ? '0.' : '.';
        updateDisplay(currentInput);
    }
}

//Function to handle operation
function appendOperation(operation) {

    if (currentInput === '') return;
    if (previousInput !== '') {
        performOperation(); 
    }

    //Normalizing "x" symbol to => "*" symbol defined as multiplying in arithmetic_Operations object.
    if (operation === 'x') operation = '*';


    selectedOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay(`${previousInput} ${selectedOperation}`);

}

//Function to handle each operation
function performOperation() {
    if (previousInput === '' || currentInput === '' || !selectedOperation) return;

    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    const operation = arithmetic_Operations[selectedOperation];
    if (!operation) return;

    let result = operation(prev, current);

    if (result === 'Zero division error') {
        updateDisplay(result);
        currentInput = '';
        previousInput = '';
        selectedOperation = '';
        return;
    }

    currentInput = result.toString();
    previousInput = '';
    selectedOperation = '';
    updateDisplay(currentInput);
}