function cityTaxes(nameInput, populationInput, treasuryInput) {
    const obj = {
        name: nameInput,
        population: populationInput,
        treasury: treasuryInput,
        taxRate: 10,
        collectTaxes: function () {
            this.treasury += this.population * this.taxRate;
            Math.floor(this.treasury);
        },
        applyGrowth: function (precentage) {
            this.population += this.population * (precentage / 100);
            Math.floor(this.population);
        },
        applyRecession: function (precentage) {
            this.treasury -= this.treasury * (precentage / 100);
            Math.floor(this.treasury);
        }
    }
    return obj;
}

const city = cityTaxes('Tortuga', 7000, 15000);
console.log(city);
// {
//     name: 'Tortuga',
//     population: 7000,
//     treasury: 15000,
//     taxRate: 10,
//     collectTaxes: [Function: collectTaxes],
//     applyGrowth: [Function: applyGrowth],
//     applyRecession: [Function: applyRecession]
// }

const city2 = cityTaxes('Tortuga', 7000, 15000); 
city2.collectTaxes(); console.log(city2.treasury); 
city2.applyGrowth(5); console.log(city2.population);

// 85000
// 7350