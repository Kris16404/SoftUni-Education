function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   const tableBodyElemets = document.querySelectorAll('.container tbody');
   const trCollection = tableBodyElemets[0].children;
   const searchInput = document.querySelector('#searchField');

   function onClick() {
      for (let i = 0; i < trCollection.length; i++) {
         const element = trCollection[i];
         element.className = '';
         for (let j = 0; j < element.children.length; j++) {
            const textInTd = element.children[j].textContent;
            if (textInTd.includes(searchInput.value)) {
               element.className = 'select';
               continue;

            }
         }
      }
   }
}