function storageCatalogue(arr) {
    let obj = {};
    let result = [];
    let sortedInputArr = arr.sort((a, b) => a.localeCompare(b))
    for (let i = 0; i < sortedInputArr.length; i++) {
        const element = sortedInputArr[i].split(' : ').join(': ');
        const firstLetter = element[0];

        if (obj[firstLetter] === undefined) {
            obj[firstLetter] = [];
        }

        obj[firstLetter].push(`  ${element}`);
    }

    for (const key in obj) {
        const element = obj[key];
        result = [...result, key, ...element];
    }

    console.log(result.join('\n'));
}

storageCatalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);

//  A
//      Anti - Bug Spray: 15
//      Apple: 1.25
//      Appricot: 20.4
//  B
//      Boiler: 300
//  D
//      Deodorant: 10
//  F
//      Fridge: 1500
//  T
//      T - Shirt: 10
//      TV: 1499