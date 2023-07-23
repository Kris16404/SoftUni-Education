import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { updateNav } from '../nav/updateNav.js';

const mainEl = document.querySelector('main');

let homeTemplate = html`
  <!-- Home page -->
  <section id="home">
    <img
      src="../../images/pngkey.com-hunting-png-6697165-removebg-preview.png"
      alt="home"
    />
    <h2>Searching for a job?</h2>
    <h3>The right place for a new career start!</h3>
  </section>
`;

export function homePage() {
  render(homeTemplate, mainEl);
  updateNav();
}
