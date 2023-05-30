function argumentInfo(...inputArguments) {
    let typesAndCount = {};

    for (let i = 0; i < inputArguments.length; i++) {
        const element = inputArguments[i];
        let typeOfElement = typeof (element);
        console.log(`${typeOfElement}: ${element}`);

        !typesAndCount[typeOfElement]
            ? typesAndCount[typeOfElement] = 1
            : typesAndCount[typeOfElement] += 1;
    }
    for (const [key, value] of Object.entries(typesAndCount)) {
        console.log(`${key} = ${value}`);
    }
}

argumentInfo({ name: 'bob' }, 3.333, 9.999);

// string: cat
// number: 42
// function: function () { console.log('Hello world!'); }
// string = 1
// number = 1
// function = 1