class Hex {
    constructor(val) {
        this.value = val;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return `0x${this.value.toString(16).toUpperCase()}`
    }

    plus(number) {
        if (number instanceof Hex) {
            let calculatedVal = this.value + number.valueOf();
            return new Hex(calculatedVal);
        } else {
            let calculatedVal = this.value + number;
            return new Hex(calculatedVal)
        }
    }

    minus(number) {
        if (number instanceof Hex) {
            let calculatedVal = this.value - number.valueOf();
            return new Hex(calculatedVal);
        } else {
            let calculatedVal = this.value - number;
            return new Hex(calculatedVal)
        }
    }

    parse(string) {
        return parseInt(string, 16);
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() === '0xF');
console.log(FF.parse('AAA'));