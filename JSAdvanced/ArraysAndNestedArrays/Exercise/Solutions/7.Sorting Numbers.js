function sortingNumbers(arr) {
    arr.sort((a, b) => a - b)

    for (let i = 1; i < arr.length; i += 2) {
        const element = arr[i];
        let lastBiggest = arr.pop();
        arr.splice(i, 0, lastBiggest)

    }
    return arr;
}

sortingNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);
// [-3, 65, 1, 63, 3, 56, 18, 52, 31, 48]