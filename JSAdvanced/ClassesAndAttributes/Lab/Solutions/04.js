class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(p1, p2) {
        const xDiff = p1.x - p2.x;
        const yDiff = p1.y - p2.y;
        const result = Math.sqrt((Math.pow(xDiff, 2) + Math.pow(yDiff, 2)))
        return result;
    }
}

let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));
