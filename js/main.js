 const display = document.getElementById('display')

let firstNumber = ''; // Stores the first number
let operator = ''; // Stores the current operator
let secondNumber = ''; // Stores the second number
let shouldResetDisplay = false; // Flag to reset the display after an operator is pressed



// Arithmetic functions
const add = function (num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
};

const subtract = function (num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
};

const multiply = function (num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
};

const divide = function (num1, num2) {
    if (parseFloat(num2) === 0) {
        return "Division by 0 makes no sense.";
    }
    return parseFloat(num1) / parseFloat(num2);
};

function handleNumberClick(event) {
    const value = event.target.getAttribute('data-value'); // Get the value from the clicked button

    if (shouldResetDisplay) {
        display.value = ''; // Reset the display if an operator was just pressed
        shouldResetDisplay = false;
    }

    display.value += value; // Append the value to the display
}

// Function to handle operator button clicks
function handleOperatorClick(event) {
    const newOperator = event.target.getAttribute('data-value'); // Get the operator from the clicked button

    if (firstNumber === '') {
        // If no first number is set, use the current display value as the first number
        firstNumber = display.value;
    } else if (operator && !shouldResetDisplay) {
        // If an operator is already set, evaluate the current pair and use the result as the first number
        secondNumber = display.value;
        firstNumber = operate(operator, firstNumber, secondNumber).toString();
        display.value = firstNumber; // Display the result
    }

    operator = newOperator; // Update the current operator
    shouldResetDisplay = true; // Reset the display for the next number
}

// Function to handle the clear button click
function handleClearClick() {
    display.value = ''; // Clear the display
    firstNumber = ''; // Reset the first number
    operator = ''; // Reset the operator
    secondNumber = ''; // Reset the second number
    shouldResetDisplay = false; // Reset the flag
}

function handleEqualsClick() {
    if (firstNumber !== '' && operator !== '' && !shouldResetDisplay) {
        secondNumber = display.value; // Get the second number from the display

        try {
            // Perform the calculation
            const result = operate(operator, firstNumber, secondNumber);

            // Display the result
            display.value = result;

            // Reset the state for the next calculation
            firstNumber = result.toString(); // Use the result as the first number for chaining
            operator = ''; // Clear the operator
            secondNumber = ''; // Clear the second number
            shouldResetDisplay = true; // Reset the display for the next input
        } catch (error) {
            // Handle errors (e.g., division by zero)
            display.value = error.message; // Display the error message
            resetCalculator(); // Reset the calculator state
        }
    }
}

// Operate function
const operate = function (operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            throw new Error("Invalid operator");
    }
};

// Add event listener to the equals button
document.getElementById('equals').addEventListener('click', handleEqualsClick);

// Add event listener to the clear button
document.getElementById('clear').addEventListener('click', handleClearClick);

// Event Listener for Number Buttons
document.querySelectorAll('.buttons button[data-value]').forEach(button => {
    if (!button.classList.contains('operator')) { // Exclude operator buttons
        button.addEventListener('click', handleNumberClick
            );
    }
});

// Event Listener for Operator Buttons
document.querySelectorAll('.buttons button.operator').forEach(button => {
    button.addEventListener('click',handleOperatorClick);
});

