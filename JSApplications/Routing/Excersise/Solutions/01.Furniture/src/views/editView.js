import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import page from '../../../node_modules/page/page.mjs';

const rootEl = document.querySelector('.container');
const url = 'http://localhost:3030/data/catalog';
let id = '';

let editFurnitureTemplate = (furniture) => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input
            class="form-control"
            id="new-make"
            type="text"
            name="make"
            value="${furniture.make}"
          />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input
            class="form-control"
            id="new-model"
            type="text"
            name="model"
            value="${furniture.model}"
          />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input
            class="form-control"
            id="new-year"
            type="number"
            name="year"
            value="${furniture.year}"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description"
            >Description</label
          >
          <input
            class="form-control"
            id="new-description"
            type="text"
            name="description"
            value="${furniture.description}"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control"
            id="new-price"
            type="number"
            name="price"
            value="${furniture.price}"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input
            class="form-control"
            id="new-image"
            type="text"
            name="img"
            value="${furniture.img}"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material"
            >Material (optional)</label
          >
          <input
            class="form-control"
            id="new-material"
            type="text"
            name="material"
            value="${furniture.material}"
          />
        </div>
        <input
          type="submit"
          class="btn btn-info"
          value="Edit"
          @click="${editFunc}"
        />
      </div>
    </div>
  </form>`;

export async function editView(ctx, next) {
  id = ctx.params.id;

  let response = await fetch(`${url}/${id}`);
  let furniture = await response.json();

  render(editFurnitureTemplate(furniture), rootEl);
}

async function editFunc(e) {
  e.preventDefault();

  const ownerId = sessionStorage.getItem('ownerId');
  const sessionToken = sessionStorage.getItem('accesToken');

  let makeEl = document.querySelector('#new-make');
  let modelEl = document.querySelector('#new-model');
  let yearEl = document.querySelector('#new-year');
  let descriptonEl = document.querySelector('#new-description');
  let priceEl = document.querySelector('#new-price');
  let imageEl = document.querySelector('#new-image');
  let materialEl = document.querySelector('#new-material');

  let make = makeEl.value;
  let model = modelEl.value;
  let year = Number(yearEl.value);
  let descripton = descriptonEl.value;
  let price = Number(priceEl.value);
  let image = imageEl.value;
  let material = materialEl.value;

  // Could be better but i dont have time

  if (make.length < 4 || !make) {
    invalidate(makeEl);
  } else {
    validate(makeEl);
  }
  if (model.length < 4 || !model) {
    invalidate(modelEl);
  } else {
    validate(modelEl);
  }
  if (year < 1950 || year > 2050 || !year) {
    invalidate(yearEl);
  } else {
    validate(yearEl);
  }
  if (descripton.length < 10 || !descripton) {
    invalidate(descriptonEl);
  } else {
    validate(descriptonEl);
  }
  if (price <= 0 || !price) {
    invalidate(priceEl);
  } else {
    validate(priceEl);
  }
  if (image.length < 0 || !image) {
    invalidate(imageEl);
  } else {
    validate(imageEl);
  }
  let isValid = true;
  let allInputs = document.querySelectorAll('input');
  allInputs.forEach((input) => {
    if (input.classList.contains('is-invalid')) {
      isValid = false;
    }
  });

  if (isValid) {
    const furnitureObj = {
      _ownerId: ownerId,
      make: make,
      model: model,
      year: year,
      description: descripton,
      price: price,
      img: image,
      material: material,
    };

    let response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': sessionToken,
      },
      body: JSON.stringify(furnitureObj),
    });
    if (!response.ok) {
      alert(response.statusText);
      return;
    }

    page.redirect('/01.Furniture/');
  }
}

function invalidate(element) {
  element.classList.add('is-invalid');
  element.classList.remove('is-valid');
}
function validate(element) {
  element.classList.remove('is-invalid');
  element.classList.remove('is-invalid');
}
