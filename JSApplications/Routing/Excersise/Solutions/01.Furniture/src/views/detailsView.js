import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/data/catalog';
const rootEl = document.querySelector('.container');

let detailsTemplate = (furniture) => {
  const ownerId = sessionStorage.getItem('ownerId');
  const isOwner = ownerId === furniture._ownerId ? 'inline' : 'none';

  return html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src=".${furniture.img}" />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        <div style="display: ${isOwner}">
          <a href="/01.Furniture/edit/${furniture._id}" class="btn btn-info"
            >Edit</a
          >
          <a href="/01.Furniture/delete/${furniture._id}" class="btn btn-red" "
            >Delete</a
          >
        </div>
      </div>
    </div>
  `;
};

export async function detailsView(ctx, next) {
  let id = ctx.params.id;

  let response = await fetch(`${url}/${id}`);
  let data = await response.json();

  render(detailsTemplate(data), rootEl);
}
