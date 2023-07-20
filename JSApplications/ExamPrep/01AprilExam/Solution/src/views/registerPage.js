import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../authentication/register.js';
import page from '../../node_modules/page/page.mjs';

let rootEl = document.querySelector('main');
let registerTemplate = (onSubmit) => html`
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

export async function registerPage() {
  render(registerTemplate(onSubmit), rootEl);
}

async function onSubmit(e) {
  e.preventDefault();

  let emailEl = document.getElementById('register-email');
  let passEl = document.getElementById('register-password');
  let rePassEl = document.getElementById('repeat-password');
  let email = emailEl.value;
  let pass = passEl.value;
  let rePass = rePassEl.value;

  if (email === '' || pass === '' || rePass === '') {
    alert('Email, Password and Repeat are required');
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
