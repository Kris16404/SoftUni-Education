import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { updateNav } from '../nav/updateNav.js';

let mainEl = document.querySelector('main');
let url = 'http://localhost:3030/data/albums?sortBy=_createdOn%20desc';

let dashboardTemplate = (data) => html`
  <!-- Dashboard page -->
  <section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
      ${data.length === 0
        ? html`
            <!-- Display an h2 if there are no posts -->
            <h2>There are no albums added yet.</h2>
          `
        : data.map((post) => postTemplate(post))}
    </ul>
  </section>
`;

let postTemplate = (post) => html`
  <li class="card">
    <img src="${post.imageUrl}" alt="travis" />
    <p>
      <strong>Singer/Band: </strong><span class="singer">${post.singer}</span>
    </p>
    <p><strong>Album name: </strong><span class="album">${post.album}</span></p>
    <p><strong>Sales:</strong><span class="sales">${post.sales}</span></p>
    <a class="details-btn" href="/details/${post._id}">Details</a>
  </li>
`;

export async function dashboardPage() {
  let response = await fetch(url);
  let data = await response.json();

  render(dashboardTemplate(data), mainEl);
  updateNav();
}
