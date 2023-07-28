import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const url = 'http://localhost:3030/data/events';
const mainEl = document.querySelector('main');
let eventId = '';

const detailsTemplate = async (event, ownerId, sessionToken) => {
  let timesParticipatedCount = await timesParticipated();
  let isParticipated = sessionToken && (await isNotPart());
  return html`
    <!-- Details page -->
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src="${event.imageUrl}" alt="example1" />
        <p id="details-title">${event.name}</p>
        <p id="details-category">
          Category: <span id="categories">${event.category}</span>
        </p>
        <p id="details-date">Date:<span id="date">${event.date}</span></p>
        <div id="info-wrapper">
          <div id="details-description">
            <span>${event.description}</span>
          </div>
        </div>

        <h3>Going: <span id="go">${timesParticipatedCount}</span> times.</h3>

        <div id="action-buttons">
          ${ownerId === event._ownerId
            ? html`<!--Edit and Delete are only for creator-->
                <a href="/edit/${event._id}" id="edit-btn">Edit</a>
                <a
                  href="javascript:void(0)"
                  id="delete-btn"
                  @click="${deleteFunc}"
                  >Delete</a
                >`
            : isParticipated
            ? html` <!--Bonus - Only for logged-in users ( not authors )-->
                <a
                  href="javascript:void(0)"
                  id="go-btn"
                  @click="${participateFunc}"
                  >Going</a
                >`
            : ''}
        </div>
      </div>
    </section>
  `;
};

export async function detailsPage(ctx, next) {
  eventId = ctx.params.id;
  const sessionToken = sessionStorage.getItem('sessionToken');
  const ownerId = sessionStorage.getItem('ownerId');

  let response = await fetch(`${url}/${eventId}`);
  let data = await response.json();

  if (!response.ok) {
    alert('something went wrong when accessing event');
    return;
  }

  render(await detailsTemplate(data, ownerId, sessionToken, isNotPart), mainEl);
}

async function timesParticipated() {
  let partResponse = await fetch(
    `http://localhost:3030/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`
  );
  let data = await partResponse.json();

  return data;
}

async function isNotPart() {
  const ownerId = sessionStorage.getItem('ownerId');

  let isPartResponse = await fetch(
    `http://localhost:3030/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${ownerId}%22&count`
  );
  let data = await isPartResponse.json();
  if (data === 1) {
    return false;
  }
  return true;
}

async function participateFunc() {
  const sessionToken = sessionStorage.getItem('sessionToken');

  let response = await fetch(`http://localhost:3030/data/going`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      eventId: eventId,
    }),
  });

  if (!response.ok) {
    alert('something went wrong when trying to participate');
    return;
  }

  page.redirect(`/details/${eventId}`);
}

async function deleteFunc(e) {
  e.preventDefault();
  const sessionToken = sessionStorage.getItem('sessionToken');

  if (confirm('are you sure you want to delete this event')) {
    let response = await fetch(`${url}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'X-Authorization': sessionToken,
      },
    });

    if (!response.ok) {
      alert('something went wrong when deleting event');
      return;
    }

    page.redirect('/events');
  }
}
