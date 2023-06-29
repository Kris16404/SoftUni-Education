async function attachEvents() {
  const phonebookUrl = 'http://localhost:3030/jsonstore/phonebook'
  let loadBtnEl = document.querySelector('#btnLoad');
  let createBtnEl = document.querySelector('#btnCreate');
  let phonebookUlEl = document.querySelector('#phonebook');
  let personInputEl = document.querySelector('#person');
  let phoneInputEl = document.querySelector('#phone');

  loadBtnEl.addEventListener('click', loadFunc);
  createBtnEl.addEventListener('click', createContactFunc)

  async function loadFunc(e) {
    let response = await fetch(phonebookUrl);
    let data = await response.json();
    let phonebookChildren = Array.from(phonebookUlEl.children);
    phonebookChildren.forEach(element => {
      element.remove();
    });

    for (const key in data) {
      let person = data[key].person;
      let phone = data[key].phone;

      createPersonForPhonebookLoading(key, person, phone);
    }

  }
  async function createPersonForPhonebookLoading(key, person, phone) {
    let liEl = document.createElement('li');
    liEl.textContent = `${person}: ${phone}`;
    liEl.id = key;

    let delBtnEl = document.createElement('button');
    delBtnEl.textContent = 'Delete';
    delBtnEl.addEventListener('click', deleteFunc);

    liEl.appendChild(delBtnEl);

    phonebookUlEl.appendChild(liEl);
  }
  async function createContactFunc(e) {
    let personInputValue = personInputEl.value;
    let phoneInputValue = phoneInputEl.value;
    if (personInputValue === '' || phoneInputValue === '') {
      return
    }
    let contanctObj = {
      person: personInputValue,
      phone: phoneInputValue
    }

    await fetch(phonebookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contanctObj)
    })

    personInputEl.value = '';
    phoneInputEl.value = '';
    loadBtnEl.click();
  }
  async function deleteFunc(e) {
    let target = e.target.parentElement;
    let id = target.id;
    console.log(e.target);
    let deleteUrl = `http://localhost:3030/jsonstore/phonebook/${id}`;

    await fetch(deleteUrl, {
      method: 'DELETE'
    })

    loadBtnEl.click();
  }
}

attachEvents();