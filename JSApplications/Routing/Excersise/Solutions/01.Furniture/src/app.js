import page from '../../node_modules/page/page.mjs';

import { deleteFunc } from './deleteFunc.js';
import { updateNav } from './updateNav.js';
import { catalogView } from './views/catalogView.js';
import { createFurnitureView } from './views/createFurnitureView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { loginView } from './views/loginView.js';
import { myPublicationsView } from './views/myFurnitureView.js';

import { registerView } from './views/registerView.js';

const url = 'http://localhost:3030/users/logout';

export async function logout() {
  let accessToken = sessionStorage.getItem('accesToken');
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': accessToken,
    },
  });

  if (response.status !== 204) {
    alert('Something went wrong');
    return;
  }

  sessionStorage.removeItem('accesToken');
  sessionStorage.removeItem('ownerId');

  page.redirect('/01.Furniture/');
}
document.getElementById('logoutBtn').addEventListener('click', logout);

updateNav('/01.Furniture/');
page('/01.Furniture/', catalogView);
page('/01.Furniture/details/:id', detailsView);
page('/01.Furniture/login', loginView);
page('/01.Furniture/register', registerView);
page('/01.Furniture/create', createFurnitureView);
page('/01.Furniture/edit/:id', editView);
page('/01.Furniture/delete/:id', deleteFunc);
page('/01.Furniture/myFurniture', myPublicationsView);
page.start();
