function lockedProfile() {
    const mainEl = document.getElementById('main');
    mainEl.children[0].remove();
    const profilesUrl = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(profilesUrl)
        .then(response => response.json())
        .then(data => {
            createProfiles(data);
        })

    function createProfiles(data) {
        let arrOfProfileEl = [];
        let i = 1;

        for (const key in data) {

            const element = data[key];
            let username = element.username;
            let email = element.email;
            let age = element.age;
            age = Number(age);

            let profileDiv = document.createElement('div');
            profileDiv.classList.add('profile');

            let imageEl = document.createElement('img');
            imageEl.src = './iconProfile2.png';
            imageEl.classList.add('userIcon');

            let lockLabelEl = document.createElement('label');
            lockLabelEl.textContent = 'Lock';

            let lockRadioButtonEl = document.createElement('input');
            lockRadioButtonEl.type = 'radio';
            lockRadioButtonEl.name = `user${i}Locked`;
            lockRadioButtonEl.value = 'lock';
            lockRadioButtonEl.checked = true;

            let unlockLabelEl = document.createElement('label');
            unlockLabelEl.textContent = 'Unlock';

            let unlockRadioButtonEl = document.createElement('input');
            unlockRadioButtonEl.type = 'radio';
            unlockRadioButtonEl.name = `user${i}Locked`;
            unlockRadioButtonEl.value = 'unlock';


            let brEl = document.createElement('br');
            let hrEl = document.createElement('hr');

            let usernameLabelEl = document.createElement('label');
            usernameLabelEl.textContent = 'Username';

            let usernameInputEl = document.createElement('input');
            usernameInputEl.type = 'text';
            usernameInputEl.name = 'user1Username';
            usernameInputEl.value = username;
            usernameInputEl.disabled = true;
            usernameInputEl.readOnly = true;

            let profileInfoDivEl = document.createElement('div');
            profileInfoDivEl.classList.add('user1Username');
            profileInfoDivEl.hidden = true;

            //append HREl Once More

            let emailLabelEl = document.createElement('label');
            emailLabelEl.textContent = 'Email:';

            let emailInputEl = document.createElement('input');
            emailInputEl.type = 'email';
            emailInputEl.name = 'user1Email';
            emailInputEl.value = email;
            emailInputEl.disabled = true;
            emailInputEl.readOnly = true;

            let ageLabelEl = document.createElement('label');
            ageLabelEl.textContent = 'Age:';

            let ageInputEl = document.createElement('input');
            ageInputEl.type = 'email';
            ageInputEl.name = 'user1Age';
            ageInputEl.value = age;
            ageInputEl.disabled = true;
            ageInputEl.readOnly = true;

            let showMoreBtnEl = document.createElement('button');
            showMoreBtnEl.textContent = 'Show more';
            showMoreBtnEl.addEventListener('click', showMoreFunc)

            profileInfoDivEl.appendChild(hrEl);
            profileInfoDivEl.appendChild(emailLabelEl);
            profileInfoDivEl.appendChild(emailInputEl);
            profileInfoDivEl.appendChild(ageLabelEl);
            profileInfoDivEl.appendChild(ageInputEl);



            profileDiv.appendChild(imageEl);
            profileDiv.appendChild(lockLabelEl);
            profileDiv.appendChild(lockRadioButtonEl);
            profileDiv.appendChild(unlockLabelEl);
            profileDiv.appendChild(unlockRadioButtonEl);
            profileDiv.appendChild(brEl);
            profileDiv.appendChild(hrEl);
            profileDiv.appendChild(usernameLabelEl);
            profileDiv.appendChild(usernameInputEl);
            profileDiv.appendChild(profileInfoDivEl);
            profileDiv.appendChild(showMoreBtnEl);

            arrOfProfileEl.push(profileDiv);
            i++;
        }

        arrOfProfileEl.forEach(element => {
            mainEl.appendChild(element);
        });

    }
    function showMoreFunc(e) {
        const parentTarget = e.target.parentElement;
        const target = e.target;
        let [lockBtnEl, unlockBtnEl] = parentTarget.querySelectorAll('input[type="radio"]');
        let showInfoEl = parentTarget.querySelector('.user1Username');


        if (lockBtnEl.checked) {
            return;
        }
        if (unlockBtnEl.checked) {
            if (target.textContent === 'Hide it') {
                showInfoEl.hidden = true;
                target.textContent = 'Show more';
            } else {
                showInfoEl.hidden = false;
                target.textContent = 'Hide it';
            }

        }
    }
}
