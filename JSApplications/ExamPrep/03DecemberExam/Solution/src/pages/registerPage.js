import page from '../../node_modules/page/page.mjs';
import {
  html,
  render,
  reparentNodes,
} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../authentication/register.js';
import { updateNav } from '../nav/updateNav.js';

let mainEl = document.querySelector('main');

let registerTemplate = (registerFunc) => html`
  <!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="login-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit" @click="${registerFunc}">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

export async function registerPage() {
  render(registerTemplate(registerFunc), mainEl);
  updateNav();
}

async function registerFunc(e) {
  e.preventDefault();
  let emailEl = document.getElementById('register-email');
  let passEl = document.getElementById('register-password');
  let rePassEl = document.getElementById('repeat-password');
  let email = emailEl.value;
  let pass = passEl.value;
  let rePass = rePassEl.value;

  if (email === '' || pass === '' || rePass === '') {
    alert('All fields must be filled');
    return;
  }

  if (pass !== rePass) {
    alert('Passwords do not match');
    return;
  }

  try {
    await register(email, pass);
    page.redirect('/');
  } catch (err) {
    alert(err.message);
  }
}
