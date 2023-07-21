import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../nav/updateNav.js';

let mainEl = document.querySelector('main');
let url = 'http://localhost:3030/data/albums';

let addAlbumTemplate = (addAlbumFunc) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form class="create-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
        />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
        />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit" @click="${addAlbumFunc}">post</button>
      </form>
    </div>
  </section>
`;

export async function addAlbumPage() {
  render(addAlbumTemplate(addAlbumFunc), mainEl);
  updateNav();
}

async function addAlbumFunc(e) {
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

  let response = await fetch(url, {
    method: 'POST',
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
    alert('something went wrong');
    return;
  }

  singerEl.value = '';
  albumEl = '';
  imageUrlEl = '';
  releaseEl = '';
  labelEl = '';
  salesEl = '';

  page.redirect('/');
}
