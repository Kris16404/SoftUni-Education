function biggerHalf(arr) {
    arr.sort((a, b) => a - b);

    const lenghtToCut = Math.ceil(arr.length / 2);
    const cuttedArr = arr.slice(-lenghtToCut);

    return cuttedArr;
}

biggerHalf([4, 7, 2, 5]);
// [5, 7]
biggerHalf([3, 19, 14, 7, 2, 19, 6]);
// [7, 14, 19, 19]