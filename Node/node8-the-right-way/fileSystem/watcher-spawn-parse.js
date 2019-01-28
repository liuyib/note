'use strict';

const fs = require('fs');
var spawn = require("child_process").spawn;
const filename = process.argv[2];

if (!filename) {
  throw Error('A file to watch must be specified!');
}

fs.watch(filename, () => {
  const ls = spawn('ls', ['-l', filename], {
    shell: true
  });
  let output = '';

  ls.stdout.on('data', chunk => output += chunk);
  ls.on('close', () => {
    const parts = output.split(/\s+/);
    console.log(parts);
    console.log([parts[0], parts[4], parts[8]]);
  })
});

console.log(`Now watching ${filename} for changes...`);