//Ex 1
//Create a function that takes two numbers as params / args
//and an operator(+, -, *, /) as input
//and performs the corresponding operation.


//function calculator(num1, num2, operator) 
   // if (operator === "+") {
   //    return num1 + num2;
   // }
   // if (operator === "-"){
   //     return num1 -num2;
   // }
   // if (operator === "*") {  
   //     return num1 * num2;
   // }
   // if (operator === "/") {  
   //    return num1 / num2;
  //  } else { 
  //      return "Invalid operator";
  //  } 
 
   
  function calculator(num1, num2, operator) {
 switch (operator) {
  case "+":
    return num1 + num2;
  case "-":
    return num1 - num2;
   case "*":
    return num1 * num2;
  case "/":
  return num1 / num2;
 default:
   return "Invalid operator";}
  }
  
   
  