import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../authentication/login.js';
import page from '../../node_modules/page/page.mjs';

let rootEl = document.querySelector('main');
let loginTemplate = (onSubmit) => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit" @click="${onSubmit}">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`;

export async function loginPage() {
  render(loginTemplate(onSubmit), rootEl);
}

async function onSubmit(e) {
  e.preventDefault();
  let emailEl = document.getElementById('email');
  let passEl = document.getElementById('password');
  let email = emailEl.value;
  let pass = passEl.value;

  if (email === '' || pass === '') {
    alert('Email and Password are required');
    return;
  }

  try {
    await login(email, pass);
    page.redirect('/');
  } catch (err) {
    alert(err.message);
    return;
  }
}
