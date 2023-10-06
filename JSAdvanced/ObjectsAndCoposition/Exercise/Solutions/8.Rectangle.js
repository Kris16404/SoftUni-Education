function rectangle(width, height, color) {
    let rectangleObj = {
        width: width,
        height: height,
        color: `${color[0].toUpperCase()}${color.slice(1)}`,
        calcArea: function (){
            return Number(this.width * this.height);
        }
    }

    return rectangleObj;
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());

// 4
// 5
// Red
// 20
