function colorize() {
    let trElements = document.getElementsByTagName('tr');
    let arrFromChildren = Array.from(trElements);
    for (let i = 1; i < arrFromChildren.length; i += 2) {
        const element = arrFromChildren[i];
        element.style.backgroundColor = 'Teal';
    }
}