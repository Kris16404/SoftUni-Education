import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
let addBtnEl = document.querySelectorAll('input');
let selectMenuEl = document.querySelector('#menu');
addBtnEl[addBtnEl.length - 1].addEventListener('click', addItem);

async function renderTemplates() {
  let response = await fetch(url);
  let data = await response.json();
  let dropdownTempalte = (dataId, content) =>
    html`<option value="${dataId}">${content}</option>`;
  let dropdownsTemplate = (data) =>
    html`${Object.keys(data).map((key) =>
      dropdownTempalte(data[key]._id, data[key].text)
    )}`;

  render(dropdownsTemplate(data), selectMenuEl);
}

async function addItem(e) {
  e.preventDefault();
  let formEl = e.target.parentElement;
  let textInput = formEl.querySelector('#itemText');

  if (textInput.value === '') {
    return;
  }

  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: textInput.value }),
  });

  if (!response.ok) {
    alert(response.statusText);
    return;
  }

  renderTemplates();
  textInput.value = '';
}

await renderTemplates();
