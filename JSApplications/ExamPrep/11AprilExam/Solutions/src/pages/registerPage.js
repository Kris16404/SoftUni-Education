import {
  html,
  render,
  reparentNodes,
} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../authentication/login.js';
import page from '../../node_modules/page/page.mjs';
import { register } from '../authentication/register.js';
const mainEl = document.querySelector('main');

const regiterTemplate = (onSubmit) => html`
  <!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form">
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
        <button type="submit" @click="${onSubmit}">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

export function registerPage() {
  render(regiterTemplate(onSubmit), mainEl);
}

async function onSubmit(e) {
  e.preventDefault();

  let emailEl = document.getElementById('register-email');
  let passEl = document.getElementById('register-password');
  let rePassEl = document.getElementById('repeat-password');

  const email = emailEl.value;
  const pass = passEl.value;
  const rePass = rePassEl.value;

  if (email === '' || pass === '' || rePass === '') {
    alert('All fields are required');
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
    return;
  }
}
