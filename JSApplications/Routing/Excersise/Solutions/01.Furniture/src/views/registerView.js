import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { register } from '../authentication/register.js';
import page from '../../../node_modules/page/page.mjs';

const rootEl = document.querySelector('.container');

let registerTemplate = html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Register New User</h1>
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
        <div class="form-group">
          <label class="form-control-label" for="rePass">Repeat</label>
          <input
            class="form-control"
            id="rePass"
            type="password"
            name="rePass"
          />
        </div>
        <input
          type="submit"
          class="btn btn-primary"
          value="Register"
          @click="${registerFunc}"
        />
      </div>
    </div>
  </form>
`;

export function registerView(ctx, next) {
  render(registerTemplate, rootEl);
}

async function registerFunc(e) {
  e.preventDefault();
  const emailEl = document.querySelector('#email');
  const passwordEl = document.querySelector('#password');
  const rePasswordEl = document.querySelector('#rePass');
  const email = emailEl.value;
  const pass = passwordEl.value;
  const rePass = rePasswordEl.value;

  if (!email || !pass || !rePass) {
    alert('Email, Password and Repeat are required');
    return;
  }
  if (rePass !== pass) {
    alert('Passwords must match');
    return;
  }

  let isOk = await register(email, pass);
  if (isOk) {
    alert(isOk);
    return;
  }

  page.redirect('/01.Furniture/');
}
