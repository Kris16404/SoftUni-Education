import { cats } from './catSeeder.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

let allCatsEl = document.getElementById('allCats');

let catTemplate = (id, statusCode, statusMessage, imageLocation) => html` <li>
  <img
    src="./images/${imageLocation}.jpg"
    width="250"
    height="250"
    alt="Card image cap"
  />
  <div class="info">
    <button class="showBtn" @click=${(e) => showMore(e)}>
      Show status code
    </button>
    <div class="status" style="display: none" id="${id}">
      <h4>Status Code: ${statusCode}</h4>
      <p>${statusMessage}</p>
    </div>
  </div>
</li>`;

function showMore(e) {
  e.preventDefault();
  const buttonEl = e.target;
  const parent = e.target.parentElement;
  let hiddenInfo = parent.querySelector(`.status`);

  if (hiddenInfo.style.display === 'none') {
    hiddenInfo.style.display = 'block';
    buttonEl.textContent = 'Hide status code';
  } else {
    hiddenInfo.style.display = 'none';
    buttonEl.textContent = 'Show status code';
  }
}

let catsTemplate = (cats) => html`
  <ul>
    ${cats.map((cat) =>
      catTemplate(cat.id, cat.statusCode, cat.statusMessage, cat.imageLocation)
    )}
  </ul>
`;

render(catsTemplate(cats), allCatsEl);
