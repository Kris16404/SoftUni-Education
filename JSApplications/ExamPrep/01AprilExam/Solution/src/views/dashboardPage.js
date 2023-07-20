import { html, render } from '../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/data/fruits?sortBy=_createdOn%20desc';
let rootEl = document.querySelector('main');

let dashboardTemplate = (data) => html`
  <h2>Fruits</h2>
  ${data.length === 0
    ? html`<!-- Display an h2 if there are no posts -->
        <h2>No fruit info yet.</h2>`
    : html`<section id="dashboard">
        <!-- Display a div with information about every post (if any)-->
        ${data.map((fruit) => fruitTemplate(fruit))}
      </section>`}
`;

export let fruitTemplate = (fruit) => html`
  <div class="fruit">
    <img src="${fruit.imageUrl}" alt="example1" />
    <h3 class="title">${fruit.name}</h3>
    <p class="description">${fruit.description}</p>
    <a class="details-btn" href="/details/${fruit._id}">More Info</a>
  </div>
`;

export async function dashboardPage() {
  let response = await fetch(url);
  let data = await response.json();
  render(dashboardTemplate(data), rootEl);
}
