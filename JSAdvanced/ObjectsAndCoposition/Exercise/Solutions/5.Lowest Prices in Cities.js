function lowestPricesInCities(arr) {
    let result = {};

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let [town, product, price] = current.split(' | ')
        if(!result[product]) {
            result[product] = {};
        }
        result[product][town] = Number(price);
    }

    for (const [product, towns] of Object.entries(result)) {
        let sortedResult = Object.entries(towns).sort((a,b) => a[1] - b[1]);
        let [town, price] = sortedResult[0];
        console.log(`${product} -> ${price} (${town})`);
    }
}

lowestPricesInCities([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'
]);

// Sample Product -> 1000 (Sample Town)
// Orange -> 2 (Sample Town)
// Peach -> 1 (Sample Town)
// Burger -> 10 (New York)