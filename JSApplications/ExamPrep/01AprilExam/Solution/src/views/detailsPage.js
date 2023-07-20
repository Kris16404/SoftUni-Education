import { html, render } from '../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/data/fruits';
let rootEl = document.querySelector('main');
let fruitTemplate = (fruit, ownerId) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
      <p id="details-title">${fruit.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${fruit.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">${fruit.nutrition}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${ownerId === fruit._ownerId
          ? html`<div id="action-buttons">
              <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
              <a href="/delete/${fruit._id}" id="delete-btn">Delete</a>
            </div>`
          : ''}
      </div>
    </div>
  </section>
`;
export async function detailsPage(ctx, next) {
  let ownerId = sessionStorage.getItem('ownerId');
  let fruitId = ctx.params.id;

  let response = await fetch(`${url}/${fruitId}`);
  let data = await response.json();

  render(fruitTemplate(data, ownerId), rootEl);
}
