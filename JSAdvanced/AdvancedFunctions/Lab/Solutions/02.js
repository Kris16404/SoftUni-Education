function solution(num) {
    let startNum = num;
    return function numberToadd(addNum) {
        return startNum + addNum;
    }
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));
