import { html, render } from '../../node_modules/lit-html/lit-html.js';

const mainEl = document.querySelector('main');
const dashboardUrl =
  'http://localhost:3030/data/offers?sortBy=_createdOn%20desc';

let dashboardTemplate = (offers) => html`
  <!-- Dashboard page -->
  <section id="dashboard">
    <h2>Job Offers</h2>
    ${offers.length === 0
      ? noResultTemplate
      : offers.map((offr) => offerTemplate(offr))}
  </section>
`;

let noResultTemplate = html`
  <!-- Display an h2 if there are no posts -->
  <h2>No offers yet.</h2>
`;

let offerTemplate = (offer) => html`
  <div class="offer">
    <img src="${offer.imageUrl}" alt="example2" />
    <p><strong>Title: </strong><span class="title">${offer.title}</span></p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/details/${offer._id}">Details</a>
  </div>
`;

export async function dashboardPage() {
  let response = await fetch(dashboardUrl);
  let data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  render(dashboardTemplate(data), mainEl);
}
