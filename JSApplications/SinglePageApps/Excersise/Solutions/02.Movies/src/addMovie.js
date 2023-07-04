export async function addMovieView() {
  document.querySelectorAll('.view-section').forEach((el) => {
    el.style.display = 'none';
  });

  document.querySelector('#add-movie').style.display = 'block';

  let submitBtnEl = document.querySelector('#add-movie>form>button');

  submitBtnEl.removeEventListener('click', addMovieFunc);
  submitBtnEl.addEventListener('click', addMovieFunc);
}

async function addMovieFunc(e) {
  e.preventDefault();

  let formEl = document.querySelector('#add-movie-form');
  let formData = new FormData(formEl);
  let title = formData.get('title');
  let description = formData.get('description');
  let image = formData.get('img');

  if (title === '' || description === '' || image === '') {
    return;
  }

  let token = sessionStorage.getItem('token');
  let ownerId = sessionStorage.getItem('ownerId');

  const createUrl = 'http://localhost:3030/data/movies';
  const templateObj = {
    _ownerId: ownerId,
    title: title,
    description: description,
    img: image,
  };

  let response = await fetch(createUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(templateObj),
  });
}
