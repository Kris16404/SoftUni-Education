import { html, render } from '../node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', loadFunc);
let townTemplate = (town) => html`<li>${town}</li>`;
let rootEl = document.getElementById('root');

function loadFunc(e) {
  e.preventDefault();
  let inputEl = document.getElementById('towns');

  const splitedInput = inputEl.value.split(', ');

  let townsTemplate = (towns) => html` <ul>
    ${towns.map((town) => townTemplate(town))}
  </ul>`;
  render(townsTemplate(splitedInput), rootEl);
}
