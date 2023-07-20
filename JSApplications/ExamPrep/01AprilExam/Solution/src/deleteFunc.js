import page from '../node_modules/page/page.mjs';

const url = 'http://localhost:3030/data/fruits';

export async function deleteFunc(cxt, next) {
  let fruitId = cxt.params.id;
  let sessionToken = sessionStorage.getItem('sessionToken');
  if (window.confirm('are you sure you want to delete this fruit')) {
    let responnse = await fetch(`${url}/${fruitId}`, {
      method: 'DELETE',
      headers: {
        'X-Authorization': sessionToken,
      },
    });

    page.redirect('/dashboard');
  }
}
