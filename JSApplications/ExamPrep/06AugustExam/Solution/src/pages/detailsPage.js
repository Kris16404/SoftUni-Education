import page from '../../node_modules/page/page.mjs';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const mainEl = document.querySelector('main');
const detailsUrl = 'http://localhost:3030/data/offers';
const detailsApplicationsUrl =
  'http://localhost:3030/data/applications?where=offerId%3D%22';
let offerId = '';

let detailsTempalte = async (
  offer,
  applications,
  ownerId,
  onLike,
  deleteFunc
) => html`
  <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${offer.imageUrl}" alt="example1" />
      <p id="details-title">${offer.title}</p>
      <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${offer.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span>${offer.requirements}</span>
        </div>
      </div>
      <p>Applications: <strong id="applications">${applications}</strong></p>

      <div id="action-buttons">
        ${ownerId === offer._ownerId
          ? html` <!--Edit and Delete are only for creator-->
              <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
              <a
                href="javascript:void(0)"
                id="delete-btn"
                @click="${deleteFunc}"
                >Delete</a
              >`
          : ownerId
          ? html`<!--Bonus - Only for logged-in users ( not authors )-->
              <a
                href="javascript:void(0)"
                id="apply-btn"
                @click="${onLike}"
                style="display: ${(await isAppicated()) ? 'inline' : 'none'}"
                >Apply</a
              >`
          : ''}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx, next) {
  offerId = ctx.params.id;
  const ownerId = sessionStorage.getItem('ownerId');

  let offerResponse = await fetch(`${detailsUrl}/${offerId}`);
  let offerData = await offerResponse.json();

  let applicationResponse = await fetch(
    `${detailsApplicationsUrl}${offerId}%22&distinct=_ownerId&count`
  );
  let applicationData = await applicationResponse.json();

  if (!offerResponse.ok) {
    alert('something went wrong when trying to load details page');
    return;
  }
  if (!applicationResponse.ok) {
    alert('something went wrong when trying to load applications');
    return;
  }

  render(
    await detailsTempalte(
      offerData,
      applicationData,
      ownerId,
      onLike,
      deleteFunc
    ),
    mainEl
  );
}

async function isAppicated() {
  const ownerId = sessionStorage.getItem('ownerId');

  let response = await fetch(
    `http://localhost:3030/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${ownerId}%22&count`
  );
  if (!response.ok) {
    alert('something went wrong when trying to check if user applicated');
    return;
  }

  let data = await response.json();

  if (data === 1) {
    return false;
  }

  return true;
}

async function onLike(e) {
  e.preventDefault();

  const sessionToken = sessionStorage.getItem('sessionToken');

  let response = await fetch('http://localhost:3030/data/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      offerId: offerId,
    }),
  });

  if (!response.ok) {
    alert('something went wrong when trying to like');
    return;
  }

  page.redirect(`/details/${offerId}`);
}

async function deleteFunc(e) {
  e.preventDefault();
  if (!confirm('are you sure you want to delete this offer')) {
    return;
  }
  const sessionToken = sessionStorage.getItem('sessionToken');

  let response = await fetch(`${detailsUrl}/${offerId}`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': sessionToken,
    },
  });

  page.redirect('/');
}
