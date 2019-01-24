'use strict';
const fs = require('fs');

// watch 监听文件
fs.watch('target.txt', () => console.log('File Changed!'));

console.log('Now watching target.txt for changes...');