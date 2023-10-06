function lockedProfile() {
    let profileElements = document.getElementsByClassName('profile');
    let arrFromProfileEls = Array.from(profileElements);

    function showHiddenInfo(e) {
        let target = e.target;
        let hiddenInfo = target.parentElement.querySelector('div');
        let lockElement = target.parentElement.querySelector('input');

        if (lockElement.checked) {

        } else {
            if (target.textContent != 'Hide it') {
                hiddenInfo.style.display = 'block';
                target.textContent = 'Hide it';
            } else {
                hiddenInfo.style.display = 'none';
                target.textContent = 'Show more';
            }
        }

    }

    for (let i = 0; i < arrFromProfileEls.length; i++) {
        const element = arrFromProfileEls[i];
        let profileBtnElement = element.children[10];
        profileBtnElement.addEventListener('click', showHiddenInfo)
    }
}