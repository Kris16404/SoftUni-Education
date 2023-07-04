import { detailsView } from './showMovieDetails.js';

export function checkIfLogged() {
  const sessionToken = sessionStorage.getItem('token');
  const sessionEmail = sessionStorage.getItem('email');

  if (!sessionToken) {
    document.querySelectorAll('.user').forEach((el) => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.guest').forEach((el) => {
      el.style.display = 'block';
    });
    return false;
  } else {
    document.querySelectorAll('.guest').forEach((el) => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.user').forEach((el) => {
      el.style.display = 'block';
    });
    document.querySelector(
      '#welcome-msg'
    ).textContent = `Welcome, ${sessionEmail}`;
    return true;
  }
}

export function createMovieContent(data) {
  let movieUlEl = document.querySelector('#movies-list');
  Array.from(movieUlEl.children).forEach((el) => el.remove());
  let token = sessionStorage.getItem('token');
  let isLogged = true;
  if (!token) {
    isLogged = false;
  }
  for (const key in data) {
    let movieOwnerId = data[key]._ownerId;
    let title = data[key].title;
    let description = data[key].description;
    let img = data[key].img;
    let id = data[key]._id;

    let liEl = document.createElement('li');
    liEl.classList.add('card', 'mb-4');
    liEl.innerHTML = `
    <img class="card-img-top" src="${img}" alt="Card image cap" width="400">
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <a href="#">
        <button id="${id}" type="button" class="btn btn-info">Details</button>
      </a>
    </div>
    <div class="card-footer"></div>`;

    let detailBtnEl = liEl.querySelector('button');
    detailBtnEl.addEventListener('click', detailsFunc);
    if (!isLogged) {
      detailBtnEl.disabled = true;
    }
    movieUlEl.appendChild(liEl);
  }
}

function detailsFunc(e) {
  e.preventDefault();
  let id = e.target.id;
  detailsView(id);
}
