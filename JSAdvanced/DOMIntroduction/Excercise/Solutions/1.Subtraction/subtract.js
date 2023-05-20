function subtract() {
    const firtsNum = document.getElementById('firstNumber').value;
    const secondNum = document.getElementById('secondNumber').value;
    const resultElement = document.getElementById('result');
    let sum = firtsNum - secondNum;
    resultElement.textContent = sum;
}