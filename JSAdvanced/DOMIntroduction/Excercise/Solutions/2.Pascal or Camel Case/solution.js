function solve() {
    const textInputElement = document.getElementById('text').value;
    const conventionInputElement = document.querySelector('#naming-convention').value.toLowerCase();
    const resultElement = document.getElementById('result');
    let arrOfWords = textInputElement.split(' ');
    let isInvalid = false;
    let resultArr = [];

    for (let i = 0; i < arrOfWords.length; i++) {
        const word = arrOfWords[i];

        if (conventionInputElement === "camel case") {
            if (resultArr.length === 0) {
                resultArr.push(word.charAt(0).toLowerCase() + word.slice(1).toLowerCase());
            } else {
                resultArr.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
            }
        } else if (conventionInputElement === "pascal case") {
            resultArr.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        } else {
            isInvalid = true;
        }
    }

    if (isInvalid) {
        resultElement.textContent = 'Error!';
    } else {
        resultElement.textContent = resultArr.join('');
    }
}