function sumTable() {
    let tdElements = document.getElementsByTagName('td');
    let result = document.getElementById('sum');
    let arrFromTdElements = Array.from(tdElements);
    let sum = 0;

    for (let i = 1; i < arrFromTdElements.length; i += 2) {
        const element = arrFromTdElements[i].textContent;
        sum += Number(element);
    }

    result.textContent = sum;
}