function fruit(fruit, weightInGrams, pricePerKg){
    const weitghtInKg = weightInGrams / 1000;
    const priceNeeded = weitghtInKg * pricePerKg;
    console.log(`I need $${priceNeeded.toFixed(2)} to buy ${weitghtInKg.toFixed(2)} kilograms ${fruit}.`);
}

fruit('orange', 2500, 1.80);
// I need $4.50 to buy 2.50 kilograms orange.
fruit('apple', 1563, 2.35);
// I need $3.67 to buy 1.56 kilograms apple.
