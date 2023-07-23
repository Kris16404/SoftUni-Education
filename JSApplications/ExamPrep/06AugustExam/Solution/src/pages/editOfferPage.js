import page from '../../node_modules/page/page.mjs';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

let offerId = '';
const editUrl = 'http://localhost:3030/data/offers';
const mainEl = document.querySelector('main');

let editTemplate = (offer, editFunc) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Offer</h2>
      <form class="edit-form">
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
          .value="${offer.title}"
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          .value="${offer.imageUrl}"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          .value="${offer.category}"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        >
${offer.description}</textarea
        >
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        >
${offer.requirements}</textarea
        >
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
          .value="${offer.salary}"
        />

        <button type="submit" @click="${editFunc}">post</button>
      </form>
    </div>
  </section>
`;

export async function editOfferPage(ctx, next) {
  offerId = ctx.params.id;

  let response = await fetch(`${editUrl}/${offerId}`);
  let data = await response.json();

  if (!response.ok) {
    alert('something went wrong when loading edit page');
    return;
  }

  render(editTemplate(data, editFunc), mainEl);
}

async function editFunc(e) {
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
  let response = await fetch(`${editUrl}/${offerId}`, {
    method: 'PUT',
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
      _id: offerId,
    }),
  });

  if (!response.ok) {
    alert('something went wrong trying to add offer');
    return;
  }

  page.redirect(`/details/${offerId}`);
}
