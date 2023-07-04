import { homeView } from './home.js';
import { loginView } from './login.js';
import { logout } from './logout.js';
import { registerView } from './register.js';

document.querySelectorAll('.view-section').forEach((el) => {
  el.style.display = 'none';
});

document.querySelector('.navbar').addEventListener('click', navFunc);

function navFunc(e) {
  e.preventDefault();
  if (!(e.target.tagName === 'A')) {
    return;
  }

  if (e.target.text === 'Login') {
    loginView();
  } else if (e.target.text === 'Register') {
    registerView();
  } else if (e.target.text === 'Movies') {
    homeView();
  } else if (e.target.text === 'Logout') {
    logout();
  }
}

homeView();
