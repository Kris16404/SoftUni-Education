class List {
    resultArr = [];
    size = 0;
    add(num) {
        let added = this.resultArr.push(Number(num));
        this.resultArr.sort((a, b) => a - b);
        this.size = this.resultArr.length;
        return added
    }

    remove(index) {
        if (index > this.resultArr.length) {
            return
        }
        let spliced = this.resultArr.splice(index, 1)
        this.resultArr.sort((a, b) => a - b);
        this.size = this.resultArr.length;
        return spliced;
    }

    get(index) {
        return this.resultArr[index];
    }
}


let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));


