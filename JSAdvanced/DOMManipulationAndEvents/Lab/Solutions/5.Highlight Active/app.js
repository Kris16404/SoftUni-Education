function focused() {
    const sectionsElements = document.querySelectorAll('body>div>div');
    // let arrFromSectionElemetns = Array.from(sectionsElements);

    for (let i = 0; i < sectionsElements.length; i++) {
        const element = sectionsElements[i];
        element.children[1].addEventListener('focus', focusElement);
        element.children[1].addEventListener('focusout', unfocusElement);
    }

    function focusElement(e) {
        const target = e.target;
        target.parentElement.className = 'focused';
    }

    function unfocusElement(e) {
        const target = e.target;
        target.parentElement.className = '';
    }
}