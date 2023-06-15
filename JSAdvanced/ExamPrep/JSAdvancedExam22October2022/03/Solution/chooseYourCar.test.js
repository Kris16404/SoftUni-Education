const { it } = require('mocha');
const expect = require('chai').expect;

const chooseYourCar = {
    choosingType(type, color, year) {
        if (year < 1900 || year > 2022) {
            throw new Error(`Invalid Year!`);
        } else {
            if (type == "Sedan") {

                if (year >= 2010) {
                    return `This ${color} ${type} meets the requirements, that you have.`;
                } else {
                    return `This ${type} is too old for you, especially with that ${color} color.`;
                }
            }
            throw new Error(`This type of car is not what you are looking for.`);
        }
    },

    brandName(brands, brandIndex) {

        let result = [];

        if (!Array.isArray(brands) || !Number.isInteger(brandIndex) || brandIndex < 0 || brandIndex >= brands.length) {
            throw new Error("Invalid Information!");
        }
        for (let i = 0; i < brands.length; i++) {
            if (i !== brandIndex) {
                result.push(brands[i]);
            }
        }
        return result.join(", ");
    },

    carFuelConsumption(distanceInKilometers, consumptedFuelInLiters) {

        let litersPerHundredKm = ((consumptedFuelInLiters / distanceInKilometers) * 100).toFixed(2);

        if (typeof distanceInKilometers !== "number" || distanceInKilometers <= 0 ||
            typeof consumptedFuelInLiters !== "number" || consumptedFuelInLiters <= 0) {
            throw new Error("Invalid Information!");
        } else if (litersPerHundredKm <= 7) {
            return `The car is efficient enough, it burns ${litersPerHundredKm} liters/100 km.`;
        } else {
            return `The car burns too much fuel - ${litersPerHundredKm} liters!`;
        }
    }
}


describe('chooseYourCar tests', function () {
    describe('choosingType tests', function () {
        it('with valid and unvalid values', function () {
            const year1 = 1899;
            const year2 = 2023;
            const year3 = 2000;
            const year4 = 2010;
            const year5 = 2015;

            const type1 = 'Combie';
            const type2 = 'Sedan';

            const color = 'Red';

            const result1 = chooseYourCar.choosingType(type2, color, year4);
            const result2 = chooseYourCar.choosingType(type2, color, year3);
            const result3 = () => chooseYourCar.choosingType(type2, color, year2);
            const result4 = () => chooseYourCar.choosingType(type2, color, year1);
            const result5 = () => chooseYourCar.choosingType(type1, color, year4);
            const result6 = chooseYourCar.choosingType(type2, color, year3);
            const result7 = chooseYourCar.choosingType(type2, color, year5);

            expect(result1).to.equal(`This ${color} ${type2} meets the requirements, that you have.`);
            expect(result2).to.equal(`This ${type2} is too old for you, especially with that ${color} color.`);
            expect(result3).to.throw(`Invalid Year!`);
            expect(result4).to.throw(`Invalid Year!`);
            expect(result5).to.throw(`This type of car is not what you are looking for.`);
            expect(result6).to.equal(`This ${type2} is too old for you, especially with that ${color} color.`);
            expect(result7).to.equal(`This ${color} ${type2} meets the requirements, that you have.`);



        })
    })
    describe('brandName tests', function () {
        it('wiht valid and invalid values', function () {
            const arr1 = ['BMW', 'Toyota', 'Peugeot'];
            const arr2 = 'fsda';
            const index1 = 1;
            const index2 = 5;
            const index3 = 'fasd';
            const index4 = -5;
            const index5 = 2.1;

            const result1 = chooseYourCar.brandName(arr1, index1);
            const result2 = () => chooseYourCar.brandName(arr1, index2);
            const result3 = () => chooseYourCar.brandName(arr2, index1);
            const result4 = () => chooseYourCar.brandName(arr1, index3);
            const result5 = () => chooseYourCar.brandName(arr1, index4);
            const result6 = () => chooseYourCar.brandName(arr1, index5);

            expect(result1).to.equal('BMW, Peugeot');
            expect(result2).to.throw('Invalid Information!');
            expect(result3).to.throw('Invalid Information!');
            expect(result4).to.throw('Invalid Information!');
            expect(result5).to.throw('Invalid Information!');
            expect(result6).to.throw('Invalid Information!');
        })
    })
    describe('carFuelConsumption', function () {
        it('wiht valid and invalid values', function () {
            const distandInKilo1 = 100;
            const distandInKilo2 = -1;
            const distandInKilo3 = 'asdf';
            const distandInKilo4 = 0;
            const consumpedFuelInLitres1 = 10;
            const consumpedFuelInLitres2 = 7;
            const consumpedFuelInLitres3 = -1;
            const consumpedFuelInLitres4 = 'fads';
            const consumpedFuelInLitres5 = 6;

            // let litersPerHundredKm1 = ((consumpedFuelInLitres2 / distandInKilo1) * 100).toFixed(2);
            // let litersPerHundredKm2 = ((consumpedFuelInLitres1 / distandInKilo1) * 100).toFixed(2);

            const result1 = chooseYourCar.carFuelConsumption(distandInKilo1, consumpedFuelInLitres2);
            const result2 = chooseYourCar.carFuelConsumption(distandInKilo1, consumpedFuelInLitres1);
            const result3 = () => chooseYourCar.carFuelConsumption(distandInKilo2, consumpedFuelInLitres2);
            const result4 = () => chooseYourCar.carFuelConsumption(distandInKilo3, consumpedFuelInLitres2);
            const result5 = () => chooseYourCar.carFuelConsumption(distandInKilo1, consumpedFuelInLitres3);
            const result6 = () => chooseYourCar.carFuelConsumption(distandInKilo1, consumpedFuelInLitres4);
            const result7 = () => chooseYourCar.carFuelConsumption(distandInKilo4, consumpedFuelInLitres2);
            const result8 = chooseYourCar.carFuelConsumption(distandInKilo1, consumpedFuelInLitres5);


            expect(result1).to.equal(`The car is efficient enough, it burns 7.00 liters/100 km.`);
            expect(result2).to.equal(`The car burns too much fuel - 10.00 liters!`);
            expect(result3).to.throw(`Invalid Information!`);
            expect(result4).to.throw(`Invalid Information!`);
            expect(result5).to.throw(`Invalid Information!`);
            expect(result6).to.throw(`Invalid Information!`);
            expect(result7).to.throw(`Invalid Information!`);
            expect(result8).to.equal(`The car is efficient enough, it burns 6.00 liters/100 km.`);
        })
    })
})
