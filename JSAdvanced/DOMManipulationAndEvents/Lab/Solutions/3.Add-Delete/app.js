function addItem() {
    let ulElement = document.getElementById('items');
    let inputElementValue = document.getElementById('newItemText').value;

    let newLiElement = document.createElement('li')
    let newAnchorTagElement = document.createElement('a')
    newAnchorTagElement.textContent = '[Delete]';
    newAnchorTagElement.href = '#';
    newAnchorTagElement.addEventListener('click', deleteItem)
    newLiElement.textContent = inputElementValue;
    newLiElement.appendChild(newAnchorTagElement);
    ulElement.appendChild(newLiElement);

    function deleteItem(e) {
        let target = e.currentTarget;
        target.parentElement.remove();
    }

}