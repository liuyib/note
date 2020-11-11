// 暴力搜索
function brute(text, pattern) {
  let i = 0;
  let j = 0;

  while (i < text.length && j < pattern.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    } else {
      i = i - j + 1;
      j = 0;
    }
  }

  if (j === pattern.length) {
    return i - j;
  }

  return -1;
}

module.exports = brute;
