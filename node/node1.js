var http = require('http');

var server = http.createServer(function (req, res) {
  console.log(123);

  res.write('123');
  res.end(); // 响应结束
});

server.listen(8000);