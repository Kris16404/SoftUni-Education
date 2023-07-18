export function updateNav() {
  const userView = document.querySelector('#user');
  const guestView = document.querySelector('#guest');
  let sessionToken = sessionStorage.getItem('accesToken');

  if (sessionToken) {
    userView.style.display = 'inline';
    guestView.style.display = 'none';
  } else {
    userView.style.display = 'none';
    guestView.style.display = 'inline';
  }
}
