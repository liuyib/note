var url = require('url');

var urlParse = url.parse('https://www.imooc.com/courses?q=123&b=321', true);

console.log(urlParse);