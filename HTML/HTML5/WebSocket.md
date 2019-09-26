# WebSocket

在 H5 WebSocket 出现之前，为了实现消息推送，最常用的方式有三种：**轮询**、**长轮询**、**iframe 流**。它们的优缺点以及适用场景如下：

- 轮询：客户端定时向服务器发送 Ajax 请求，服务器接到请求后马上返回响应信息并关闭连接。

  优点：后端程序编写比较容易。
  缺点：请求大半是无用的、浪费带宽和服务器资源。
  实例：适于小型应用。

- 长轮询：客户端向服务器发送 Ajax 请求，服务器接到请求后 hold 住连接，直到有新消息或超时才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求。

  优点：在无消息的情况下不会频繁的请求。
  缺点：服务器 hold 连接会消耗资源。
  实例：WebQQ、Hi 网页版、Facebook IM。

- iframe 流：在页面里嵌入一个隐蔵 iframe，将这个隐蔵 iframe 的 src 属性设为对一个长连接的请求，服务器端就能源源不断地往客户端输入数据。

  优点：消息即时到达、不发无用请求。
  缺点：服务器维护一个长连接会增加开销、无法准确知道连接状态。
  实例：Gmail 聊天。

- WebSocket：客户端通过 `new WebSocket()` 发起通信连接，之后不论客户端还是服务端，均可向对方发送报文。

  优点：双向通信实时性强、可发送二进制文件、较少的控制开销。
  缺点：浏览器兼容较差、不支持断开重连。
  实例：网络游戏、支付。

## WebSocket 基本用法

首先在前台创建一个 WebSocket 实例。

`index.html`

``` html
<script>
  var ws = new WebSocket('ws://localhost:9999');

  // onopen 在客户端和服务端建立连接后触发
  ws.onopen = function() {
    ws.send('你好，服务端');
  };

  // onmessage 在服务端给客户端发来消息时触发
  ws.onmessage = function(res) {
    var data = res.data;

    console.log(res); // 打印 MessageEvent 对象
    console.log('服务端发来的消息：', data);
  };
</script>
```

然后，后台接收和向前台发送消息。后台创建 WebSocket 服务之前，需要安装 ws 包：

``` bash
npm install ws -S
```

找个目录，新建 server.js 编写后台服务代码：

``` js
var express = require('express');
var app = express();

app.use(express.static(__dirname));
// 监听 3000 端口
app.listen(3000);

// 创建 WebScoket 服务
var Server = require('ws').Server;
// 设置服务器端口号
var ws = new Server({ port: 9999 });

// 监听客户端和服务端的连接
ws.on('connection', function(socket) {
  // 客户端发来消息
  socket.on('message', function(msg) {
    console.log('客户端发来的消息：', msg);
    socket.send('服务端返回的消息：', "你好，客户端");
  });
});
```

在 `server.js` 文件的目录下执行指令：`node ./server.js`，然后将客户端 `index.html` 在浏览器里运行，打开控制台即可看见效果。

---

参考文章：

- [Web 实时推送技术的总结](https://juejin.im/post/5c20e5766fb9a049b13e387b)
- [WebSocket是时候展现你优秀的一面了](https://juejin.im/post/5bc7f6b96fb9a05d3447eef8)
