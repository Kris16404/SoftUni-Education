const url = 'http://localhost:3030/users/login';

export async function login(email, pass) {
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  });
  let data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  let accessToken = data.accessToken;
  let ownerId = data._id;

  sessionStorage.setItem('sessionToken', accessToken);
  sessionStorage.setItem('ownerId', ownerId);
}
