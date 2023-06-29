
function load() {
  const databaseUrl = 'http://localhost:3030/jsonstore/collections/students';
  let xhttp = new XMLHttpRequest();
  let tbodyEl = document.querySelector('#results>tbody');
  let submitBtnEl = document.querySelector('#submit');
  let firstNameInputEl = document.querySelector('[name="firstName"]');
  let lastNameInputEl = document.querySelector('[name="lastName"]');
  let facultyNumberInputEl = document.querySelector('[name="facultyNumber"]');
  let gradeInputEl = document.querySelector('[name="grade"]');
  submitBtnEl.addEventListener('click', submtFunc);
  let childrenOfTbody = Array.from(tbodyEl.children);
  childrenOfTbody.forEach(e => e.remove());

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let textResonse = this.responseText;
      let parsedData = JSON.parse(textResonse);
      let childrenOfTbody = Array.from(tbodyEl.children);
      childrenOfTbody.forEach(e => e.remove());
      for (const key in parsedData) {
        let firstName = parsedData[key].firstName;
        let lastName = parsedData[key].lastName;
        let facultyNumber = parsedData[key].facultyNumber;
        let grade = Number(parsedData[key].grade);
        let id = parsedData[key]._id;

        createTrElement(firstName, lastName, facultyNumber, grade, id)
      }
    }
  }

  function createTrElement(firstName, lastName, facultyNumber, grade, id) {

    let trEl = document.createElement('tr');
    trEl.id = id;
    grade = grade.toFixed(2);

    let firstNameTdEl = document.createElement('td');
    firstNameTdEl.textContent = firstName;

    let lastNameTdEl = document.createElement('td');
    lastNameTdEl.textContent = lastName;

    let facultyNumberTdEl = document.createElement('td');
    facultyNumberTdEl.textContent = facultyNumber;

    let gradeTdEl = document.createElement('td');
    gradeTdEl.textContent = grade;

    trEl.appendChild(firstNameTdEl);
    trEl.appendChild(lastNameTdEl);
    trEl.appendChild(facultyNumberTdEl);
    trEl.appendChild(gradeTdEl);

    tbodyEl.appendChild(trEl);
  }

  function submtFunc(e) {
    e.preventDefault();

    let firstNameInputValue = firstNameInputEl.value;
    let lastNameInputValue = lastNameInputEl.value;
    let facultyNumberInputValue = facultyNumberInputEl.value;
    let gradeInputValue = gradeInputEl.value;

    if (firstNameInputValue === '' ||
      lastNameInputValue === '' ||
      facultyNumberInputValue === '' ||
      gradeInputValue === '') {
      return;
    }
    gradeInputValue = Number(gradeInputValue);

    let studentObj = {
      firstName: firstNameInputValue,
      lastName: lastNameInputValue,
      facultyNumber: facultyNumberInputValue,
      grade: gradeInputValue
    }
    xhttp.open('POST', databaseUrl, true)
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(studentObj));

    // firstNameInputEl.value = '';
    // lastNameInputEl.value = '';
    // facultyNumberInputEl.value = '';
    // gradeInputEl.value = '';

  }
  xhttp.open('GET', databaseUrl, true);
  xhttp.send();
}