#! /usr/bin/env node

var echo = require('../lib/echo');
var argv = process.argv[2]; // 命令中的第二个参数

console.log(echo(argv));