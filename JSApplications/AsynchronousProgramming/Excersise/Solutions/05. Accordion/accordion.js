window.addEventListener('load', solution)
function solution() {
    const titlesUrl = `http://localhost:3030/jsonstore/advanced/articles/list`;
    let mainEl = document.querySelector('#main');

    fetch(titlesUrl)
        .then(response => response.json())
        .then(dataArr => {
            createTitle(dataArr);
        })

    function createTitle(arr) {
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            const id = obj._id;
            const title = obj.title;

            let accordionDivEl = document.createElement('div');
            accordionDivEl.classList.add('accordion');

            let headDivEl = document.createElement('div');
            headDivEl.classList.add('head');

            let spanEl = document.createElement('span');
            spanEl.textContent = title;

            let buttonEl = document.createElement('button');
            buttonEl.classList.add('button');
            buttonEl.id = id;
            buttonEl.textContent = 'More';
            buttonEl.addEventListener('click', moreFunc)

            let extraDivEl = document.createElement('div');
            extraDivEl.classList.add('extra');

            let textParagraph = document.createElement('p');
            textParagraph.textContent = '';

            headDivEl.appendChild(spanEl);
            headDivEl.appendChild(buttonEl);

            extraDivEl.appendChild(textParagraph);

            accordionDivEl.appendChild(headDivEl);
            accordionDivEl.appendChild(extraDivEl);

            mainEl.appendChild(accordionDivEl);
        }

        function moreFunc(e) {
            let target = e.target;
            let accordionTarget = e.target.parentElement.parentElement;
            let id = target.id;
            let textUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
            let textParagraphEl = accordionTarget.querySelector('p');
            let extraContentEl = accordionTarget.querySelector('.extra');

            if (target.textContent === 'More') {
                fetch(textUrl)
                    .then(response => response.json())
                    .then(data => {
                        const text = data.content;
                        textParagraphEl.textContent = text;
                    })

                target.textContent = 'Less';
                extraContentEl.style.display = 'block';
            } else {
                extraContentEl.style.display = 'none';
                target.textContent = 'More';
            }

        }
    }
}