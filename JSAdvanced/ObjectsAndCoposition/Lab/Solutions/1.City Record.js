function cityRecord(nameInput, populationInput, treasuryInput) {
    const obj = {
        name: nameInput,
        population: populationInput,
        treasury: treasuryInput
    }

    return obj;
}

cityRecord('Tortuga', 7000, 15000);
// {
//     name: 'Tortuga',
//     population: 7000,
//     treasury: 15000
// }
cityRecord('Santo Domingo', 12000, 23500);
// {
//     name: 'Santo Domingo',
//     population: 12000,
//     treasury: 23500
// }
