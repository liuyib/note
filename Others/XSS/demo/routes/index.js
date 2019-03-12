var express = require('express');
var router = express.Router();

// 构造一个假数据
var comments = {};

/**
 * 对字符串进行编码
 * @param {String} str  要编码的字符串
 */
function html_encode(str) {
  var result = '';

  if (result.length === 0) return '';

  reslt = str.replace(/</g, '&lt;');
  reslt = str.replace(/>/g, '&gt;');
  reslt = str.replace(/\'/g, '&apos;');
  reslt = str.replace(/\"/g, '&quot;');
  reslt = str.replace(/&/g, '&amp;');
  reslt = str.replace(/\s/g, '&nbsp;'); // 空白字符
  reslt = str.replace(/\n/g, '<br>');

  return result;
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
