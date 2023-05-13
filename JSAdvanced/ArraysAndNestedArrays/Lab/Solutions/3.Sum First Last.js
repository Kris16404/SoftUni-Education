function sumFirstLast(arr) {
    const firstNum = Number(arr[0]);
    const lastNum = Number(arr[arr.length - 1])
    let sum = firstNum + lastNum
    console.log(sum);
}

sumFirstLast(['20', '30', '40']);
//60
sumFirstLast(['5', '10']);
//15