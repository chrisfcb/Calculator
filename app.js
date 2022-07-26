const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');


keys.addEventListener('click', e => {

    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        const previousKeyType = calculator.dataset.previousKeyType
        
        if (!action) {
            calculator.dataset.previousKeyType = 'number';
                if(displayedNum === '0' || previousKeyType === 'operator') {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                };

            //Array.from: makes an array from the argument you give it
            //parentNode.childern: returns an HTML collection from the parent of the node. In this case it return all the buttons from .calculator__keys
            Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))
        };

        if (keyContent == '.') {
            display.textContent = displayedNum + '.';
        };

        if (keyContent == 'AC') {
            display.textContent = 0;
        };

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
          };

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }
})

const calculate = (n1, operator, n2) => {
    let result = ''
    
    switch (operator) {
        case 'add':
            result = parseFloat(n1) + parseFloat(n2);
            break;
        case 'subtract':
            result = parseFloat(n1) - parseFloat(n2);
            break;
        case 'multiply':
            result = parseFloat(n1) * parseFloat(n2);
            break;
        case 'devide':
            result = parseFloat(n1) / parseFloat(n2);
            break;
    };
    return result
  };