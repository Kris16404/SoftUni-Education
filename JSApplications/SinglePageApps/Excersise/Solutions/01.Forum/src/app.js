import { createTopic } from "./home.js";

const postsUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';

document.querySelector('.public').addEventListener('click', postFunc);
document.querySelector('.cancel').addEventListener('click', cancelFunc);


async function loadTopics() {
  let response = await fetch(postsUrl);
  let data = await response.json();

  document.querySelector('.topic-container').innerHTML = '';
  createTopic(data);
}

async function postFunc(e) {
  e.preventDefault();

  let titleEl = document.querySelector('#topicName');
  let usernameEl = document.querySelector('#username');
  let postEl = document.querySelector('#postText');

  const titleValue = titleEl.value;
  const usernameValue = usernameEl.value;
  const postValue = postEl.value;

  if (titleValue === ''
    || usernameValue === ''
    || postValue === '') {
    return;
  }

  let topicTemplate = {
    title: titleValue,
    username: usernameValue,
    post: postValue
  }

  let response = await fetch(postsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topicTemplate)
  })

  titleEl.value = '';
  usernameEl.value = '';
  postEl.value = '';

  loadTopics();
}

function cancelFunc(e) {
  e.preventDefault();

  let titleEl = document.querySelector('#topicName');
  let usernameEl = document.querySelector('#username');
  let postEl = document.querySelector('#postText');

  titleEl.value = '';
  usernameEl.value = '';
  postEl.value = '';
}


loadTopics();