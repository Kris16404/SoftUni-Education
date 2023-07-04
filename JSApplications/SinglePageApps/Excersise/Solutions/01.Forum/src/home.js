export function createTopic(data) {
  let topicContainerEl = document.querySelector('.topic-container');
  for (const key in data) {
    let title = data[key].title;
    let username = data[key].username;
    let post = data[key].post;
    let id = data[key]._id;

    let topicDiv = document.createElement('div');
    topicDiv.classList.add('topic-name-wrapper');
    topicDiv.innerHTML = `
    <div class="topic-name" id="${id}">
      <a href="/comment" class="normal">
        <h2>${title}</h2>
      </a>
      <div class="columns">
        <div>
          <p>Date: <time</time></p>
          <div class="nick-name">
            <p>Username: <span>${username}</span></p>
          </div>
      </div>
    </div>`;

    topicDiv.querySelector('.normal').addEventListener('click', topicClick)
    topicContainerEl.appendChild(topicDiv);
  }
}

function topicClick(e) {
  e.preventDefault();
  console.log('topic cliced');
}