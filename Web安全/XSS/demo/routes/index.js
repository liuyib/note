var express = require('express');
var router = express.Router();

// 构造一个假数据
var comments = {};

/**
 * 对字符串进行编码
 * @param {String} str  要编码的字符串
 */
function html_encode(str) {
  if (!str) return '';

  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/\'/g, '&apos;');
  str = str.replace(/\"/g, '&quot;');
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/\s/g, '&nbsp;'); // 空白字符
  str = str.replace(/\n/g, '<br>');

  return str;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/comment', function (req, res, next) {
  comments.v = html_encode(req.query.comment);
});

router.get('/getComment', function (req, res, next) {
  res.json({
    comment: comments.v
  });
});

module.exports = router;
