function addItem() {
    let inputItemTextElement = document.getElementById('newItemText');
    let inputValueElement = document.getElementById('newItemValue');
    let resultElement = document.querySelector('div').children[0];

    let newOptionElement = document.createElement('option');
    newOptionElement.textContent = inputItemTextElement.value;
    newOptionElement.value = inputValueElement.value;

    resultElement.appendChild(newOptionElement);

    inputItemTextElement.value = '';
    inputValueElement.value = ''
}