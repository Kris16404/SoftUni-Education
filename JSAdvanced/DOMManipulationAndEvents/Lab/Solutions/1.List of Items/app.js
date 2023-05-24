function addItem() {
    const textInputElementValue = document.getElementById('newItemText').value;
    let ulElement = document.getElementById('items');
    let newLiElement = document.createElement('li');
    newLiElement.textContent = textInputElementValue;
    ulElement.appendChild(newLiElement);
}