function rotateArray(arr, amountOfRotation) {
    for (let i = 0; i < amountOfRotation; i++) {
        let removedFirstElement = arr.pop()
        arr.unshift(removedFirstElement);
    }

    console.log(arr.join(' '));
}

rotateArray(['1', '2', '3', '4'], 2);
// 3 4 1 2
rotateArray(['Banana', 'Orange', 'Coconut', 'Apple'], 15);
// Orange Coconut Apple Banana