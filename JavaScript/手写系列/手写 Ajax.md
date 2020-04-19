# 手写 Ajax

## 初识 XMLHttpRequest

要发送一个 Ajax 请求，需要经过四个步骤：**初始化、连接、发送、接收**。

使用举例如下，使用 `XMLHttpRequest` 对象：

```js
// 1. 初始化
var xhr = new XMLHttpRequest();

// 2. 连接
xhr.open('GET', url, true);

// 3. 发送
xhr.send('hello world');

// 4. 接收
xhr.onreadystatechange = function (e) {
  var status = xhr.status;

  if (xhr.readyState == 4) {
    if ((status >= 200 && status < 300) || status == 304) {
      fnSucc(xhr.responseText);
    } else {
      fnFail(xhr);
    }
  }
};
```

如果需要兼容 IE 和低版本的 Edge，需要改造如下代码：

```js
// 初始化
var xhr = null;

if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
```

下文的代码示例中，不考虑兼容 IE。

## 封装代码

上面的代码段是可以复用的，因此我们用函数将其封装起来，并提供一些可配置的参数：

```js
var ajax = function (method, url, body, fnSucc, fnFail) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.send(body);
  xhr.onreadystatechange = function (e) {
    var status = xhr.status;

    if (xhr.readyState == 4) {
      if ((status >= 200 && status < 300) || status == 304) {
        fnSucc(xhr.response);
      } else {
        fnFail(xhr);
      }
    }
  };
};
```

使用如下：

```js
ajax(
  'GET',
  '/api.json',
  '',
  // 成功回调
  function (res) {
    console.log('res', res);
  },
  // 失败回调
  function (e) {
    console.log('e', e);
  }
);
```

## 改进参数

上面封装的函数中，我们很难知道每个参数的含义（需要借助**编辑器+函数注释** 或 **查看源码**），因此下面是对参数的改进：

```js
var ajax = function (options) {
  var method = options.method;
  var url = options.url;
  var body = options.body;
  var fnSucc = options.fnSucc;
  var fnFail = options.fnFail;

  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.send(body);
  xhr.onreadystatechange = function (e) {
    var status = xhr.status;

    if (xhr.readyState == 4) {
      if ((status >= 200 && status < 300) || status == 304) {
        fnSucc(xhr.response);
      } else {
        fnFail(xhr);
      }
    }
  };
};
```

使用如下：

```js
ajax({
  method: 'GET',
  url: '/api.json',
  body: '',
  fnSucc: function (res) {
    console.log('res', res);
  },
  fnFail: function (e) {
    console.log('e', e);
  },
});
```

## 添加请求头

```diff
var ajax = function (options) {
  var method = options.method;
  var url = options.url;
  var body = options.body;
+ var headers = options.headers;
  var fnSucc = options.fnSucc;
  var fnFail = options.fnFail;

  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

+ for (var key in headers) {
+   var value = headers[key];
+   xhr.setRequestHeader(key, value);
+ }

  xhr.send(body);
  xhr.onreadystatechange = function (e) {
    var status = xhr.status;

    if (xhr.readyState == 4) {
      if ((status >= 200 && status < 300) || status == 304) {
        fnSucc(xhr.response);
      } else {
        fnFail(xhr);
      }
    }
  };
};
```

使用如下：

```js
ajax({
  method: 'GET',
  url: '/api.json',
  body: '',
  headers: {
    'Content-Type': 'multipart/form-data;',
  },
  fnSucc: function (res) {
    console.log('res', res);
  },
  fnFail: function (e) {
    console.log('e', e);
  },
});
```

## 使用 ES6 简化代码

```js
var ajax = function ({ method, url, body, headers, fnSucc, fnFail }) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

  for (var key in headers) {
    var value = headers[key];
    xhr.setRequestHeader(key, value);
  }

  xhr.send(body);
  xhr.onreadystatechange = function (e) {
    var status = xhr.status;

    if (xhr.readyState == 4) {
      if ((status >= 200 && status < 300) || status == 304) {
        fnSucc(xhr.response);
      } else {
        fnFail(xhr);
      }
    }
  };
};
```

## 使用 Promise

```js
var ajax = function ({ method, url, body, headers }) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    for (var key in headers) {
      var value = headers[key];
      xhr.setRequestHeader(key, value);
    }

    xhr.send(body);
    xhr.onreadystatechange = function (e) {
      var status = xhr.status;

      if (xhr.readyState == 4) {
        if ((status >= 200 && status < 300) || status == 304) {
          resolve(xhr.response);
        } else {
          reject(xhr);
        }
      }
    };
  });
};
```

使用如下：

```js
ajax({ method: 'GET', url: '/api.json' })
  .then((res) => {
    console.log('res', res);
  })
  .catch((e) => {
    console.log('e', e);
  });
```

使用了 `Promise` 后，就不用将回调函数放入参数，直接使用 `Promise` 的链式语法 `then`、`catch` 即可。

## 本文总结

以上代码在健壮性、兼容性、易用性等方面，还存在着很大的问题，不能用于生产环境，仅供学习参考使用。在正式的生产环境中，还是得用现有的 Ajax 库，例如：axios。
