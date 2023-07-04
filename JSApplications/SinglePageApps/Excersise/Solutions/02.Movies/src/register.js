import { homeView } from './home.js';
import { checkIfLogged } from './utils.js';

export function registerView() {
  document.querySelectorAll('.view-section').forEach((el) => {
    el.style.display = 'none';
  });

  document.querySelector('#form-sign-up').style.display = 'block';

  let registerSubmitBtnEl = document.querySelectorAll(
    '#form-sign-up>form>button'
  );

  registerSubmitBtnEl.removeEventListener('click', registerFunc);
  registerSubmitBtnEl.addEventListener('click', registerFunc);

  checkIfLogged();
}

async function registerFunc(e) {
  e.preventDefault();
  const formEl = e.target.parentElement;

  let formData = new FormData(formEl);

  const email = formData.get('email');
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');

  if (email === '') {
    alert('Invalid email');
    return;
  } else if (password.length < 6) {
    alert('The password should be atleast 6 characters');
    return;
  } else if (password !== repeatPassword) {
    alert('Passwords must match');
    return;
  }

  const registerUrl = 'http://localhost:3030/users/register';

  let response = await fetch(registerUrl, {
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
  } else {
    let data = await response.json();
    let sessionToken = data.accessToken;
    let ownerId = data._id;

    sessionStorage.setItem('token', sessionToken);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('ownerId', ownerId);

    homeView();
  }
}
