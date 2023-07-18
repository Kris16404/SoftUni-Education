import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { updateNav } from '../updateNav.js';

const rootEl = document.querySelector('.container');
const url = 'http://localhost:3030/data/catalog';

let furnitureTemplate = (furniture) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src="${furniture.img}" />
        <p>${furniture.description}</p>
        <footer>
          <p>Price: <span>${furniture.price} $</span></p>
        </footer>
        <div>
          <a href="/01.Furniture/details/${furniture._id}" class="btn btn-info"
            >Details</a
          >
        </div>
      </div>
    </div>
  </div>
`;

let catalogTemplate = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">${data.map((fur) => furnitureTemplate(fur))}</div>
`;

export async function catalogView(ctx, next) {
  let response = await fetch(url);
  let data = await response.json();

  render(catalogTemplate(data), rootEl);
  updateNav();
}
