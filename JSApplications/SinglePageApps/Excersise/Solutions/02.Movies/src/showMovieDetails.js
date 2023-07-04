export async function detailsView(id) {
  document.querySelectorAll('.view-section').forEach((el) => {
    el.style.display = 'none';
  });

  const movieUrl = `http://localhost:3030/data/movies/${id}`;
  let isOwner = false;
  let response = await fetch(movieUrl);
  let data = await response.json();

  let movieOwnerId = data._ownerId;
  let title = data.title;
  let description = data.description;
  let img = data.img;
  document.querySelector('section>.container').parentNode.remove();
  let sessionOwnerId = sessionStorage.getItem('ownerId');
  if (movieOwnerId === sessionOwnerId) {
    isOwner = true;
  }

  let sectionEl = document.createElement('section');
  sectionEl.classList.add('view-section');

  sectionEl.innerHTML = `
  <div class="container">
  <div class="row bg-light text-dark">
    <h1 id="${movieOwnerId}">Movie title: ${title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
        ${description}
      </p>
      <a class="btn btn-danger" href="#">Delete</a>
      <a class="btn btn-warning" href="#">Edit</a>
      <a class="btn btn-primary" href="#">Like</a>
      <span class="enrolled-span"></span>
    </div>
  </div>
</div>`;

  let [delBtn, editBtn, likeBtn] = sectionEl.querySelectorAll('a');
  let likesSpan = sectionEl.querySelector('.enrolled-span');
  likesSpan.style.display = 'none';
  likeBtn.addEventListener('click', likeFunc);
  editBtn.addEventListener('clikc', editFunc);
  if (!isOwner) {
    delBtn.remove();
    editBtn.remove();
  } else {
    likeBtn.remove();
  }

  document.querySelector('#container').appendChild(sectionEl);

  async function likeFunc(e) {
    e.preventDefault();

    let likeUrl = `http://localhost:3030/data/likes /${id}`;
    let likesUrl = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`;

    let likeResponse = await fetch(likeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: id,
      }),
    });

    if (!likeResponse.ok) {
      alert(likeResponse.statusText);
      return;
    }

    likeBtn.remove();

    let getLikesForMovie = await fetch(likesUrl);
    let likesData = await getLikesForMovie.json();

    if (!getLikesForMovie.ok) {
      alert(likeResponse.statusText);
      return;
    }

    likesSpan.textContent = likesData;
  }

  async function editFunc(e) {
    e.preventDefault();
  }
}
