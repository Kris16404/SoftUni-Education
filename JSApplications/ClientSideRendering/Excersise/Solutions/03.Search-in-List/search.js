import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const townEl = document.getElementById('towns');
let townTemplate = (town) => html`<li>${town}</li>`;
let townsTempalate = (towns) => html` <ul>
  ${towns.map((town) => townTemplate(town))}
</ul>`;
document.querySelector('button').addEventListener('click', search);
render(townsTempalate(towns), townEl);

function search(e) {
  e.preventDefault();
  let inputEl = document.getElementById('searchText');
  let townsForSearch = Array.from(document.querySelector('#towns>ul').children);
  townsForSearch.forEach((e) => e.classList.remove('active'));
  let matchedTowns = [];

  if (inputEl.value === '') {
    return;
  }
  townsForSearch.filter((town) => {
    if (town.textContent.includes(inputEl.value)) {
      matchedTowns.push(town);
    }
  });
  matchedTowns.forEach((e) => {
    e.classList.add('active');
  });
  document.getElementById(
    'result'
  ).textContent = `${matchedTowns.length} matches found`;
}
