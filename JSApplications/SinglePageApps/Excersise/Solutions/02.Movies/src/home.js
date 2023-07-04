import { addMovieView } from './addMovie.js';
import { checkIfLogged, createMovieContent } from './utils.js';

export async function homeView() {
  let isLogged = checkIfLogged();

  const moviesUrl = 'http://localhost:3030/data/movies';

  let response = await fetch(moviesUrl);
  let data = await response.json();

  createMovieContent(data);

  document.querySelectorAll('.view-section').forEach((el) => {
    el.style.display = 'none';
  });

  document.querySelector('#home-page').style.display = 'block';
  if (!isLogged) {
    return;
  }

  let addMovieBtnEl = document.querySelector('.btn.btn-warning');

  addMovieBtnEl.removeEventListener('click', addMovieFunc);
  addMovieBtnEl.addEventListener('click', addMovieFunc);
}

function addMovieFunc(e) {
  e.preventDefault();
  addMovieView();
}
