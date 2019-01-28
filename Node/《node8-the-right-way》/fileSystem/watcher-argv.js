const fs = require('fs');
const filename = process.argv[2]; // process.argv[2] 指的是命令行中输入的第三个命令

if (!filename) {
  throw Error('A file to watch must be specified');
}

fs.watch(filename, () => console.log(`File ${filename} changed`));
console.log(`Now watching ${filename} for changes`);