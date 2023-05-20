function extract(content) {
    let element = document.getElementById(content);
    let pattern = /\(([^)]+)\)/g;
    let textFromElement = element.textContent;
    let matches = textFromElement.match(pattern);
    let resultArr = [];
    for (let i = 0; i < matches.length; i++) {
        const element = matches[i];
        let temp = element.replace(/[()]/g, "");
        resultArr.push(temp)
    }
    let result = resultArr.join('; ');
    return result
}