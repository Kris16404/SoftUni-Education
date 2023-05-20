function editElement(element, match, replacement) {
    let regex = new RegExp(match, 'g');
    console.log(regex);
    let elementTextContent = element.textContent;
    let newElement = elementTextContent.replace(regex, replacement)
    element.textContent = newElement;
}