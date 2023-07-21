import page from '../node_modules/page/page.mjs';
import { homePage } from './pages/homePage.js';
import { loginPage } from './pages/loginPage.js';
import { dashboardPage } from './pages/dashboardPage.js';
import { registerPage } from './pages/registerPage.js';
import { detailsPage } from './pages/detailsPage.js';
import { editAlbumPage } from './pages/editAlbumPage.js';
import { addAlbumPage } from './pages/addAlbumPage.js';
import { deleteFunc } from './deleteFunc.js';
import { updateNav } from './nav/updateNav.js';

const url = 'http://localhost:3030/users/logout';

export async function logout() {
  let sessionToken = sessionStorage.getItem('sessionToken');

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': sessionToken,
    },
  });

  if (response.status === 204) {
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('ownerId');
    page.redirect('/');
  } else {
    alert('something went wrong with logout');
    return;
  }
}

document.getElementById('logout').addEventListener('click', logout);
updateNav();
page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/details/:id', detailsPage);
page('/edit/:id', editAlbumPage);
page('/addAlbum', addAlbumPage);
page('/delete/:id', deleteFunc);

page.start();
