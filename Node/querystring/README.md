node API - querystring 学习
当前 node 版本：v10.15.0

---

##### 引入模块

```javascript
var querystring = require('querystring');
```

##### querystring.stringify(obj[, sep[, eq[, options]]])

> 将查询字符对象序列化

- @param obj
- @param sep 查询字符串键值对的分隔符
- @param eq 查询字符串键与值之间的分隔符
- @param options 
  - encodeURIComponent 编码查询字符串使用的函数。默认为querystring.escape()

```javascript
var urlQueryObj = {
  name: 'liuyibo',
  hobby: ['football', 'code'],
  age: 20
};
console.log(querystring.stringify(urlQueryObj));
// => name=liuyibo&hobby=football&hobby=code&age=20

console.log(querystring.stringify(urlQueryObj, ','));
// => name=liuyibo,hobby=football,hobby=code,age=20

console.log(querystring.stringify(urlQueryObj, ',', ':'));
// => name:liuyibo,hobby:football,hobby:code,age:20

console.log(querystring.stringify(urlQueryObj, null, null, {
  encodeURIComponent: xxx // 一个编码函数
}));
```

##### querystring.parse(str[, sep[, eq[, options]]])

> 将序列化的查询字符反序列化

- @param str
- @param sep
- @param eq
- @param options
  - decodeURIComponent 解码查询字符串使用的函数。默认为querystring.unescape()
  - maxKeys 要解析的查询字符串的数量。默认为1000，设置为0则解除限制

```javascript
console.log(querystring.parse('name=liuyibo&hobby=football&hobby=code&age=20'));
// => { name: 'liuyibo', hobby: [ 'football', 'code' ], age: '20' }

console.log(querystring.parse('name=liuyibo,hobby=football,hobby=code,age=20', ','));
// => { name: 'liuyibo', hobby: [ 'football', 'code' ], age: '20' }

console.log(querystring.parse('name:liuyibo,hobby:football,hobby:code,age:20', ',', ':'));
// => { name: 'liuyibo', hobby: [ 'football', 'code' ], age: '20' }

console.log(querystring.parse('name=%E5%88%98%E4%B8%80%E5%8D%9A', null, null, {
  decodeURIComponent: null, // 一个解码函数
  maxKeys: 0 // 解除最大能解析的查询字符串的数目限制
}));
```

##### querystring.escape(str)

> 将查询字符串编码

默认被querystring.stringify()调用

```javascript
console.log(querystring.escape('%3C%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%A0%87%E7%AD%BE%3E'));
// => %3C%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%A0%87%E7%AD%BE%3E
```

##### querystring.unescape(str)

> 将查询字符串解码

默认被querystring.parse()调用

```javascript
console.log(querystring.unescape('%3C%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%A0%87%E7%AD%BE%3E'));
// => <这是一个标签>
```