function greatestCommonDiviser(num1, num2){
    while (num2) {
        const temp = num2;
        num2 = num1 % num2;
        num1 = temp
    }
    console.log(num1);
}

greatestCommonDiviser(15, 5);
// 5
greatestCommonDiviser(2154, 458);
// 2