export function updateNav() {
  let guest = document.querySelector('.guest');
  let user = document.querySelector('.user');

  let sessionToken = sessionStorage.getItem('sessionToken');

  if (sessionToken) {
    user.style.display = 'inline';
    guest.style.display = 'none';
  } else {
    user.style.display = 'none';
    guest.style.display = 'inline';
  }
}
