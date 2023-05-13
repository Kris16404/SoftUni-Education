function processOddPositions(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 1) {
            let doubledNum = Number(arr[i]) * 2
            result.push(doubledNum);
        }
    }

    result.reverse();

    console.log(result);
}

processOddPositions([10, 15, 20, 25]);
// 50 30
processOddPositions([3, 0, 10, 4, 7, 3]);
// 6 8 0