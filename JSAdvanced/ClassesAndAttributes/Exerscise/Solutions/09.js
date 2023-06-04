function autoEngineeringCompany(arrOfCars) {
    let carsObj = {};

    // MAN FUCK IT | MISH-MASH MODE ON
    for (let i = 0; i < arrOfCars.length; i++) {
        const string = arrOfCars[i];
        let isFound = false;
        let [brand, model, producedCars] = string.split(' | ');
        producedCars = Number(producedCars);

        let currentCar = { model: model, producedCars: producedCars };

        if (carsObj[brand] === undefined) {
            carsObj[brand] = [currentCar]
        } else {
            // FOR WAY
            // for (let j = 0; j < carsObj[brand].length; j++) {
            //     const carObj = carsObj[brand][j];
            //     if (carObj.model === currentCar.model) {
            //         isFound = true;
            //     }
            // }

            // FOREACH WAY
            carsObj[brand].forEach((element) => {
                if (element.model === currentCar.model) {
                    isFound = true;
                }
            })

            if (isFound) {
                const foundAt = carsObj[brand].map(function (element) {
                    return element.model
                }).indexOf(currentCar.model);

                carsObj[brand][foundAt].producedCars += currentCar.producedCars;
            } else {
                carsObj[brand].push(currentCar);
            }
        }
    }

    for (const key in carsObj) {
        console.log(key);
        const arrOfCars = carsObj[key];
        arrOfCars.forEach(element => {
            console.log(`###${element.model} -> ${element.producedCars}`);
        });
    }
}

autoEngineeringCompany(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);