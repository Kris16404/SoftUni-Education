function circleArea(input){
    let typeOfInput = typeof(input);
    let result;

    if (typeOfInput === 'number') {
        result = Math.PI * Math.pow(input, 2);
        console.log(result.toFixed(2));
    } else {
        console.log('We can not calculate the circle area, because we receive a ' + typeOfInput + '.');
    }
}

circleArea('name' )