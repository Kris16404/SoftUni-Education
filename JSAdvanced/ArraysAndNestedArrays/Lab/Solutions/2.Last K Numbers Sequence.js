function lastKNumbersSequence(n, k) {
    let result = [1];
    let sliceNubers = [];
    let sum = 0;
    for (let i = 0; i <= n - 2; i++) {
        if (result.length < k) {
            sum += result[i]
        } else {
            sum = 0
            sliceNubers = result.slice(-k)
            for (let j = 0; j < sliceNubers.length; j++) {
                const element = sliceNubers[j];
                sum += element;
            }
        }
        
        result.push(sum);
    }
    
    return result;
}

lastKNumbersSequence(6, 3);
// [1, 1, 2, 4, 7, 13] 
lastKNumbersSequence(8, 2);
// [1, 1, 2, 3, 5, 8, 13, 21]