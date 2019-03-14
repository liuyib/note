// 向一个指定的远程主机发送请求

var https = require("https");
var querystring = require("querystring");

var postData = querystring.stringify({
  title: "This is a title",
  body: "This is a body",
});

var options = {
  hostname: "xxx.xxx.xxx",
  port: 80,
  path: "/xxx/xxx/",
  method: "POST",
  headers: {
    "xxx": "xxx",
  }
};

var req = https.request(options, function(res) {
  res.setEncoding("utf8");

  console.log("Status: " + res.statusCode); // 打印状态码
  console.log("headers: " + JSON.stringify(res.headers)); // JSON序列化请求头

  // 监听响应数据
  res.on("data", function(data) {
    console.log("body" + data);
  });

  // 响应结束
  res.on("end", function() {
    console.log("请求结束");
  });
});

req.write(postData); // 将参数写入请求
req.end();