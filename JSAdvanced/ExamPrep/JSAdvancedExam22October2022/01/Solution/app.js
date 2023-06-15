window.addEventListener("load", solve);

function solve() {
    const firstNameEl = document.getElementById('first-name');
    const lastNameEl = document.getElementById('last-name');
    const ageEl = document.getElementById('age');
    const storyTitleEl = document.getElementById('story-title');
    const genreEl = document.getElementById('genre');
    const yourStoryEl = document.getElementById('story');
    const publishBtnEl = document.getElementById('form-btn');
    const previewSectionsEl = document.getElementById('preview-list');
    const mainEl = document.getElementById('main');


    publishBtnEl.addEventListener('click', publishFunc)

    function publishFunc(e) {
        // e.preventDefault();
        const firstNameValue = firstNameEl.value;
        const lastNameValue = lastNameEl.value;
        const ageValue = ageEl.value;
        const storyTitleValue = storyTitleEl.value;
        const genreValue = genreEl.value;
        const yourStoryValue = yourStoryEl.value;

        if (firstNameValue === '' ||
            lastNameValue === '' ||
            ageValue === '' ||
            storyTitleValue === '' ||
            genreValue === '' ||
            yourStoryValue === '') {
            return;
        }
        let liEl = document.createElement('li');
        liEl.classList.add('story-info')

        let articleEl = document.createElement('article');

        let h4El = document.createElement('h4');
        h4El.textContent = `Name: ${firstNameValue} ${lastNameValue}`;

        let ageParagraphEl = document.createElement('p');
        ageParagraphEl.textContent = `Age: ${ageValue}`;

        let titleParagraphEl = document.createElement('p');
        titleParagraphEl.textContent = `Title: ${storyTitleValue}`;


        let genreParagraphEl = document.createElement('p');
        genreParagraphEl.textContent = `Genre: ${genreValue}`;


        let storyParagraphEl = document.createElement('p');
        storyParagraphEl.textContent = `${yourStoryValue}`;

        let saveBtnEl = document.createElement('button');
        saveBtnEl.classList.add('save-btn');
        saveBtnEl.textContent = 'Save Story';
        saveBtnEl.addEventListener('click', saveFunc);


        let editBtnEl = document.createElement('button');
        editBtnEl.classList.add('edit-btn');
        editBtnEl.textContent = 'Edit Story';
        editBtnEl.addEventListener('click', editFunc);


        let deleteBtnEl = document.createElement('button');
        deleteBtnEl.classList.add('delete-btn');
        deleteBtnEl.textContent = 'Delete Story';
        deleteBtnEl.addEventListener('click', deleteFunc);


        articleEl.appendChild(h4El);
        articleEl.appendChild(ageParagraphEl);
        articleEl.appendChild(titleParagraphEl);
        articleEl.appendChild(genreParagraphEl);
        articleEl.appendChild(storyParagraphEl);

        liEl.appendChild(articleEl);
        liEl.appendChild(saveBtnEl);
        liEl.appendChild(editBtnEl);
        liEl.appendChild(deleteBtnEl);

        previewSectionsEl.appendChild(liEl);
        publishBtnEl.disabled = true;

        const firstNameSavedValue = firstNameEl.value;
        const lastNameSavedValue = lastNameEl.value;
        const ageSavedValue = ageEl.value;
        const storyTitleSavedValue = storyTitleEl.value;
        const genreSavedValue = genreEl.value;
        const yourStorySavedValue = yourStoryEl.value;

        firstNameEl.value = '';
        lastNameEl.value = '';
        ageEl.value = '';
        storyTitleEl.value = '';
        genreEl.value = '';
        yourStoryEl.value = '';

        function editFunc(e) {
            firstNameEl.value = firstNameSavedValue;
            lastNameEl.value = lastNameSavedValue;
            ageEl.value = ageSavedValue;
            storyTitleEl.value = storyTitleSavedValue;
            genreEl.value = genreSavedValue;
            yourStoryEl.value = yourStorySavedValue;

            e.target.parentElement.remove();
            publishBtnEl.disabled = false;

        }
        function saveFunc(e) {
            let mainChildrenArr = Array.from(mainEl.children);
            mainChildrenArr.forEach(child => {
                child.remove();
            });

            const h1El = document.createElement('h1');
            h1El.textContent = 'Your scary story is saved!';

            mainEl.appendChild(h1El);

        }
        function deleteFunc(e) {
            e.target.parentElement.remove();
            publishBtnEl.disabled = false;
        }
    }
}
