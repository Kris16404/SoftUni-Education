const { it } = require('mocha');

const expect = require('chai').expect;

const findNewApartment = {
    isGoodLocation(city, nearPublicTransportation) {
        if (typeof city !== "string" || typeof nearPublicTransportation !== "boolean") {
            throw new Error("Invalid input!");
        }
        if (city !== "Sofia" && city !== "Plovdiv" && city !== "Varna") {
            return "This location is not suitable for you.";
        } else {
            if (nearPublicTransportation == true) {
                return "You can go on home tour!";
            }
            else {
                return "There is no public transport in area.";
            }
        }
    },
    isLargeEnough(apartments, minimalSquareMeters) {
        let resultArr = [];
        if (!Array.isArray(apartments) || typeof minimalSquareMeters !== "number" || apartments.length == 0) {
            throw new Error("Invalid input!");
        }
        apartments.map((apartment) => {
            if (apartment >= minimalSquareMeters) {
                resultArr.push(apartment);
            }
        });
        return resultArr.join(', ');
    },
    isItAffordable(price, budget) {
        if (typeof price !== "number" || typeof budget !== "number"
            || price <= 0 || budget <= 0) {
            throw new Error("Invalid input!");
        }
        let result = budget - price;
        if (result < 0) {
            return "You don't have enough money for this house!";
        } else {
            return "You can afford this home!";
        }
    },
};

describe('findNewApartment tests', function () {
    describe('isGoodLocations', function () {
        it('with wrong and true conditions should return the right result', function () {
            let city1 = 'Sofia';
            let city2 = 'Plovdiv';
            let city3 = 'Varna';
            let city4 = 'Pernik';
            let city5 = 2314

            let nearPublicTransportation1 = true;
            let nearPublicTransportation2 = false;
            let nearPublicTransportation3 = 'false';

            let result1 = findNewApartment.isGoodLocation(city1, nearPublicTransportation1);
            let result2 = findNewApartment.isGoodLocation(city2, nearPublicTransportation1);
            let result3 = findNewApartment.isGoodLocation(city3, nearPublicTransportation1);
            let result4 = findNewApartment.isGoodLocation(city4, nearPublicTransportation1);
            let result5 = findNewApartment.isGoodLocation(city1, nearPublicTransportation2);
            let result6 = findNewApartment.isGoodLocation(city2, nearPublicTransportation2);
            let result7 = findNewApartment.isGoodLocation(city3, nearPublicTransportation2);
            let result8 = findNewApartment.isGoodLocation(city4, nearPublicTransportation2);
            let result9 = () => findNewApartment.isGoodLocation(city5, nearPublicTransportation1);
            let result10 = () => findNewApartment.isGoodLocation(city4, nearPublicTransportation3);
            let result11 = () => findNewApartment.isGoodLocation(city5, nearPublicTransportation3);

            expect(result1).to.equal('You can go on home tour!');
            expect(result2).to.equal('You can go on home tour!');
            expect(result3).to.equal('You can go on home tour!');
            expect(result4).to.equal('This location is not suitable for you.');
            expect(result5).to.equal('There is no public transport in area.');
            expect(result6).to.equal('There is no public transport in area.');
            expect(result7).to.equal('There is no public transport in area.');
            expect(result8).to.equal('This location is not suitable for you.');
            expect(result9).to.throw('Invalid input!');
            expect(result10).to.throw('Invalid input!');
            expect(result11).to.throw('Invalid input!');
        })
    })
    describe('isLargeEnough', function () {
        it('with valid and invalid input should thow errors', function () {
            let apartments1 = [40, 50, 60, 70, 80];
            let apartments2 = [];
            let apartments3 = 'string';
            let minimalSquareMeters1 = 40;
            let minimalSquareMeters2 = true;

            let result1 = findNewApartment.isLargeEnough(apartments1, minimalSquareMeters1);
            let result2 = () => findNewApartment.isLargeEnough(apartments1, minimalSquareMeters2);
            let result3 = () => findNewApartment.isLargeEnough(apartments3, minimalSquareMeters1);
            let result4 = () => findNewApartment.isLargeEnough(apartments2, minimalSquareMeters2);
            let result5 = () => findNewApartment.isLargeEnough(apartments3, minimalSquareMeters1);


            expect(result1).to.equal('40, 50, 60, 70, 80');
            expect(result2).to.throw('Invalid input!');
            expect(result3).to.throw('Invalid input!');
            expect(result4).to.throw('Invalid input!');
            expect(result5).to.throw('Invalid input!');
        })
    })
    describe('isItAffordable', function () {
        it('with lower than zeto should return you dont have money', function () {
            let price1 = 100;
            let price2 = 1000;
            let price3 = 'stering';
            let budget1 = 99;
            let budget2 = 2000;
            let budget3 = true;
            let budget4 = 100;


            let result1 = findNewApartment.isItAffordable(price1, budget2);
            let result2 = findNewApartment.isItAffordable(price1, budget1);
            let result3 = () => findNewApartment.isItAffordable(price2, budget3);
            let result4 = () => findNewApartment.isItAffordable(price3, budget2);
            let result5 = findNewApartment.isItAffordable(price1, budget4);

            expect(result1).to.equal('You can afford this home!');
            expect(result2).to.equal(`You don't have enough money for this house!`);
            expect(result3).to.throw('Invalid input!');
            expect(result4).to.throw('Invalid input!');
            expect(result5).to.equal('You can afford this home!');
        })
    })
})