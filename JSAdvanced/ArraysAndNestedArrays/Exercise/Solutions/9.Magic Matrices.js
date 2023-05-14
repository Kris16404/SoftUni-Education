function magicMatrices(matrix) {
    const firstRowSum = matrix[0].reduce((acc, curr) => {
        return acc + curr;
    }, 0)

    for (let row = 0; row < matrix.length; row++) {
        let rowSum = 0;
        let colSum = 0;

        for (let col = 0; col < matrix.length; col++) {
            rowSum += matrix[row][col];
            colSum += matrix[col][row];
        }

        if (firstRowSum != colSum || firstRowSum != rowSum) {
            return false;
        }
    }
    return true;
}

magicMatrices([[4, 5, 6], [6, 5, 4], [5, 5, 5]]);
// true
magicMatrices([[11, 32, 45], [21, 0, 1], [21, 1, 1]]);
// false
magicMatrices([[1, 0, 0], [0, 0, 1], [0, 1, 0]]);
// true