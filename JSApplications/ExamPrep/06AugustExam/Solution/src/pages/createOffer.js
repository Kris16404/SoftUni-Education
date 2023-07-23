import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const mainEl = document.querySelector('main');
const createOfferUrl = 'http://localhost:3030/data/offers';

let createOfferTemplate = (createFunc) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Create Offer</h2>
      <form class="create-form">
        <input type="text" name="title" id="job-title" placeholder="Title" />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        ></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" />
        <button type="submit" @click="${createFunc}">post</button>
      </form>
    </div>
  </section>
`;

export function createOfferPage() {
  render(createOfferTemplate(createFunc), mainEl);
}

async function createFunc(e) {
  e.preventDefault();

  let titleEl = document.getElementById('job-title');
  let imageUrlEl = document.getElementById('job-logo');
  let categoryEl = document.getElementById('job-category');
  let descriptionEl = document.getElementById('job-description');
  let requirementsEl = document.getElementById('job-requirements');
  let salaryEl = document.getElementById('job-salary');

  const title = titleEl.value;
  const imageUrl = imageUrlEl.value;
  const category = categoryEl.value;
  const description = descriptionEl.value;
  const requirements = requirementsEl.value;
  const salary = salaryEl.value;

  if (
    title === '' ||
    imageUrl === '' ||
    category === '' ||
    description === '' ||
    requirements === '' ||
    salary === ''
  ) {
    alert('all fields must be filled');
    return;
  }

  const sessionToken = sessionStorage.getItem('sessionToken');
  const ownerId = sessionStorage.getItem('ownerId');
  let response = await fetch(createOfferUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      _ownerId: ownerId,
      title: title,
      imageUrl: imageUrl,
      category: category,
      description: description,
      requirements: requirements,
      salary: salary,
    }),
  });

  if (!response.ok) {
    alert('something went wrong trying to add offer');
    return;
  }

  page.redirect('/');
}
