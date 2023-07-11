import { html, render } from '../node_modules/lit-html/lit-html.js';
import { homeView, bookTemplate } from './templates.js';

const bodyEl = document.querySelector('body');
const url = 'http://localhost:3030/jsonstore/collections/books';

let id = '';
render(homeView, bodyEl);

document.getElementById('loadBooks').addEventListener('click', loadBooks);

async function loadBooks(e) {
  let response = await fetch(url);
  let data = await response.json();
  let tbodyEl = document.querySelector('tbody');

  let loadedData = html`
    ${Object.keys(data).map((key) =>
      bookTemplate(data[key].title, data[key].author, key)
    )}
  `;
  render(loadedData, tbodyEl);
}

export async function createBookFunc(e) {
  e.preventDefault();
  let formEl = e.target.parentElement;
  let formData = new FormData(formEl);
  let title = formData.get('title');
  let author = formData.get('author');

  if (title === '' || author === '') {
    return;
  }

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      author: `${author}`,
      title: `${title}`,
    }),
  });

  document.getElementById('addTitle').value = '';
  document.getElementById('addAuthor').value = '';
}
export async function editBookFunc(e) {
  e.preventDefault();
  let formEl = e.target.parentElement;
  let formData = new FormData(formEl);
  let title = formData.get('title');
  let author = formData.get('author');

  if (title === '' || author === '') {
    return;
  }

  if (id === '') {
    return;
  }

  let response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      author: `${author}`,
      title: `${title}`,
    }),
  });

  document.getElementById('editTitle').value = '';
  document.getElementById('editAuthor').value = '';

  document.getElementById('add-form').style.display = 'block';
  document.getElementById('edit-form').style.display = 'none';
}
export async function editFunc(e) {
  e.preventDefault();
  document.getElementById('add-form').style.display = 'none';
  document.getElementById('edit-form').style.display = 'block';
  id = e.target.parentElement.id;

  let response = await fetch(`${url}/${id}`);
  let data = await response.json();

  document.getElementById('editTitle').value = data.title;
  document.getElementById('editAuthor').value = data.author;
}
export async function deleteFunc(e) {
  e.preventDefault();
  id = e.target.parentElement.id;
  let response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
}
