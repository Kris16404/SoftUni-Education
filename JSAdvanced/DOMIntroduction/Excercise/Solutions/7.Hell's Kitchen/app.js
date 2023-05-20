function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);
   let textAreaInput = document.querySelector("#inputs>textarea");
   let bestRestaurantOutput = document.querySelector("#bestRestaurant>p");
   let workersOutput = document.querySelector("#workers>p");

   function onClick() {
      let parsedArr = JSON.parse(textAreaInput.value);

      let restaurants = {};

      parsedArr.forEach((element) => {
         let tokens = element.split(" - ");
         let name = tokens[0];
         let workersArr = tokens[1].split(", ");
         let workers = [];

         for (let worker of workersArr) {
            let workerToken = worker.split(" ");
            let salary = Number(workerToken[1]);
            workers.push({ name: workerToken[0], salary });
         }
         if (restaurants[name]) {
            workers = workers.concat(restaurants[name].workers);
         }
         workers.sort((worker1, worker2) => worker2.salary - worker1.salary);
         let bestSalary = workers[0].salary;
         let averageSalary =
            workers.reduce((sum, worker) => sum + worker.salary, 0) /
            workers.length;

         restaurants[name] = {
            workers,
            averageSalary,
            bestSalary,
         };
      });
      let bestRestaurantSalary = 0;
      let bestRestaurant = undefined;

      for (let name in restaurants) {
         if (restaurants[name].averageSalary > bestRestaurantSalary) {
            bestRestaurant = {
               name,
               workers: restaurants[name].workers,
               bestSalary: restaurants[name].bestSalary,
               averageSalary: restaurants[name].averageSalary,
            };
            bestRestaurantSalary = restaurants[name].averageSalary;
         }
      }
      bestRestaurantOutput.textContent = `Name: ${bestRestaurant.name
         } Average Salary: ${bestRestaurant.averageSalary.toFixed(
            2
         )} Best Salary: ${bestRestaurant.bestSalary.toFixed(2)}`;
      let result = [];

      bestRestaurant.workers.forEach((worker) => {
         result.push(`Name: ${worker.name} With Salary: ${worker.salary}`);
      });
      workersOutput.textContent = result.join(" ");
   }

}