import page from '../node_modules/page/page.mjs';

const url = 'http://localhost:3030/data/albums';

export async function deleteFunc(cxt, next) {
  let albumId = cxt.params.id;
  let sessionToken = sessionStorage.getItem('sessionToken');
  if (window.confirm('are you sure you want to delete this album')) {
    let responnse = await fetch(`${url}/${albumId}`, {
      method: 'DELETE',
      headers: {
        'X-Authorization': sessionToken,
      },
    });

    page.redirect('/dashboard');
  }
}
