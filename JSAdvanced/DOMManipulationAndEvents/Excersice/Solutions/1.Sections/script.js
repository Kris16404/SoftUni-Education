function create(words) {
   let resultElement = document.getElementById('content');

   function showElement(e) {
      const target = e.target;
      target.firstChild.style.display = '';
      // const child = target.querySelector('p');
      // child.style.display = '';
   }

   for (let i = 0; i < words.length; i++) {
      const element = words[i];

      const newDivElement = document.createElement('div');
      const newParagraphElement = document.createElement('p');

      newParagraphElement.textContent = element;
      newParagraphElement.style.display = 'none';
      newDivElement.appendChild(newParagraphElement);
      newDivElement.addEventListener('click', showElement);
      resultElement.appendChild(newDivElement);
   }

}