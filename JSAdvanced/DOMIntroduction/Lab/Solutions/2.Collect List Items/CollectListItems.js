function extractText() {
    let elements = document.getElementById('items');
    let result = document.getElementById('result')
    let arr = Array.from(elements.children);
    let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let text = element.textContent;
        resultArr.push(text)
    }

    result.value = resultArr.join('\n')
}