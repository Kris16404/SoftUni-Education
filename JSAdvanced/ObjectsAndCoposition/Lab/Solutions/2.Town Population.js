function townPopulation(arr) {
    let result = {};

    for (let i = 0; i < arr.length; i++) {
        let [townName, population] = arr[i].split(' <-> ')
        population = Number(population);
        
        if (result[townName] === undefined) {
            result[townName] = 0;
        }

        result[townName] += population;
    }

    for (const key in result) {
        console.log(`${key} : ${result[key]}`);
    }
}

townPopulation(['Sofia <-> 1200000', 
                'Montana <-> 20000', 
                'New York <-> 10000000', 
                'Washington <-> 2345000', 
                'Las Vegas <-> 1000000']);

// Sofia : 1200000
// Montana : 20000
// New York : 10000000
// Washington : 2345000
// Las Vegas : 1000000

townPopulation(['Istanbul <-> 100000', 
                'Honk Kong <-> 2100004', 
                'Jerusalem <-> 2352344', 
                'Mexico City <-> 23401925', 
                'Istanbul <-> 1000']);
// Sofia : 1200000
// Montana : 20000
// New York : 10000000
// Washington : 2345000
// Las Vegas : 1000000