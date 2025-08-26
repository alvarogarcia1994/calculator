//Arithmetic operations stored in an object
const arithmetic_Operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => b - a,
    '*': (a, b) => a * b,
    '/': (a, b) => b / a,
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
        el.addEventListener('mouseenter', () => {
            console.log(`mouseenter: adding ${glowClass}`);
            el.classList.add('hover-animated', glowClass);
        });

        el.addEventListener('mouseleave', () => {
            console.log(`mouseleave: removing ${glowClass}`);
            el.classList.remove('hover-animated', glowClass);
        });
    });
});