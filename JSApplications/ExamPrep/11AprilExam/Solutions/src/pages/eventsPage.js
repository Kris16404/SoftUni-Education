import { html, render } from '../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/data/events?sortBy=_createdOn%20desc';
const mainEl = document.querySelector('main');

const eventsTemplate = (data) => html`
  <!-- Dashboard page -->
  <h2>Current Events</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${data.length === 0 ? noResultTemplate : data.map((e) => eventTemplate(e))}
  </section>
`;

const eventTemplate = (event) => html`
  <div class="event">
    <img src="${event.imageUrl}" alt="example1" />
    <p class="title">${event.name}</p>
    <p class="date">${event.date}</p>
    <a class="details-btn" href="/details/${event._id}">Details</a>
  </div>
`;

const noResultTemplate = html` <!-- Display an h4 if there are no posts -->
  <h4>No Events yet.</h4>`;

export async function evetsPage() {
  let response = await fetch(url);
  let data = await response.json();

  if (!response.ok) {
    alert('somethong went wrong when trying to get events');
    return;
  }

  render(eventsTemplate(data), mainEl);
}
