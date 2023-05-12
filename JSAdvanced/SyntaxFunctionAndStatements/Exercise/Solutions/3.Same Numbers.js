function sameNumbers(numInput) {
    let array = numInput.toString().split('')
    let isSame = true;
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        const firstNum = array[0];

        if (firstNum !== array[i]) {
            isSame = false;
        }
        sum += Number(array[i]);
    }

    console.log(isSame);
    console.log(sum);
}

sameNumbers(2222222);
//true
// 14
sameNumbers(1234);
//false
//10