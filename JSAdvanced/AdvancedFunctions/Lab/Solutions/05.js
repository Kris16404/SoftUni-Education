function solution() {
    let modifyStrign = '';
    return {
        append: function (string) {
            modifyStrign += string;
        },
        removeStart: function (num) {
            modifyStrign = modifyStrign.substring(num);
        },
        removeEnd: function (num) {
            modifyStrign = modifyStrign.substring(0, modifyStrign.length - num);
        },
        print: function () {
            console.log(modifyStrign);
        }
    }
}
let firstZeroTest = solution();
firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
