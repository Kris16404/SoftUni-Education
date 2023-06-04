function juiceFlavors(arrOfJuice) {
    let juiceObj = {};
    let bottleObj = {};
    for (let i = 0; i < arrOfJuice.length; i++) {
        const string = arrOfJuice[i];
        let [type, quantity] = string.split(' => ');
        quantity = Number(quantity);
        juiceObj[type] === undefined
            ? juiceObj[type] = quantity
            : juiceObj[type] += quantity;

        if (juiceObj[type] >= 1000) {
            const quantityToRemove = parseInt(juiceObj[type] / 1000);
            bottleObj[type] === undefined
                ? bottleObj[type] = quantityToRemove
                : bottleObj[type] += quantityToRemove;
            juiceObj[type] -= quantityToRemove * 1000;
        }
    }

    for (const key in bottleObj) {
        console.log(`${key} => ${bottleObj[key]}`);
    }
}

juiceFlavors(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']);

juiceFlavors(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']);