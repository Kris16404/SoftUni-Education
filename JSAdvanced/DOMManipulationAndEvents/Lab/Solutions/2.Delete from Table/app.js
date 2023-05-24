function deleteByEmail() {
    const tableBodyElements = document.querySelectorAll('#customers>tbody>tr');
    const inputEmailElementValue = document.querySelector('[name="email"]').value;
    const resultElement = document.getElementById('result');
    let tbodyArr = Array.from(tableBodyElements)
    let isDeleted = true;
    let isFound = false;

    for (let i = 0; i < tbodyArr.length; i++) {
        const element = tbodyArr[i];
        for (let j = 0; j < element.children.length; j++) {
            const children = element.children[j].textContent;
            if (children.includes(inputEmailElementValue)) {
                element.remove();
                isFound = true;
                continue;
            }
        }
        if (isFound) {
            isDeleted = true;
            break
        } else {
            isDeleted = false
        }
    }

    if (isDeleted) {
        resultElement.textContent = 'Deleted.';
    } else {
        resultElement.textContent = 'Not found.'
    }
}