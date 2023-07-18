const url = 'http://localhost:3030/users/register';

export async function register(email, pass) {
  const loginObj = {
    email: email,
    password: pass,
  };

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });

  let data = await response.json();
  if (!response.ok) {
    return data.message;
  }

  let accesToken = data.accessToken;
  let ownerId = data._id;

  sessionStorage.setItem('accesToken', accesToken);
  sessionStorage.setItem('ownerId', ownerId);

  return false;
}
