function printEveryNElementFromArray(arr, num) {
    let result = [];

    for (let i = 0; i < arr.length; i += num) {
        const element = arr[i];
        result.push(element);
    }

    return result;
}

printEveryNElementFromArray(['5', '20', '31', '4', '20'], 2);
// ['5', '31', '20']
printEveryNElementFromArray(['dsa', 'asd', 'test', 'tset'], 2);
// ['dsa', 'test']
printEveryNElementFromArray(['1', '2', '3', '4', '5'], 6);
// ['1']