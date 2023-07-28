import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const url = 'http://localhost:3030/data/events';
const mainEl = document.querySelector('main');

const createEventTemplate = (onSubmit) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Add Event</h2>
      <form class="create-form">
        <input type="text" name="name" id="name" placeholder="Event" />
        <input
          type="text"
          name="imageUrl"
          id="event-image"
          placeholder="Event Image URL"
        />
        <input
          type="text"
          name="category"
          id="event-category"
          placeholder="Category"
        />

        <textarea
          id="event-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>

        <input type="text" name="date" id="date" placeholder="When?" />

        <button type="submit" @click="${onSubmit}">Add</button>
      </form>
    </div>
  </section>
`;

export function createPage() {
  render(createEventTemplate(onSubmit), mainEl);
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
  let response = await fetch(url, {
    method: 'POST',
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
    }),
  });

  if (!response.ok) {
    alert('something went wrong when trying to add an event');
    return;
  }

  page.redirect('/events');
}
