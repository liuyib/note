var querystring = require("querystring");

console.log(querystring.stringify({name: '刘一博'}));

console.log(querystring.parse('name=%E5%88%98%E4%B8%80%E5%8D%9A', null, null, {
  decodeURIComponent: null, // 一个解码函数
  maxKeys: 0
}));