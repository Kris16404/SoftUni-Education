import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const mainEl = document.querySelector('main');
let eventId = '';

const editTemplate = (event, onSubmit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Event</h2>
      <form class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Event"
          .value="${event.name}"
        />
        <input
          type="text"
          name="imageUrl"
          id="event-image"
          placeholder="Event Image"
          .value="${event.imageUrl}"
        />
        <input
          type="text"
          name="category"
          id="event-category"
          placeholder="Category"
          .value="${event.category}"
        />

        <textarea
          id="event-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        >
${event.description}</textarea
        >

        <label for="date-and-time">Event Time:</label>
        <input
          type="text"
          name="date"
          id="date"
          placeholder="When?"
          .value="${event.date}"
        />

        <button type="submit" @click="${onSubmit}">Edit</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx, next) {
  eventId = ctx.params.id;
  let response = await fetch(`http://localhost:3030/data/events/${eventId}`);
  let data = await response.json();

  if (!response.ok) {
    alert('something went wrong when aaccessing edit page');
    return;
  }

  render(editTemplate(data, onSubmit), mainEl);
}

async function onSubmit(e) {
  e.preventDefault();

  let nameEl = document.getElementById('name');
  let imageEl = document.getElementById('event-image');
  let categoryEl = document.getElementById('event-category');
  let descriptionEl = document.getElementById('event-description');
  let dateEl = document.getElementById('date');

  const name = nameEl.value;
  const image = imageEl.value;
  const category = categoryEl.value;
  const description = descriptionEl.value;
  const date = dateEl.value;

  if (
    name === '' ||
    image === '' ||
    category === '' ||
    description === '' ||
    date === ''
  ) {
    alert('all fields must be filled');
    return;
  }

  const sessionToken = sessionStorage.getItem('sessionToken');
  const ownerId = sessionStorage.getItem('ownerId');
  let response = await fetch(`http://localhost:3030/data/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      _ownerId: ownerId,
      name: name,
      imageUrl: image,
      category: category,
      description: description,
      date: date,
      _id: eventId,
    }),
  });

  if (!response.ok) {
    alert('something went wrong when trying to add an event');
    return;
  }

  page.redirect(`/details/${eventId}`);
}
