function search() {
   let townsUlElement = document.getElementById('towns').children;
   let filterElement = document.getElementById('searchText').value;
   let elementForMatches = document.getElementById('result')
   let arrOfTowns = Array.from(townsUlElement);
   let regex = new RegExp(filterElement, 'g');
   let indexesOfMatchedTowns = [];
   let countedMatches = 0;

   for (let i = 0; i < arrOfTowns.length; i++) {
      const element = arrOfTowns[i].textContent;
      if (element.match(regex) !== null) {
         indexesOfMatchedTowns.push(i);
         countedMatches++;
      }
      let currentLiElement = townsUlElement[i];
      currentLiElement.style.textDecoration = '';
      currentLiElement.style.fontWeight = '';
   }

   for (let i = 0; i < indexesOfMatchedTowns.length; i++) {
      const index = indexesOfMatchedTowns[i];
      let currentLiElement = townsUlElement[index];
      currentLiElement.style.textDecoration = 'underline';
      currentLiElement.style.fontWeight = 'bold';
   }

   elementForMatches.textContent = `${countedMatches} matches found`
}
