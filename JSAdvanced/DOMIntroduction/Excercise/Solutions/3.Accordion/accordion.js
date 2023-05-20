function toggle() {
    let hiddenTextElement = document.getElementById('extra');
    let buttonElement = document.getElementsByClassName('button');
    let buttonText = buttonElement[0].textContent;


    if (buttonText === 'More') {
        hiddenTextElement.style.display = 'block';
        buttonElement[0].textContent = 'Less';
    } else {
        hiddenTextElement.style.display = 'none';
        buttonElement[0].textContent = 'More';
    }
}