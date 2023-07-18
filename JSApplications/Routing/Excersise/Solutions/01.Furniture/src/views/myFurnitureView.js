import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/data/catalog';
const rootEl = document.querySelector('.container');

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

let publicationsTemplate = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>My Furniture</h1>
      <p>This is a list of your publications.</p>
    </div>
  </div>
  <div class="row space-top">
    ${data.map((furn) => furnitureTemplate(furn))}
  </div>
`;

export async function myPublicationsView(ctx, next) {
  const ownerId = sessionStorage.getItem('ownerId');
  let response = await fetch(`${url}?where=_ownerId%3D%22${ownerId}%22`);
  let data = await response.json();

  render(publicationsTemplate(data), rootEl);
}
