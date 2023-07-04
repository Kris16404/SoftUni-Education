import { loginView } from './login.js';

export async function logout() {
  const logoutUrl = 'http://localhost:3030/users/logout';
  const sessionToken = sessionStorage.getItem('token');

  let response = await fetch(logoutUrl, {
    method: 'POST',
    headers: {
      'X-Authorization': sessionToken,
    },
  });

  if (response.status !== 204) {
    alert(response.statusText);
    return;
  }

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('email');

  loginView();
}
