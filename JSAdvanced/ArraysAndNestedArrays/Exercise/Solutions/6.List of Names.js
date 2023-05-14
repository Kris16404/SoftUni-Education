// CHECK THE LECTURE FOR FULL SOLUTION. 
// DONE!

function listOfNames(arr) {
    let sortedArr = arr.sort((a, b) => a.localeCompare(b));
    for (let i = 1; i <= sortedArr.length; i++) {
        const element = sortedArr[i - 1];
        console.log(`${i}.${element}`);

    }
}

listOfNames(["John", "Bob", "Christina", "Ema"]);
// 1.Bob
// 2.Christina
// 3.Ema
// 4.John