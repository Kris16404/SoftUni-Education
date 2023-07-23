const url = 'http://localhost:3030/users/logout';
import page from '../../node_modules/page/page.mjs';

export async function logout() {
  let sessionToken = sessionStorage.getItem('sessionToken');

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': sessionToken,
    },
  });

  if (response.status === 204) {
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('ownerId');
    page.redirect('/');
  } else {
    let data = await response.json();
    alert(data.message);
  }
}
