export function updateNav() {
  let user = document.querySelector('.user');
  let guest = document.querySelector('.guest');

  let sessionToken = sessionStorage.getItem('sessionToken');

  if (sessionToken) {
    user.style.display = 'inline';
    guest.style.display = 'none';
  } else {
    user.style.display = 'none';
    guest.style.display = 'inline';
  }
}
