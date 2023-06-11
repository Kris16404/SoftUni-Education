window.addEventListener('load', solve);

function solve() {
    let divFormElement = document.querySelector('.container-text');
    let formElement = divFormElement.children[0];
    formElement.addEventListener('submit', formSubmit)

    // Submit functionality

    function formSubmit(e) {

        // Prevent page from reseting

        e.preventDefault();

        // Get all input elements

        const firstNameElement = document.getElementById('first-name');
        const lastNameElement = document.getElementById('last-name');
        const numberOfPeopleElement = document.getElementById('people-count');
        const fromDateElement = document.getElementById('from-date');
        const daysToStayElement = document.getElementById('days-count');
        const nextStepButtonElement = document.getElementById('next-btn');

        // Getting the information from the form and checking for invalid

        const firstName = firstNameElement.value;
        const lastName = lastNameElement.value;
        const numberOfPeople = numberOfPeopleElement.value;
        const fromDate = fromDateElement.value;
        const daysToStay = daysToStayElement.value;

        if (firstName === '' || lastName === '' || numberOfPeople === '' || fromDate === '' || daysToStay === '') {
            return;
        }

        // Making the ticket preview li and appending it to the ticket preview

        let ulTicketEl = document.querySelectorAll('.ticket-info-list');
        let liElement = document.createElement('li');
        let articleElement = document.createElement('article');
        let headingElement = document.createElement('h3');
        let paragraphFromDateEl = document.createElement('p');
        let paragraphForDaysEl = document.createElement('p');
        let paragraphForPeopleEl = document.createElement('p');
        let editBtnEl = document.createElement('button');
        let continueBtnEl = document.createElement('button');

        headingElement.textContent = `Name: ${firstName} ${lastName}`;
        paragraphFromDateEl.textContent = `From date: ${fromDate}`;
        paragraphForDaysEl.textContent = `For ${daysToStay} days`;
        paragraphForPeopleEl.textContent = `For ${numberOfPeople} people`;
        editBtnEl.classList.add('edit-btn');
        continueBtnEl.classList.add('continue-btn');
        editBtnEl.textContent = 'Edit';
        continueBtnEl.textContent = 'Continue';
        editBtnEl.addEventListener('click', editFunc);
        continueBtnEl.addEventListener('click', continueFunc);



        articleElement.appendChild(headingElement);
        articleElement.appendChild(paragraphFromDateEl);
        articleElement.appendChild(paragraphForDaysEl);
        articleElement.appendChild(paragraphForPeopleEl);
        liElement.appendChild(articleElement);
        liElement.appendChild(editBtnEl);
        liElement.appendChild(continueBtnEl);

        ulTicketEl[0].appendChild(liElement);

        // After appending tickets reset the form to deafault

        firstNameElement.value = '';
        lastNameElement.value = '';
        numberOfPeopleElement.value = '';
        fromDateElement.value = '';
        daysToStayElement.value = '';

        nextStepButtonElement.disabled = true;
    }

    // Edit functionality

    function editFunc(e) {

        const firstNameElement = document.getElementById('first-name');
        const lastNameElement = document.getElementById('last-name');
        const numberOfPeopleElement = document.getElementById('people-count');
        const fromDateElement = document.getElementById('from-date');
        const daysToStayElement = document.getElementById('days-count');
        const nextStepButtonElement = document.getElementById('next-btn');

        nextStepButtonElement.disabled = false;

        let target = e.target.parentElement;
        let h3ElForEdit = target.querySelector('article>h3');
        let paragraphsElForEdit = target.querySelectorAll('article>p');
        let fromDateEl = paragraphsElForEdit[0];
        let forDaysEl = paragraphsElForEdit[1];
        let forPeopleEl = paragraphsElForEdit[2];

        let [, fName, lName] = h3ElForEdit.textContent.split(' ');
        let [, , dateToEdit] = fromDateEl.textContent.split(' ');
        let [, daysToEdit,] = forDaysEl.textContent.split(' ');
        let [, peopleToEdit,] = forPeopleEl.textContent.split(' ');

        firstNameElement.value = fName;
        lastNameElement.value = lName;
        numberOfPeopleElement.value = peopleToEdit;
        fromDateElement.value = dateToEdit;
        daysToStayElement.value = daysToEdit;

        target.remove();
    }

    // Continue functionality

    function continueFunc(e) {
        const target = e.target.parentElement;
        const clonedTarget = target.cloneNode(true);
        const confirmTicketElement = document.querySelectorAll('.confirm-ticket');
        const buttonsToRemove = clonedTarget.querySelectorAll('button');
        buttonsToRemove[0].remove();
        buttonsToRemove[1].remove();

        let confirmButtonElement = document.createElement('button');
        let cancelButtonElement = document.createElement('button');

        confirmButtonElement.classList.add('confirm-btn');
        cancelButtonElement.classList.add('cancel-btn');

        confirmButtonElement.textContent = 'Confirm';
        cancelButtonElement.textContent = 'Cancel';

        confirmButtonElement.addEventListener('click', confirmFunc)
        cancelButtonElement.addEventListener('click', cancelFunc)

        clonedTarget.appendChild(confirmButtonElement);
        clonedTarget.appendChild(cancelButtonElement);
        confirmTicketElement[0].appendChild(clonedTarget);
        console.log(confirmTicketElement[0]);
        console.log(clonedTarget);
        target.remove();

    }

    // Confirm functionality

    function confirmFunc(e) {
        const mainElement = document.getElementById('main');
        const bodyElement = document.getElementById('body');
        let h1Element = document.createElement('h1');
        let backButtonElement = document.createElement('button');

        h1Element.id = 'thank-you';
        h1Element.textContent = 'Thank you, have a nice day! ';
        backButtonElement.id = 'back-btn';
        backButtonElement.textContent = 'Back '
        backButtonElement.addEventListener('click', reloadFunc)

        mainElement.remove();
        bodyElement.appendChild(h1Element);
        bodyElement.appendChild(backButtonElement);
    }

    // Cancel functionality

    function cancelFunc(e) {
        const nextStepButtonElement = document.getElementById('next-btn');
        const target = e.target.parentElement;
        target.remove();
        nextStepButtonElement.disabled = false;

    }

    // Reload functionality

    function reloadFunc(e) {
        location.reload();
    }
}
