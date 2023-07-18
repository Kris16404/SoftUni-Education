import page from '../../node_modules/page/page.mjs';

const url = 'http://localhost:3030/data/catalog';

export async function deleteFunc(ctx, next) {
  const accesToken = sessionStorage.getItem('accesToken');
  const id = ctx.params.id;
  let isConfirmed = confirm('Are you sure you want to delete this furniture');
  if (!isConfirmed) {
    return;
  }

  let response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'X-Authorization': accesToken,
    },
  });
  if (!response.ok) {
    alert(response.statusText);
    return;
  }

  page.redirect('/01.Furniture/');
}
