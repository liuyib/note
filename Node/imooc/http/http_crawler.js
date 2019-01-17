// 爬取网页所有源码

var http = require('http');
var url = 'http://www.imooc.com/learn/348/';

http.get(url, function (res) {
  var html = '';

  // 监听data事件
  res.on('data', function (data) {
    html += data;
  })

  // 请求结束，将所有爬取到的html打印出来
  res.on('end', function () {
    console.log(html);
  })
}).on('error', function () {
  console.log('爬取失败');
});