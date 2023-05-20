function calc() {
    let result = document.getElementById('sum')
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    const sum = Number(num1.value) + Number(num2.value);

    result.value = sum
}
