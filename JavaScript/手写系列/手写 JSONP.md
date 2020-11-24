- [手写 JSONP](#手写-jsonp)
  - [初识 JSONP](#初识-jsonp)
  - [封装 JSONP](#封装-jsonp)

# 手写 JSONP

JSONP 是解决浏览器跨域问题的一种方案，虽然现在已很少使用，但是由于其兼容性好，在一些比较老的项目中仍可能会使用。因此，有必要学习其原理。

## 初识 JSONP

为了演示效果，我们利用 Express 框架搭建一个简易的 Web 服务器：

```js
const express = require('express');
const app = express();

app.get('/jsonp', function (req, res) {
  const { data, callback } = req.query;

  // data 是前端传给后端的数据
  console.log('data', data);

  // 后端通过字符串，将数据传给前端
  res.send(`${callback}('hello world')`);
  res.end();
});
```

前端使用 JSONP 跨域：

```html
<script>
  window.show = function (res) {
    console.log('window.show -> res', res);
  };
</script>
<script src="http://localhost:5500/jsonp?data=123&callback=show"></script>
```

> 为了便于讲述原理，这里只给出了最简单的 JSONP 用法。

其原理就是：将数据放入 URL 的查询参数中（`data=123`），然后将回调函数名称（`callback=show`）传给后端，后端将**回调函数名称**和**响应数据**拼接成字符串，返回给前端。最后，前端解析接收到的数据，回调函数得以执行。

## 封装 JSONP

为了便于使用，我们利用 `Promise` 封装一个 JSONP 函数，来实现下面的使用方式：

```js
jsonp({
  url: 'http://localhost:8080/jsonp',
  params: { name: '文一', age: '22' }
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

封装代码如下：

```js
function jsonp({ url, params }) {
  return new Promise((resolve, reject) => {
    const arr = [];

    // 将数据拼接成 URL 查询参数
    for (const key in params) {
      const value = params[key];
      arr.push(`${key}=${value}`);
    }

    const callback = `jsonp_${Date.now()}`;
    const script = document.createElement('script');
    script.src = `${url}?${arr.join('&')}&callback=${callback}`;

    // 回调函数的名称不重要，主要用于触发 resolve 或 reject 逻辑
    window[callback] = (res) => {
      delete window[callback];
      document.body.removeChild(script);

      if (res) {
        resolve(res);
      } else {
        reject('没有接收到参数');
      }
    };

    // 发送请求
    document.body.appendChild(script);
  });
}
```

进一步的，需要处理跨域请求失败时的情况：

```diff
function jsonp({ url, params }) {
  return new Promise((resolve, reject) => {
    const callback = `jsonp_${Date.now()}`;
    const arr = [];

    // 将数据拼接成 URL 查询参数
    for (const key in params) {
      const value = params[key];
      arr.push(`${key}=${value}`);
    }

    const _url = `${url}?${arr.join("&")}&callback=${callback}`;
    const script = document.createElement("script");
    script.src = _url;

    // 回调函数的名称不重要，主要用于触发 resolve 或 reject 逻辑
    window[callback] = (res) => {
      delete window[callback];
      document.body.removeChild(script);

      if (res) {
        resolve(res);
      } else {
        reject("没有接收到参数");
      }
    };

+   script.addEventListener('error', () => {
+     delete window[callback];
+     document.body.removeChild(script);
+
+     reject('JSONP 跨域请求失败');
+   }, false);

    // 发送请求
    document.body.appendChild(script);
  });
}
```
