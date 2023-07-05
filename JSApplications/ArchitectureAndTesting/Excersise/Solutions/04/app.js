const booksUrl = 'http://localhost:3030/jsonstore/collections/books';
let loadBooksEl = document.querySelector('#loadBooks');
let tbodyEl = document.querySelector('tbody');
let btnsElms = document.querySelectorAll('button');
let submitBtn = btnsElms[btnsElms.length - 1];
let putUrl = '';

submitBtn.addEventListener('click', submitFunc);
loadBooksEl.addEventListener('click', loadBooksFunc);

async function submitFunc(e) {
  e.preventDefault();

  let formEl = document.querySelector('form');
  let formData = new FormData(formEl);
  let titleInputEl = document.querySelector('[name="title"]');
  let authorInputEl = document.querySelector('[name="author"]');

  if (titleInputEl.value === ''
    || authorInputEl.value === '') {
    return;
  }

  if (submitBtn.textContent === 'Save') {

    const updatedBookObj = {
      'author': authorInputEl.value,
      'title': titleInputEl.value
    }

    const putSettings = {
      method: 'PUT',
      'Content-Type': 'application/json',
      body: JSON.stringify(updatedBookObj)

    }

    let response = await fetch(putUrl, putSettings);

    titleInputEl.value = '';
    authorInputEl.value = '';

    document.querySelector('form>h3').textContent = 'FORM';
    submitBtn.textContent = 'Submit';


  } else {

    let titleInput = formData.get('title');
    let authorInput = formData.get('author');

    let bookObj = {
      'author': authorInput,
      'title': titleInput
    }

    const postSettings = {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(bookObj)
    }

    let response = await fetch(booksUrl, postSettings);

    titleInputEl.value = '';
    authorInputEl.value = '';

  }
}

async function loadBooksFunc(e) {
  let response = await fetch(booksUrl);
  let data = await response.json();

  Array
    .from(tbodyEl.children)
    .forEach(e => e.remove());

  for (const key in data) {
    const title = data[key].title;
    const author = data[key].author;
    createBookEl(title, author, key);
  }
}

async function createBookEl(title, author, key) {
  let trEl = document.createElement('tr');
  trEl.id = key;

  let tdTitleEl = document.createElement('td');
  tdTitleEl.textContent = title;

  let tdAutorEl = document.createElement('td');
  tdAutorEl.textContent = author;

  let tdActionsEl = document.createElement('td');
  let editBtnEl = document.createElement('button');
  editBtnEl.textContent = 'Edit';
  editBtnEl.addEventListener('click', editFunc);
  let deleteBtnEl = document.createElement('button');
  deleteBtnEl.textContent = 'Delete';
  deleteBtnEl.addEventListener('click', deleteFunc);


  tdActionsEl.appendChild(editBtnEl);
  tdActionsEl.appendChild(deleteBtnEl);

  trEl.appendChild(tdTitleEl);
  trEl.appendChild(tdAutorEl);
  trEl.appendChild(tdActionsEl);

  tbodyEl.appendChild(trEl);

  let savedTitleValue = title;
  let savedAuthorValue = author;

  async function deleteFunc(e) {
    let targetTrEl = e.target.parentElement.parentElement;
    const id = targetTrEl.id;
    const deleteUrl = booksUrl + `/${id}`;
    const deleteSettings = {
      method: 'DELETE'
    }

    let response = await fetch(deleteUrl, deleteSettings);
  }

  async function editFunc(e) {
    e.preventDefault();
    let targetTrEl = e.target.parentElement.parentElement;
    let h3FormEl = document.querySelector('form>h3');
    let titleInputEl = document.querySelector('[name="title"]');
    let authorInputEl = document.querySelector('[name="author"]');
    const id = targetTrEl.id;
    putUrl = booksUrl + `/${id}`;

    h3FormEl.textContent = 'Edit FORM';
    submitBtn.textContent = 'Save';

    titleInputEl.value = savedTitleValue;
    authorInputEl.value = savedAuthorValue;

  }
}
