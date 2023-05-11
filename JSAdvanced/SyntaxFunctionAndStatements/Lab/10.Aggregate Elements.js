function aggregateElements(inputArray){
    let arraySum = 0;
    let inverseSum = 0;

    for (let i = 0; i < inputArray.length; i++) {
        let element = inputArray[i]

        arraySum += element;
        inverseSum += 1 / element;
    }

    console.log(arraySum);
    console.log(inverseSum);
    console.log(inputArray.join(''));

}
aggregateElements([2, 4, 8, 16])