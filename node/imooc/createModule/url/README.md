node API - url 学习
当前node版本：v10.15.0

---

<img src="./url_all.png" />

---

一个完整的url示例：

```node
url.format({
  protocol: 'https:',
  slashes: true,
  auth: 'liuyibo:123456',
  host: 'www.imooc.com:8000',
  port: '8000',
  hostname: 'www.imooc.com',
  hash: '#test',
  search: '?q=123',
  query: 'q=123',
  pathname: '/u/6286176/courses',
  path: '/u/6286176/courses?q=123',
  href: 'https://www.imooc.com:8000/u/6286176/courses?q=123#test'
});
// => 'https://liuyibo:123456@www.imooc.com:8000/u/6286176/courses?q=123#test'
```

---

使用旧的 API 解析URL：

```node
var url = require('url');
var myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```

使用 WHATWG 的 API 解析 URL 字符串：

```node
var myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```

---

##### url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

> 将URL字符串解析为对象

- @param [string] urlString
- @param [boolean] parseQueryString 是否将查询参数格式化为对象 // true: 将查询参数格式化为对象，false: 格式化为字符串。默认为false
- @param [boolean] slashesDenoteHost 双斜杠//后面 和 单斜杠/前面的字符表示host // true: 解析host，false：不解析（host为null）。默认为false

```node
url.parse('https://www.imooc.com/courses');
// Url {
//  protocol: 'https:',
//  slashes: true,
//  auth: null,
//  host: 'www.imooc.com',
//  port: null,
//  hostname: 'www.imooc.com',
//  hash: null,
//  search: null,
//  query: null,
//  pathname: '/courses',
//  path: '/courses',
//  href: 'https://www.imooc.com/courses' 
// }

url.parse('https://www.imooc.com/courses?q=123&b=321', true);
//  Url {
//    protocol: 'https:',
//    slashes: true,
//    auth: null,
//    host: 'www.imooc.com',
//    port: null,
//    hostname: 'www.imooc.com',
//    hash: null,
//    search: '?q=123&b=321',
//*   query: [Object: null prototype] { q: '123', b: '321' },
//    pathname: '/courses/',
//    path: '/courses/?q=123&b=321',
//    href: 'https://www.imooc.com/courses/?q=123&b=321'
//  }

url.parse('//www.imooc.com/courses', false, false)
//  Url {
//    protocol: null,
//*   slashes: true,
//    auth: null,
//*   host: 'www.imooc.com',
//    port: null,
//    hostname: 'www.imooc.com',
//    hash: null,
//    search: null,
//    query: null,
//    pathname: '/courses',
//    path: '/courses',
//    href: '//www.imooc.com/courses'
//  }

url.parse('//www.imooc.com/courses', false, true)
//  Url {
//    protocol: null,
//*   slashes: null,
//    auth: null,
//*   host: null,
//    port: null,
//    hostname: null,
//    hash: null,
//    search: null,
//    query: null,
//    pathname: '//www.imooc.com/courses',
//    path: '//www.imooc.com/courses',
//    href: '//www.imooc.com/courses'
//  }
```

> auth 属性如果存在，但不能被解析，会报错

---

##### url.format(urlObject)

> 将数据格式化为url

- @param [object | string] urlObject  // 如果传入的参数是字符串，会先使用 url.parse() 方法转化为 url 对象

```node
url.format({
  protocol: 'https',
  host: 'example.com',
  hostname: 'example.com',
  pathname: '/some/path',
  query: {
    page: 1,
    format: 'json'
  }
});
// => 'https://example.com/some/path?page=1&format=json'
```

> 如果slashes为true，结果会自动加上 // （注：有协议的时候，slashes默认为true）

---

##### url.resolve(from, to)

> resolve a target URL relative to a base URL 

- @param from // base URL
- @param to   // target URL


```node
url.resolve('https://liuyibo.top', 'test');  // https://liuyibo.top/test
url.resolve('https://liuyibo.top/', 'test');  // https://liuyibo.top/test
url.resolve('https://liuyibo.top/', '/test');  // https://liuyibo.top/test
```