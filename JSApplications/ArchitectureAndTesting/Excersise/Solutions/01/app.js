async function attachEvents() {
  const messageUrl = `http://localhost:3030/jsonstore/messenger`;
  let messageAreaEl = document.querySelector('#messages');
  let submitBtnEl = document.querySelector('#submit');
  let refreshBtnEl = document.querySelector('#refresh');
  let nameInputEl = document.querySelector('[name = "author"]');
  let msgInputEl = document.querySelector('[name = "content"]');



  submitBtnEl.addEventListener('click', submitFunc)
  refreshBtnEl.addEventListener('click', refreshFunc)

  async function refreshFunc(e) {
    let messages = [];

    let response = await fetch(messageUrl);
    let data = await response.json();

    for (const key in data) {
      let author = data[key].author;
      let message = data[key].content
      messages.push(`${author}: ${message}`)
    }

    messageAreaEl.value = messages.join('\n');
  }

  async function submitFunc(e) {
    const nameValue = nameInputEl.value;
    const msgValue = msgInputEl.value;

    let msgObj = {
      author: nameValue,
      content: msgValue
    }

    await fetch(messageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msgObj)
    })
  }
}

attachEvents();