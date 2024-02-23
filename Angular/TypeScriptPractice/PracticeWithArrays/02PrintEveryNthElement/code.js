var arr1 = [1, 2, 3, 4, 5, 6, 7];
var n = 3;
function printNElement(arr, n) {
    var resultArr = [];
    for (var i = 0; i < arr.length; i += n) {
        var element = arr[i];
        resultArr.push(element);
    }
    resultArr.forEach(function (item) { return console.log(item); });
}
printNElement(arr1, n);
