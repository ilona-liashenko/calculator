const screenInput = document.getElementById('screen-input');
const screenResult = document.getElementById('screen-result');
let currentInput = '';
let currentOperator = null;
let firstOperand = null;

const clear = () => {
  currentInput = '';
  currentOperator = null;
  firstOperand = null;
  screenInput.textContent = '';
  screenResult.textContent = '';
};

const deleteLast = () => {
  currentInput = currentInput.slice(0, -1);
  screenInput.textContent = currentInput;
};

const appendNumber = (number) => {
  if (number === '.' && currentInput.includes('.')) return;
  currentInput += number;
  screenInput.textContent = currentInput;
};

const chooseOperation = (operator) => {
  if (currentInput === '') return;
  if (firstOperand !== null) {
    compute();
  }
  firstOperand = parseFloat(currentInput);
  currentOperator = operator;
  currentInput = '';
};

const compute = () => {
  let computation;
  const secondOperand = parseFloat(currentInput);
  if (isNaN(firstOperand) || isNaN(secondOperand)) return;
  switch (currentOperator) {
    case 'add':
      computation = firstOperand + secondOperand;
      break;
    case 'subtract':
      computation = firstOperand - secondOperand;
      break;
    case 'multiply':
      computation = firstOperand * secondOperand;
      break;
    case 'divide':
      computation = firstOperand / secondOperand;
      break;
    case 'percent':
      computation = (firstOperand / 100) * secondOperand;
      break;
    default:
      return;
  }
  currentInput = computation.toString();
  currentOperator = null;
  firstOperand = null;
  screenResult.textContent = computation;
};

const addClickEffect = (button) => {
  button.classList.add('clicked');
  setTimeout(() => {
    button.classList.remove('clicked');
  }, 150);
};

document.querySelectorAll('.operation__button').forEach(button => {
  button.addEventListener('click', () => {
    addClickEffect(button);

    if (button.classList.contains('clear')) {
      clear();
    } else if (button.classList.contains('delete')) {
      deleteLast();
    } else if (button.classList.contains('number')) {
      appendNumber(button.textContent.trim());
    } else if (button.classList.contains('decimal')) {
      appendNumber('.');
    } else if (button.classList.contains('add')) {
      chooseOperation('add');
    } else if (button.classList.contains('subtract')) {
      chooseOperation('subtract');
    } else if (button.classList.contains('multiply')) {
      chooseOperation('multiply');
    } else if (button.classList.contains('divide')) {
      chooseOperation('divide');
    } else if (button.classList.contains('percent')) {
      chooseOperation('percent');
    } else if (button.classList.contains('equals')) {
      compute();
    }
  });
});