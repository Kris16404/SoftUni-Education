function addAndRemoveElements(arrOfCommands) {
    let result = [];

    for (let i = 1; i <= arrOfCommands.length; i++) {
        const element = arrOfCommands[i - 1];
        if (element == 'add') {
            result.push(i)
        } else if (element == 'remove' && result.length != 0) {
            result.splice(result.length - 1, 1)
        }

    }
    if (result.length == 0) {
        result.push('Empty')
    }
    console.log(result.join('\n'));
}

addAndRemoveElements(['add', 'add', 'add', 'add']);
// 1
// 2
// 3
// 4
addAndRemoveElements(['add', 'add', 'remove', 'add', 'add']);
// 1
// 4
// 5
addAndRemoveElements(['remove', 'remove', 'remove']);
// Empty