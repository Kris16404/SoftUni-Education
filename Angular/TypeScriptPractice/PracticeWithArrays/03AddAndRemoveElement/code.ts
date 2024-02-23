const commands: string[] = ['add', 'add', 'add', 'add', 'remove'];

function addOrRemoveElements(commands: string[]) {
  let result: number[] = [];

  for (let i = 1; i < commands.length + 1; i++) {
    const command = commands[i - 1];
    if (command === 'add') {
      result.push(i);
    } else if (command === 'remove' && result.length != 0) {
      result.splice(result.length - 1, 1);
    }
  }
  if (result.length === 0) {
    result.push(404);
  }
  console.log(result.join('-'));
}

addOrRemoveElements(commands);
