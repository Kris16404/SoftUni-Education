import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { register } from '../authentication/register.js';

const mainEl = document.querySelector('main');

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

export function registerPage() {
  render(registerTemplate(registerFunc), mainEl);
}

async function registerFunc(e) {
  e.preventDefault();

  let emailEl = document.getElementById('register-email');
  let passEl = document.getElementById('register-password');
  let rePassEl = document.getElementById('repeat-password');

  const email = emailEl.value;
  const pass = passEl.value;
  const rePass = rePassEl.value;

  if (email === '' || pass === '' || rePass === '') {
    alert('all fields must be filled');
    return;
  }

  if (pass !== rePass) {
    alert('passwords do not match');
    return;
  }

  try {
    register(email, pass);
    page.redirect('/');
  } catch (err) {
    alert(err.message);
    return;
  }
}
