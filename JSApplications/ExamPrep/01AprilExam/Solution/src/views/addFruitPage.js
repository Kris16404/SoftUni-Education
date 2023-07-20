import page from '../../node_modules/page/page.mjs';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/data/fruits';
let rootEl = document.querySelector('main');

let addFruitTemplate = (createFunc) => html`
  <section id="create">
    <div class="form">
      <h2>Add Fruit</h2>
      <form class="create-form">
        <input type="text" name="name" id="name" placeholder="Fruit Name" />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image"
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit" @click="${createFunc}">Add Fruit</button>
      </form>
    </div>
  </section>
`;

export async function addFruitPage() {
  render(addFruitTemplate(createFunc), rootEl);
}

async function createFunc(e) {
  e.preventDefault();
  let fruitNameEl = document.getElementById('name');
  let fruitImageEl = document.getElementById('Fruit-image');
  let fruitDescriptionEl = document.getElementById('fruit-description');
  let fruitNutritionEl = document.getElementById('fruit-nutrition');
  const name = fruitNameEl.value;
  const imageUrl = fruitImageEl.value;
  const description = fruitDescriptionEl.value;
  const nutrition = fruitNutritionEl.value;
  const sessionToken = sessionStorage.getItem('sessionToken');

  if (
    name === '' ||
    imageUrl === '' ||
    description === '' ||
    nutrition === ''
  ) {
    alert('All fields must be filled');
    return;
  }

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      description: description,
      nutrition: nutrition,
    }),
  });

  if (!response.ok) {
    alert('something went wrong');
    return;
  }

  fruitNameEl.value = '';
  fruitImageEl.value = '';
  fruitDescriptionEl.value = '';
  fruitNutritionEl.value = '';

  page.redirect('/dashboard');
}
