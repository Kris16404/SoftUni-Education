const arr1: number[] = [1, 2, 3, 4, 5, 6, 7];
const n: number = 3;

function printNElement<T>(arr: Array<T>, n: number) {
  let resultArr: Array<T> = [];
  for (let i = 0; i < arr.length; i += n) {
    const element = arr[i];
    resultArr.push(element);
  }

  resultArr.forEach((item) => console.log(item));
}

printNElement(arr1, n);
