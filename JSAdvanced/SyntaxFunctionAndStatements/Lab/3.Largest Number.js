function largestNumber(num1, num2, num3){
    let largestNum = Number.MIN_SAFE_INTEGER;
    
    if (num1 > largestNum) {
        largestNum = num1;
    }  if (num2 > largestNum) {
        largestNum = num2;
    }  if (num3 > largestNum) {
        largestNum = num3;
    }

    console.log('The largest number is ' + largestNum + '.');
}

largestNumber(-3, -5, -22.5 )