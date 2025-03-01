var max_value,
  operand1 = 0;
var operand2 = 0;
var result = 0;
var flag = 0;
var sign = "+";
var input = "";
//10 Вибрати додавання або віднімання
function set_sign(x) {
  if (x == "+") {
    flag = 0;
    sign = "+";
  }
  if (x == "-") {
    flag = 1;
    sign = "-";
  }
  if (x == "*") {
    flag = 2;
    sign = "*";
  }
  return true;
}
//16 Визначити перший операнд
function f_operand() {
  operand1 = Math.floor(Math.random() * (max_value - 1)) + 1;
  return parseInt(operand1);
}
//21 Визначити другий операнд
function s_operand() {
  if (flag == 0) {
    operand2 = Math.floor(Math.random() * (max_value - operand1));
  }
  if (flag == 1) {
    operand2 = Math.floor(Math.random() * operand1);
  }
  if (flag == 2) {
    operand2 = Math.floor(Math.random() * (max_value / operand1 - 1)) + 1;
  } else {
    operand2 = Math.floor(Math.random() * (max_value - operand1));
  }
  return parseInt(operand2);
}
//30 Перевірити введені дані
function input_sign(x) {
  if (x == 10) {
    if (flag == 0) {
      if (operand1 + operand2 == parseInt(input)) {
        window.document.forms["test"].r0.value = "Вірно!";
      } else {
        window.document.forms["test"].r0.value = "Спробуй ще!";
        window.document.forms["test"].input = "";
        input = "";
        //40
      }
    }
    if (flag == 1) {
      if (operand1 - operand2 == parseInt(input)) {
        window.document.forms["test"].r0.value = "Вірно!";
      } else {
        window.document.forms["test"].r0.value = "Спробуй ще!";
        window.document.forms["test"].input = "";
        input = "";
        //50
      }
    }
    if (flag == 2) {
      if (operand1 * operand2 == parseInt(input)) {
        window.document.forms["test"].r0.value = "Вірно!";
      } else {
        window.document.forms["test"].r0.value = "Спробуй ще!";
        window.document.forms["test"].input = "";
        input = "";
        //50
      }
    }
    return true;
  }
  input += x;
  window.document.forms["test"].result.value = input;
  return true;
}
//60 Генерація варіанта
function main_calc() {
  //alert("main_calc:begin");
  operand1 = f_operand();
  window.document.forms["test"]["op1"].value = operand1;
  operand2 = s_operand();
  window.document.forms["test"]["op2"].value = operand2;
  window.document.forms["test"]["s_sign"].value = sign;
  input = "";
  window.document.forms["test"].input = "";
  window.document.forms["test"]["r0"].value = " ???";
  //70
  return true;
}
