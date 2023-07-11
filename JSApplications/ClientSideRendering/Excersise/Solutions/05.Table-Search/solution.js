import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/table';
const studentTemplate = (firstName, lastName, email, course, id) => html`
  <tr id="${id}">
    <td>${firstName} ${lastName}</td>
    <td>${email}</td>
    <td>${course}</td>
  </tr>
`;
const tbodyEl = document.querySelector('tbody');

let response = await fetch(url);
let data = await response.json();

let dataToRender = html`
  ${Object.keys(data).map((key) =>
    studentTemplate(
      data[key].firstName,
      data[key].lastName,
      data[key].email,
      data[key].course,
      data[key]._id
    )
  )}
`;
render(dataToRender, tbodyEl);
document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick(e) {
  const searchFieldEl = document.getElementById('searchField');
  const searchValue = searchFieldEl.value.toLowerCase();
  if (searchValue === '') {
    return;
  }
  let children = Array.from(tbodyEl.children);
  children.forEach((child) => child.classList.remove('select'));
  children.forEach((tr) => {
    let tdChildren = Array.from(tr.children);
    tdChildren.forEach((td) => {
      let tdToCompare = td.textContent.toLowerCase();
      if (tdToCompare.includes(searchValue)) {
        tr.classList.add('select');
      }
    });
  });
}
