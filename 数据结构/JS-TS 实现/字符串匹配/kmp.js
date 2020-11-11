function calcNext(pattern) {
  var next = [-1];
  // 模式串的索引
  var i = 0;
  // next 数组中，已经匹配的最长相同真前后缀的长度
  // 初始为 -1，标识第一个字符无前后缀
  var len = -1;
  var pLen = pattern.length;

  while (i < pLen) {
    if (len === -1 || pattern[i] === pattern[len]) {
      i++;
      len++;
      next[i] = len;
    } else {
      len = next[len];
    }
  }

  return next;
}

function KMP(text, pattern) {
  var i = 0; // 主串的索引
  var j = 0; // 模式串的索引
  var tLen = text.length;
  var pLen = pattern.length;
  var next = calcNext(pattern);

  while (i < tLen && j < pLen) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    } else if (next[j] === -1) {
      i++;
    } else {
      j = next[j];
    }
  }

  if (j === pLen) {
    return i - j;
  }

  return -1;
}

module.exports = KMP;
