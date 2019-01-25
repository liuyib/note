var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function (req, res, next) {
  // 使用 superagent 抓取 cnode 社区的内容
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }

      // sres.text 中储存了网页的 html 内容，将他传给 cheerio.load 之后
      // 就得到了一个实现 jquery 接口的变量。它和 jquery 的用法一样，我们习惯把它命名为 $
      // 就下来就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];

      $('#topic_list .topic_title').each(function (index, elem) {
        var $elem = $(elem);

        items.push({
          title: $elem.attr('title'),
          href: $elem.attr('href')
        });
      });

      res.send(items);
    });
});

app.listen(4000, function () {
  console.log('app is listening at port 4000');
});