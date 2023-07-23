import page from '../node_modules/page/page.mjs';
import { logout } from './authentication/logout.js';
import { createOfferPage } from './pages/createOffer.js';
import { dashboardPage } from './pages/dashboardPage.js';
import { detailsPage } from './pages/detailsPage.js';
import { editOfferPage } from './pages/editOfferPage.js';
import { homePage } from './pages/homePage.js';
import { loginPage } from './pages/loginPage.js';
import { registerPage } from './pages/registerPage.js';

document.getElementById('logout').addEventListener('click', logout);

page('/index.html', '/');

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/details/:id', detailsPage);
page('/edit/:id', editOfferPage);
page('/create', createOfferPage);

page.start();
