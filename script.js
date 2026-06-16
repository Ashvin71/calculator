let currentOperand = '0';
let prevOperand = '';
let operator = null;
let resetNext = false;

const currentOperandEl = document.getElementById('currentOperand');
const prevOperandEl = document.getElementById('prevOperand');

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => handleAction(btn.dataset.action, btn.dataset.value));
});

function handleAction(action, value) {
  switch (action) {
    case 'number':
      appendNumber(value);
      break;
    case 'operator':
      chooseOperator(value);
      break;
    case 'equals':
      compute();
      break;
    case 'clear':
      clearAll();
      break;
    case 'delete':
      deleteLast();
      break;
  }
  updateDisplay();
}

function appendNumber(num) {
  if (resetNext) {
    currentOperand = '0';
    resetNext = false;
  }
  if (num === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && num !== '.') {
    currentOperand = num;
  } else {
    currentOperand += num;
  }
}

function chooseOperator(op) {
  if (op === '%') {
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    return;
  }
  if (currentOperand === '') return;
  if (prevOperand !== '') {
    compute();
  }
  operator = op;
  prevOperand = currentOperand;
  resetNext = true;
}

function compute() {
  let result;
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/':
      if (current === 0) {
        currentOperand = 'Error';
        prevOperand = '';
        operator = null;
        resetNext = true;
        return;
      }
      result = prev / current;
      break;
    default: return;
  }

  currentOperand = roundResult(result).toString();
  operator = null;
  prevOperand = '';
  resetNext = true;
}

function roundResult(num) {
  return Math.round(num * 1e10) / 1e10;
}

function clearAll() {
  currentOperand = '0';
  prevOperand = '';
  operator = null;
  resetNext = false;
}

function deleteLast() {
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
}

function updateDisplay() {
  currentOperandEl.textContent = currentOperand;
  const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  if (operator != null) {
    prevOperandEl.textContent = `${prevOperand} ${opSymbols[operator]}`;
  } else {
    prevOperandEl.textContent = '';
  }
}

updateDisplay();
