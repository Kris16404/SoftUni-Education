import page from '../../node_modules/page/page.mjs';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/data/fruits';
let rootEl = document.querySelector('main');
let fruitId = '';

let editTemplate = (fruit, editFunc) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Fruit</h2>
      <form class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fruit Name"
          value="${fruit.name}"
        />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image URL"
          value="${fruit.imageUrl}"
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
        >
${fruit.description}</textarea
        >
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
        >
${fruit.nutrition}</textarea
        >
        <button type="submit" @click="${editFunc}">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx, next) {
  fruitId = ctx.params.id;

  let response = await fetch(`${url}/${fruitId}`);
  let data = await response.json();

  render(editTemplate(data, editFunc), rootEl);
}

async function editFunc(e) {
  e.preventDefault();
  let ownerId = sessionStorage.getItem('ownerId');
  let sessionToken = sessionStorage.getItem('sessionToken');
  let nameEl = document.getElementById('name');
  let imageUrlEl = document.getElementById('Fruit-image');
  let descriptionEl = document.getElementById('fruit-description');
  let nutritionEl = document.getElementById('fruit-nutrition');
  const name = nameEl.value;
  const imageUrl = imageUrlEl.value;
  const description = descriptionEl.value;
  const nutrition = nutritionEl.value;

  if (
    name === '' ||
    imageUrl === '' ||
    description === '' ||
    nutrition === ''
  ) {
    alert('all fields must be filled');
    return;
  }

  let response = await fetch(`${url}/${fruitId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      _ownerId: ownerId,
      name: name,
      imageUrl: imageUrl,
      description: description,
      nutrition: nutrition,
      _id: fruitId,
    }),
  });

  if (!response.ok) {
    alert('something went wrong');
    return;
  }

  page.redirect(`/details/${fruitId}`);
}
