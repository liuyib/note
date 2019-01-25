var express = require('express');
var app = express(); // 创建一个 express 实例

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});