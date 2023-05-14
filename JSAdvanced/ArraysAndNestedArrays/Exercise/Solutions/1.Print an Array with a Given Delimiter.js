function printArrayWithGivenDelimiter(arr, delimiter) {
    console.log(arr.join(delimiter));
}

printArrayWithGivenDelimiter(['One', 'Two', 'Three', 'Four', 'Five'], '-');
// One-Two-Three-Four-Five
printArrayWithGivenDelimiter(['How about no?', 'I', 'will', 'not', 'do', 'it!'], '_');
// How about no?_I_will_not_do_it!