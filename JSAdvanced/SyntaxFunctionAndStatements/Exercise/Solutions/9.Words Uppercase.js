function wordsUpercase(stringInput){
    const pattern = /\w+/g;
    const result = stringInput.match(pattern).join(', ').toUpperCase();
    console.log(result);
}

wordsUpercase('Hi, how are you?');
// HI, HOW, ARE, YOU
wordsUpercase('hello');
// HELLO