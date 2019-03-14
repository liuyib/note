var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function (req, res) {
  // 从 req.query 获取查询参数
  // 如果是 post 传来的数据，那么查询参数在 req.body 里面。但是 express 默认不处理 body 里的信息
  // 需要引入中间件 https://github.com/expressjs/body-parser
  var q = req.query.q;

  // 调用utility.md5 方法，得到 md5 值
  var md5Value = '';

  if (q) {
    md5Value = utility.md5(q);
  } else {
    md5Value = 'no query param';
  }

  res.send(md5Value);
});

app.listen(4000, function (req, res) {
  console.log('app is listen at port 4000');
})