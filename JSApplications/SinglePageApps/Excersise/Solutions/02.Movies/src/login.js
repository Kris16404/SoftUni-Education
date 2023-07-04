import { homeView } from './home.js';
import { checkIfLogged } from './utils.js';

export function loginView() {
  document.querySelectorAll('.view-section').forEach((el) => {
    el.style.display = 'none';
  });
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.querySelector('#form-login').style.display = 'block';

  let loginSubmitBtnEl = document.querySelector('#form-login>form>button');

  loginSubmitBtnEl.removeEventListener('click', loginFunc);
  loginSubmitBtnEl.addEventListener('click', loginFunc);

  checkIfLogged();
}

async function loginFunc(e) {
  e.preventDefault();

  const formEl = e.target.parentElement;

  let formData = new FormData(formEl);

  const email = formData.get('email');
  const password = formData.get('password');

  if (email === '' || password === '') {
    alert('Email and password are required');
    return;
  }
  const loginUrl = 'http://localhost:3030/users/login';
  let response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    alert(response.statusText);
    return;
  }

  let data = await response.json();
  let sessionToken = data.accessToken;
  let ownerId = data._id;
  sessionStorage.setItem('token', sessionToken);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('ownerId', ownerId);

  await homeView();
}
