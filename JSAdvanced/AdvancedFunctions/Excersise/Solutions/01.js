function sortArr(arr, order) {
    const orders = {
        'asc': (a, b) => a - b,
        'desc': (a, b) => b - a
    };

    let sortedArr = arr.sort(orders[order]);
    return sortedArr;
}

sortArr([14, 7, 17, 6, 8], 'asc');
// [6, 7, 8, 14, 17]
sortArr([14, 7, 17, 6, 8], 'desc');
// [17, 14, 8, 7, 6]