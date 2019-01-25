##### hello world

使用的库 / 框架：

- express

在浏览器输出 hello world

代码：

```node
var express = require('express');
var app = express(); // 创建一个 express 实例

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(3000, function() {
  console.log('app is listening at port 3000');
});
```