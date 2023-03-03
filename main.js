let displayValue;
let valueStr = '';
let isOperatorInput = false;
let values = [] ;
let operators = [] ;
let isFirstInput = true;

const display = document.getElementById('display');
display.innerHTML = '0';

document.getElementsByName('number').forEach(e => {
    e.addEventListener('click' , () => {
        if(isFirstInput && e.innerHTML !== "."){
            display.innerHTML = e.innerHTML;
        }else{
            display.innerHTML += e.innerHTML;
        }
        
        isOperatorInput = isFirstInput = false;
      
        valueStr += e.innerHTML;
    });
});

document.getElementsByName('clear').forEach(e => {
    e.addEventListener('click' , () => {
        display.innerHTML = '0';
        valueStr = '';
        values.length = 0;
        operators.length = 0;
        isFirstInput = true;
    });
});

const calc = () => {
    let result = values.shift();
    while (operators.length) {
        const operator = operators.shift();
        switch (operator) {
            case '+':
                result += values.shift();
                break;
            case '-':
                result -= values.shift();
                break;
            case '*':
                result *= values.shift();
                break;
            case '/':
                result /= values.shift();
                break;    
        
        }
    }
    return Math.round(result * 10)/10;
}

document.getElementsByName('operator').forEach(e => {
    e.addEventListener('click' , () => {
        if(isOperatorInput) return;
        if(e.innerHTML === '='){
            values.push(Number(valueStr));
            const res = String(calc());
            display.innerHTML = res;
            valueStr = res;
        }else{
            isOperatorInput = true;
            values.push(Number(valueStr));
            operators.push(e.innerHTML);
            valueStr = '';
            display.innerHTML += e.innerHTML;
        }
    });
});

