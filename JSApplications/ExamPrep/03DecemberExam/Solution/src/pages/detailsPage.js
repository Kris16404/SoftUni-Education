import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../nav/updateNav.js';

let mainEl = document.querySelector('main');
let url = 'http://localhost:3030/data/albums';
let albumId = '';

let detailsTemplate = async function (album, likes, ownerId) {
  albumId = album._id;
  return html`
    <!-- Details page -->
    <section id="details">
      <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
          <img src="${album.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
          <p>
            <strong>Band:</strong
            ><span id="details-singer">${album.singer}</span>
          </p>
          <p>
            <strong>Album name:</strong
            ><span id="details-album">${album.album}</span>
          </p>
          <p>
            <strong>Release date:</strong
            ><span id="details-release">${album.release}</span>
          </p>
          <p>
            <strong>Label:</strong
            ><span id="details-label">${album.label}</span>
          </p>
          <p>
            <strong>Sales:</strong
            ><span id="details-sales">${album.sales}</span>
          </p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

        <div id="action-buttons">
          ${ownerId === album._ownerId
            ? html`
                <!--Edit and Delete are only for creator-->
                <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a href="/delete/${album._id}" id="delete-btn">Delete</a>
              `
            : ownerId
            ? await isLiked()
            : ''}
        </div>
      </div>
    </section>
  `;
};

export async function detailsPage(ctx, next) {
  albumId = ctx.params.id;
  let ownerId = sessionStorage.getItem('ownerId');

  let albumResponse = await fetch(`${url}/${albumId}`);
  let albumData = await albumResponse.json();

  const likesUrl = `http://localhost:3030/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`;
  let likesResponse = await fetch(likesUrl);
  let likesData = await likesResponse.json();

  if (!albumResponse.ok) {
    alert('something went wrong when accessing album');
    return;
  }
  if (!likesResponse.ok) {
    alert('something went wrong when accessing likes');
    return;
  }
  render(await detailsTemplate(albumData, likesData, ownerId), mainEl);
  updateNav();
}

async function isLiked() {
  const ownerId = sessionStorage.getItem('ownerId');
  const isLikedUrl = `http://localhost:3030/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${ownerId}%22&count`;
  let response = await fetch(isLikedUrl);
  let data = await response.json();

  if (!response.ok) {
    alert('something went wrong');
    return;
  }

  if (data === 1) {
    return;
  }
  return html`<a href="" id="like-btn" @click="${likeFunc}">Like</a>`;
}

async function likeFunc() {
  const sessionToken = sessionStorage.getItem('sessionToken');
  const addLikeUrl = 'http://localhost:3030/data/likes';
  let response = await fetch(addLikeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      albumId: albumId,
    }),
  });

  page.redirect(`/details/${albumId}`);
}
