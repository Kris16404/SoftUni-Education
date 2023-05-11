function sumOfNumbers(num1, num2){
    let sum = 0;
    let parsedNum1 = Number(num1);
    let parsedNum2 = Number(num2);
    for (let i = parsedNum1; i <= parsedNum2; i++) {
        sum += i;
    }

    console.log(sum);
}

sumOfNumbers('1', '5' )