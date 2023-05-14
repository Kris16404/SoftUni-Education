// CHECK THE LECTURE FOR REDUCE SOLUTION

function extractInvreasingSubsetFromArray(arr) {
    let result = [];
    let maxNum = Number.MIN_SAFE_INTEGER;

    // for (let i = 0; i < arr.length; i++) {
    //     const element = arr[i];
    //     if (element >= maxNum) {
    //         result.push(element);
    //         maxNum = element;
    //     }

    // }

    arr.reduce((acc, curr) => {
        if (curr >= maxNum) {
            result.push(curr);
            maxNum = curr;
            return curr
        }
        return acc;
    }, []);

    // console.log(result);
    return result;
}

extractInvreasingSubsetFromArray([1, 3, 8, 4, 10, 12, 3, 2, 24]);
// [1, 3, 8, 10, 12, 24]
extractInvreasingSubsetFromArray([1, 2, 3, 4]);
// [1, 2, 3, 4]
extractInvreasingSubsetFromArray([20, 3, 2, 15, 6, 1]);
// [20]