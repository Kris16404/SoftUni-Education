function carFactory(inputObject) {
    let result = {};
    let inputedWheelSize = inputObject.wheelsize;
    const inputedModel = inputObject.model
    const inputedPower = inputObject.power;
    const carWheelSize = [0, 0, 0, 0];
    const smallEngine = { power: 90, volume: 1800 };
    const normalEngine = { power: 120, volume: 2400 };
    const monsterEngine = { power: 200, volume: 3500 };
    const carriageTypeAndColor = { type: inputObject.carriage, color: inputObject.color }
    if (inputedWheelSize % 2 === 0) {
        inputedWheelSize--;
        carWheelSize.fill(inputedWheelSize, 0, 4)
    } else {
        carWheelSize.fill(inputedWheelSize, 0, 4)
    }
    result.model = inputedModel;
    if (inputedPower <= 90) {
        result.engine = smallEngine;
    } else if (inputedPower > 90 && inputedPower <= 120) {
        result.engine = normalEngine;
    } else if (inputedPower >= 200) {
        result.engine = monsterEngine;
    }
    result.carriage = carriageTypeAndColor;
    result.wheels = carWheelSize;

    return result;
}

carFactory({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
});
// {  
//     model: 'VW Golf II',
//     engine: { power: 90, volume: 1800 },
//     carriage: { type: 'hatchback', color: 'blue' },
//     wheels: [13, 13, 13, 13] 
// }

carFactory({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
});

//  {
//     model: 'Opel Vectra',
//     engine: { power: 120, volume: 2400 },
//     carriage: { type: 'coupe', color: 'grey' },
//     wheels: [17, 17, 17, 17]
//  }
