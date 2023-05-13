function biggestElement(matrix) {
    let biggestNum = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            if (element > biggestNum) {
                biggestNum = element
            }
        }
    }
    
    return biggestNum;
}

biggestElement([[20, 50, 10], [8, 33, 145]]);
// 145
biggestElement([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]]);
// 33