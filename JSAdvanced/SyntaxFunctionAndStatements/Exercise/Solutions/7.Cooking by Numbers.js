function cookingByNumbers(startNum, ...params) {
    let parsedStartNum = Number(startNum);

    for (let i = 0; i < params.length; i++) {
        const command = {
            chop: parsedStartNum / 2,
            dice: Math.sqrt(parsedStartNum),
            spice: parsedStartNum + 1,
            bake: parsedStartNum * 3,
            fillet: parsedStartNum * 0.8
        };
        parsedStartNum = command[params[i]];

        if (!Number.isInteger(parsedStartNum)) {
            console.log(parsedStartNum.toFixed(1));
        } else {
            console.log(parsedStartNum);
        }
    }
}

cookingByNumbers('32', 'chop', 'chop', 'chop', 'chop', 'chop');
// 16
// 8
// 4
// 2
// 1
cookingByNumbers('9', 'dice', 'spice', 'chop', 'bake', 'fillet');
// 3
// 4
// 2
// 6
// 4.8
