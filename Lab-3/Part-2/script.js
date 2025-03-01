let maxValue,
  operand1 = 0,
  operand2 = 0,
  result = 0,
  flag = 0,
  sign;

// Define sign and insert operands
function setSignAndRun(x) {
  if (x == "+") {
    flag = 0;
    sign = "+";
  } else if (x == "-") {
    flag = 1;
    sign = "-";
  } else if (x == "*") {
    flag = 2;
    sign = "*";
  }
  insertOperands();
}

// Define first operand
function fOperand() {
  operand1 = Math.floor(Math.random() * (maxValue - 1)) + 1;
  return parseInt(operand1);
}

// Define second operand
function sOperand() {
  if (flag == 0) {
    operand2 = Math.floor(Math.random() * (maxValue - operand1));
  }
  if (flag == 1) {
    operand2 = Math.floor(Math.random() * operand1);
  }
  if (flag == 2) {
    operand2 = Math.floor(Math.random() * (maxValue / operand1 - 1)) + 1;
  } else {
    operand2 = Math.floor(Math.random() * (maxValue - operand1));
  }
  return parseInt(operand2);
}

// Add sign to result
function inputSign(x) {
  document.getElementById("result").innerText += x;
}

// Submit button action
function submit() {
  const result = document.getElementById("result");
  let input = parseInt(result.innerText);
  if (flag == 0) {
    if (operand1 + operand2 == input) {
      changeResultColor(result, "Green");
      insertOperands();
    } else {
      changeResultColor(result, "Red");
    }
  } else if (flag == 1) {
    if (operand1 - operand2 == input) {
      changeResultColor(result, "Green");
      insertOperands();
    } else {
      changeResultColor(result, "Red");
    }
  } else if (flag == 2) {
    if (operand1 * operand2 == input) {
      changeResultColor(result, "Green");
      insertOperands();
    } else {
      changeResultColor(result, "Red");
    }
  }
  result.innerText = "";
}

// Change color of the result field to indicate correctness
function changeResultColor(element, color) {
  element.style.backgroundColor = color;
  setTimeout(() => {
    element.style.transition = "background-color 1s";
    element.style.backgroundColor = "#505050";
  }, 700);
}

//Task generation
function insertOperands() {
  defineMax();
  operand1 = fOperand();
  document.getElementById("firstOperand").innerText = operand1;
  operand2 = sOperand();
  document.getElementById("secondOperand").innerText = operand2;
  document.getElementById("signOperand").innerText = sign;
  return true;
}

// Define max possible value
function defineMax() {
  maxValue = parseInt(document.getElementById("rangeSelect").value);
}
