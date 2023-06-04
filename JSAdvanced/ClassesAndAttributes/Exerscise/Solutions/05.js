class Stringer {
    constructor(str, len) {
        this.innerString = str;
        this.innerLength = len;
        this.startingString = str;
    }

    increase(length) {
        this.innerLength += length;
        this.innerLength < 0 ? this.innerLength = 0 : this.innerLength;
        this.innerString = this.startingString.substring(0, this.innerLength)

    }

    decrease(length) {
        this.innerLength -= length;
        this.innerLength < 0 ? this.innerLength = 0 : this.innerLength;
        this.innerString = this.innerString.substring(0, this.innerLength);

        if (this.innerString === this.startingString) {
            return
        } else {
            this.innerString = this.innerString + '...'
        }

    }

    toString() {
        return this.innerString;
    }

}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test
test.decrease(3);
console.log(test.toString()); // Te...
test.decrease(5);
console.log(test.toString()); // ...
test.increase(4);
console.log(test.toString()); // Test