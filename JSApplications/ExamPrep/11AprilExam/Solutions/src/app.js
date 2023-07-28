import page from '../node_modules/page/page.mjs';
import { logout } from './authentication/logout.js';
import { createPage } from './pages/createEventPage.js';
import { detailsPage } from './pages/detailsPage.js';
import { editPage } from './pages/editPage.js';
import { evetsPage } from './pages/eventsPage.js';
import { homePage } from './pages/homePage.js';
import { loginPage } from './pages/loginPage.js';
import { registerPage } from './pages/registerPage.js';

document.getElementById('logout').addEventListener('click', logout);

page('index.html', '/');

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/events', evetsPage);
page('/createEvent', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

page.start();
