import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { fruitTemplate } from './dashboardPage.js';

let rootEl = document.querySelector('main');

let searchTemplate = (searchFunc) => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list" @click="${searchFunc}">Search</button>
      </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result"></div>
  </section>
`;

let matchedTemplate = (matchedFruits) => html`
  ${matchedFruits.length === 0
    ? noResultTemplate
    : matchedFruits.map((fruit) => fruitTemplate(fruit))}
`;

export function search() {
  render(searchTemplate(searchFunc), rootEl);
}

let noResultTemplate = html`<p class="no-result">No result.</p>`;

async function searchFunc(e) {
  e.preventDefault();
  let searchEl = document.getElementById('search-input');
  let searchValue = searchEl.value;

  if (searchValue === '') {
    alert('field must be filled');
    return;
  }

  const url = `http://localhost:3030/data/fruits?where=name%20LIKE%20%22${searchValue}%22`;
  let searchResultEl = document.querySelector('.search-result');

  let response = await fetch(url);
  let data = await response.json();

  render(matchedTemplate(data), searchResultEl);
}
