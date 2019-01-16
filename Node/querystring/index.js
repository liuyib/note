var querystring = require("querystring");

// ----------querystring.stringify----------

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
  encodeURIComponent: null // 一个编码函数
}));


// ----------querystring.parse----------

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


// ----------querystring.escape()----------
console.log(querystring.escape('%3C%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%A0%87%E7%AD%BE%3E'));
// => %3C%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%A0%87%E7%AD%BE%3E


// ----------querystring.unescape()----------
console.log(querystring.unescape('%3C%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%A0%87%E7%AD%BE%3E'));
// => <这是一个标签>