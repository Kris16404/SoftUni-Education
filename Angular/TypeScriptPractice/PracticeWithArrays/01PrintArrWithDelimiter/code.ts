const arr: number[] = [1, 2, 3, 3, 3, 3, 5];

function printWithDelimiter<T>(array: Array<T>, delimiter: string): void {
  console.log(array.join(delimiter));
}

printWithDelimiter(arr, 'a-');
