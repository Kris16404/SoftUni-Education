import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../nav/updateNav.js';

let mainEl = document.querySelector('main');
let url = 'http://localhost:3030/data/albums';
let albumId = '';

let editAlbumTemplate = (album, editFunc) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form class="edit-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
          .value="${album.singer}"
        />
        <input
          type="text"
          name="album"
          id="album-album"
          placeholder="Album"
          .value="${album.album}"
        />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
          .value="${album.imageUrl}"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
          .value="${album.release}"
        />
        <input
          type="text"
          name="label"
          id="album-label"
          placeholder="Label"
          .value="${album.label}"
        />
        <input
          type="text"
          name="sales"
          id="album-sales"
          placeholder="Sales"
          .value="${album.sales}"
        />

        <button type="submit" @click="${editFunc}">post</button>
      </form>
    </div>
  </section>
`;

export async function editAlbumPage(ctx, next) {
  albumId = ctx.params.id;
  let response = await fetch(`${url}/${albumId}`);
  let data = await response.json();

  if (!response.ok) {
    alert('something went wrong when accesong album');
    return;
  }
  render(editAlbumTemplate(data, editFunc), mainEl);
  updateNav();
}

async function editFunc(e) {
  e.preventDefault();
  const sessionToken = sessionStorage.getItem('sessionToken');
  const ownerId = sessionStorage.getItem('ownerId');

  let singerEl = document.getElementById('album-singer');
  let albumEl = document.getElementById('album-album');
  let imageUrlEl = document.getElementById('album-img');
  let releaseEl = document.getElementById('album-release');
  let labelEl = document.getElementById('album-label');
  let salesEl = document.getElementById('album-sales');

  let singer = singerEl.value;
  let album = albumEl.value;
  let imageUrl = imageUrlEl.value;
  let release = releaseEl.value;
  let label = labelEl.value;
  let sales = salesEl.value;

  if (
    singer === '' ||
    album === '' ||
    imageUrl === '' ||
    release === '' ||
    label === '' ||
    sales === ''
  ) {
    alert('all field must be filled');
    return;
  }

  let response = await fetch(`${url}/${albumId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': sessionToken,
    },
    body: JSON.stringify({
      _ownerId: ownerId,
      singer: singer,
      album: album,
      imageUrl: imageUrl,
      release: release,
      label: label,
      sales: sales,
    }),
  });

  if (!response.ok) {
    alert('someting went wrong when editing album');
    return;
  }

  page.redirect(`/details/${albumId}`);
}
