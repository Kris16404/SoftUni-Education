function solve() {
    const textInputElementValue = document.getElementById('input').value;
    const resultOutputElement = document.getElementById('output');

    let splitedInputArr = textInputElementValue
        .split('.')
        .filter((sentance) => sentance !== '')
        .map((sentance) => sentance + '.');

    let numberOfParagraphs = Math.ceil(splitedInputArr.length / 3);

    for (let i = 0; i < numberOfParagraphs; i++) {
        const paragraph = splitedInputArr.splice(0, 3).join('');
        resultOutputElement.innerHTML += `<p>${paragraph}</p>`

    }
}