var commands = ['add', 'add', 'add', 'add', 'remove'];
function addOrRemoveElements(commands) {
    var result = [];
    for (var i = 1; i < commands.length + 1; i++) {
        var command = commands[i - 1];
        if (command === 'add') {
            result.push(i);
        }
        else if (command === 'remove' && result.length != 0) {
            result.splice(result.length - 1, 1);
        }
    }
    if (result.length === 0) {
        result.push(404);
    }
    console.log(result.join('-'));
}
addOrRemoveElements(commands);
