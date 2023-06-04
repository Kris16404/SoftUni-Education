class Company {
    constructor() {
        this.departments = {};
    }

    addEmployee(...params) {
        params.forEach(function (element) {
            if (element === '' || element === undefined || element === null) {
                throw Error('Invalid input!');
            }
        });

        let [name, salary, position, deapartment] = params;
        salary = Number(salary);

        if (salary < 0 || isNaN(salary)) {
            throw Error('Invalid input!');
        }

        let employee = {
            name: name,
            salary: salary,
            position: position
        }

        if (!Array.isArray(this.departments[deapartment])) {
            this.departments[deapartment] = [];
            this.departments[deapartment].push(employee);
        } else {
            this.departments[deapartment].push(employee);
        }


        return `New employee is hired. Name: ${employee.name}. Position: ${employee.position}`
    }

    bestDepartment() {
        let highestAvgSalary = 0;
        let highestDepartmentBySalery = '';
        for (const key in this.departments) {
            const arrOfEmployees = this.departments[key];
            let currentDepartmentSalary = arrOfEmployees.reduce(function (acc, curr) {
                acc += Number(curr.salary);
                return acc;
            }, 0)
            let averageDepartmentSalary = (currentDepartmentSalary / arrOfEmployees.length).toFixed(2);

            if (highestAvgSalary < averageDepartmentSalary) {
                highestAvgSalary = averageDepartmentSalary;
                highestDepartmentBySalery = key;
            }
        }

        function compare(a, b) {
            if (b.salary > a.salary) {
                return 1;
            }
            if (b.salary < a.salary) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
        }

        let sortedEmployees = this.departments[highestDepartmentBySalery];
        sortedEmployees.sort(compare);

        let arrToPrint = [];
        for (let i = 0; i < sortedEmployees.length; i++) {
            const employee = sortedEmployees[i];
            arrToPrint.push(`${employee.name} ${employee.salary} ${employee.position}`)
        }

        return `Best Department is: ${highestDepartmentBySalery}\nAverage salary: ${highestAvgSalary}\n${arrToPrint.join('\n')}`
    }
}

let c = new Company();
let actual1 = c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
console.log(actual1);
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
let act = c.bestDepartment();
console.log(act);

