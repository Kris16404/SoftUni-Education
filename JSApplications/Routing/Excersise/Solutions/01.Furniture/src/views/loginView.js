import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import page from '../../../node_modules/page/page.mjs';
import { login } from '../authentication/login.js';

const rootEl = document.querySelector('.container');

let loginTemplate = html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <input
          type="submit"
          class="btn btn-primary"
          value="Login"
          @click="${loginFunc}"
        />
      </div>
    </div>
  </form>
`;

export async function loginView(ctx, next) {
  render(loginTemplate, rootEl);
}

async function loginFunc(e) {
  e.preventDefault();
  const emailEl = document.querySelector('#email');
  const passwordEl = document.querySelector('#password');
  const email = emailEl.value;
  const pass = passwordEl.value;

  if (!email || !pass) {
    alert('Email and Password are required');
    return;
  }

  let isOk = await login(email, pass);
  if (isOk) {
    alert(isOk);
    return;
  }

  page.redirect('/01.Furniture/');
}
