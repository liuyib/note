# XSS 相关知识

## 什么是 XSS

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。

> XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

## XSS 攻击方式

### 反射型

> 浏览器向服务器发出请求时，XSS 代码出现在 URL 中，作为输入提交到服务器端，服务器端解析后响应，XSS 代码随响应内容一起传回浏览器，最后浏览器解析执行响应内容，XSS 代码同时也被执行。
> 这个过程像一次反射，所以称作反射型攻击。

例子：


使用 express 脚手架（express-generator）搭建一个服务器
在 views/index.ejs 页面中添加代码：

```javascript
<%- xss %> // 注意这里的写法，不是 <%= %> ，因为不能让 XSS 代码进行转义，用 = 号就会进行转义
``` 

在 routes/index.js 中添加代码：

```diff
router.get('/', function(req, res, next) {
  res.set('X-XSS-Protection', 0);
  res.render('index', {
    title: 'Express',
+   xss: req.query.xss
  });
});
```

在浏览器地址栏输入：

```javascript
// onerror 会自动触发
localhost:3000/?xss=<img src="null" onerror="alert(1)" onclick="alert(2)" />
```

在页面初始加载时，就会弹出 1，当点击未加载出的图片时，会弹出 2。从而实现了简单的 XSS 攻击。

需要注意的几个点：

- 攻击代码在 URL 中
- 服务端要解析 URL 中的查询参数，并返回给页面进行渲染
- 攻击使用的标签不限于 img，也可以是 iframe，script 等
  ```javascript
  // 加载一个页面
  localhost:3000/?xss=<iframe src="//baidu.com"></iframe>

  // 执行一个 JS 脚本
  localhost:3000/?xss=<script>document.body.innerHTML='you are attacked';</script>
  ```

> 这种方法谷歌会检测出来并阻止掉整个页面，火狐可以直接生效

### 存储型

> 这种攻击方式与反射型的差别在于，存储型的攻击代码会储存在服务端（数据库、内存、文件中等），下次请求页面不用再次提交 XSS 代码

例子：
在 routes/index.js 中添加代码：

```diff
router.get('/', function(req, res, next) {
  res.set('X-XSS-Protection', 0);
  res.render('index', {
    title: 'Express',
+   xss: (sql语句等，或其他代码)
  });
});
```

### 区别

反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

## XSS 攻击的注入点

- HTML 节点内容

  ```diff
  <div>
    ...
  +   文本中带有JS代码<script>alert(1);</script>
    ...
  </div>
  ```

- HTML 属性

  ```html
  <!-- 例一 -->
  <a href="javascript:alert('这是XSS脚本');">XSS</a>

  <!-- 例二 -->
  <img src="null" onerror="alert('XSS脚本');" />
  这里 src 属性的值是 null" onerror="alert('XSS脚本'); 其中包含的特殊字符改变了双引号的边界，从而被注入了 XSS 脚本
  ```

- JavaScript 代码

  ```js
  var data = ""; // 变量初始值
        ↓
  var data = "hello";alert('这是XSS脚本');""; // 获取数据后的值

  // 这里获取到的数据为 hello";alert('这是XSS脚本');" 其中包含的特殊符号改变了字符串的边界，从而被注入了 XSS 脚本
  ```

- 富文本

  > 由于富文本编辑器是通过添加 HTML 标签和属性来实现的，所以如果用户输入的信息中包含一些恶意脚本代码，那么这些恶意脚本代码也会被执行。

## XSS 攻击的防御措施

> 防御大致思路：将用户输入的数据进行编码（转义），然后使用的时候进行解码，解码的同时进行过滤，把危险的几种标签（script、style、link、iframe、frame、img）、所有 JS 事件进行过滤。

### 转义

- **对 HTML 代码进行转义**

一般会对下面的字符进行转义：

字符|实体编号|实体名称
:---:|:---:|:---
`<`|`&#60;`|`&lt;`
`>`|`&#62;`|`&gt;`
`'`|`&#39;`|`&apos;`(IE不支持)
`"`|`&#34;`|`&quot;`
`&`|`&#38;`|`&amp;`
空格|`&#160;`|`&nbsp;`

示例代码：

```js
function escapeHtml(str) {
  if (!str) return '';

  // 首先对 & 符号进行转义（转义后的字符也带有 &，这样可以防止重复转义）
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/'/g, '&#39;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/\s/g, '&#160;'); // 空白字符
  str = str.replace(/\n/g, '<br>');

  return str;
}
```

- **对 JS 代码进行转义**

如果数据中存在某些特殊符号，就会使得 JS 中的字符边界改变，从而产生新的 JS 语句，这些新的 JS 语句可以是任意的恶意脚本。

例如：

```js
// 有一个数据
var data = "";

// 当从服务端获取数据后 data 的值为
data = "hello";alert(1);"";

// 也就是说从服务端接收的数据为
hello";alert(1);"

// 这个数据改变了字符串的边界，并产生了另外的一些 JS 语句
```

转义的方法：

将 `'`，`"`，`\` 等进行转义

```js
function escapeJS(str) {
  if (!str) return '';

  str = str.replace(/\\/, '\\\\');
  str = str.replace(/"/, '\\&quot;');
  str = str.replace(/'/, '\\&#39;');

  return str;
}
```

上面的转义方法比较麻烦，而且可能会漏掉某些特殊字符，这里使用 `JSON.stringify` 进行转义最保险：

```js
JSON.stringify(str)
```

### 校正

将转义后的数据反转义得到字符串，使用 DOM Parse 转换字符串为 DOM 对象，然后将 DOM 对象中的危险标签、JS 事件等过滤。

### 过滤

- 过滤危险的标签。例如：script、style、iframe、frame、img 等
- 过滤文本中包含的 JS 事件
- **对富文本过滤**（一般在客户端进行）

  > 过滤富文本相对来说比较复杂。由于富文本的实现原理是通过添加 html 标签和 css 属性，所以并不能直接将所有的标签和属性全过滤掉。有两种可选的方法：
  > 
  > - 黑名单过滤
  >   过滤危险的标签、属性、方法、以及一些特殊的代码（javascript:alert(1);）等
  > 
  > - 白名单过滤
  >   只保留安全的标签和属性

  过滤富文本时，需要解析 HTML，这里推荐使用第三方库 [cheerio](https://github.com/cheeriojs/cheerio) 来解析 HTML。使用 cheerio 解析 HTML 之后，会返回一个类似 DOM 的对象，这个对象上具有类似 JQuery 的 API。可以使用这些 API 来操作被解析的 HTML，并且也可以进行 XSS 过滤操作。

  借助 cheerio 进行 XSS 过滤的示例代码：

  ```js
  
  ```

XSS 过滤的第三方库推荐：[js-xss](https://github.com/leizongmin/js-xss)

> 第三方库过滤 XSS 适用于快速开发。如果业务要求对每一种情况进行精确控制，那么还是需要自己手写过滤代码。

## 浏览器自带 XSS 防御

> 关于浏览器自带的 XSS 防御，这里只是提一下。因为浏览器自带的 XSS 防御很有限，它只能防御反射型的 XSS 攻击。并且如果反射型的 XSS 代码被注入到 JS 中，那么浏览器并不会进行防御。
