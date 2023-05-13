function negativeAndPositiveNumbers(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            result.unshift(arr[i])
        } else {
            result.push(arr[i])
        }
    }

    console.log(result.join('\n'));
}

negativeAndPositiveNumbers([7, -2, 8, 9]);
// -2
// 7
// 8
// 9
negativeAndPositiveNumbers([3, -2, 0, -1]);
// -1
// -2
// 3
// 0
