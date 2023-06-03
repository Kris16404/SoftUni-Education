class Circle {
    constructor(rad) {
        this.radius = rad;
    }

    get diameter() {
        return this.diameter = this.radius * 2;
    }

    set diameter(input) {
        this.radius = input / 2;
    }

    get area() {
        return this.area = Math.PI * Math.pow(this.radius, 2);
    }

    set area(newArea) {
        this.diameter = newArea / Math.PI;
    }
}

let c = new Circle(2);
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
c.diameter = 1.6;
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
