function diagonalSums(matrix) {
    let sumOfFirstDiagonal = 0;
    let sumOfSecondDiagonal = 0;
    for (let i = 0; i < matrix.length; i++) {
        const array = matrix[i];
        for (let j = 0; j < array.length; j++) {
            if (i == j) {
                sumOfFirstDiagonal += matrix[i][j]
            }
            if (i + j == matrix.length - 1) {
                sumOfSecondDiagonal += matrix[i][j]
            }
        }
    }

    console.log(`${sumOfFirstDiagonal} ${sumOfSecondDiagonal}`);
}

diagonalSums([[20, 40], [10, 60]]);
// 80 50
diagonalSums([[3, 5, 17], [-1, 7, 14], [1, -8, 89]]);
// 99 25