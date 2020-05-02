#! /usr/bin/env node

var echo = require('../lib/echo');
var argv = process.argv.slice(2); // 命令行中的参数

console.log(echo(argv.join(' ')));