function validityChecker(x1, y1, x2, y2) {
    const checker = (x1, y1, x2, y2) => {
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (Number.isInteger(distance)) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    };

    checker(x1, y1, 0, 0);
    checker(x2, y2, 0, 0);
    checker(x1, y1, x2, y2);
}

validityChecker(3, 0, 0, 4);
// {3, 0} to {0, 0} is valid
// {0, 4} to {0, 0} is valid
// {3, 0} to {0, 4} is valid
validityChecker(2, 1, 1, 1);
// {2, 1} to {0, 0} is invalid
// {1, 1} to {0, 0} is invalid
// {2, 1} to {1, 1} is valid