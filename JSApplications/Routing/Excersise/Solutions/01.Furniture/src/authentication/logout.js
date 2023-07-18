const url = 'http://localhost:3030/users/logout';

export async function logout(ctx, next) {
  let accessToken = sessionStorage.getItem('accesToken');
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': accessToken,
    },
  });

  if (response.status !== 204) {
    alert('Something went wrong');
    return;
  }

  sessionStorage.removeItem('accesToken');
  sessionStorage.removeItem('ownerId');
}
