import page from '../node_modules/page/page.mjs';
import { logout } from './authentication/logout.js';
import { deleteFunc } from './deleteFunc.js';
import { addFruitPage } from './views/addFruitPage.js';
import { dashboardPage } from './views/dashboardPage.js';
import { detailsPage } from './views/detailsPage.js';
import { editPage } from './views/editPage.js';
import { homePage } from './views/homePage.js';
import { loginPage } from './views/loginPage.js';
import { registerPage } from './views/registerPage.js';
import { search } from './views/searchPage.js';

document.getElementById('logout').addEventListener('click', logout);

page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/details/:id', detailsPage);
page('/addFruit', addFruitPage);
page('/edit/:id', editPage);
page('/delete/:id', deleteFunc);
page('/search', search);

page.start();
