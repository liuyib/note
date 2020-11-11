const brute = require('../brute');
const kmp = require('../kmp');
const rk = require('../rabin-karp');

/**
 * 这里只测试了极端情况
 * 另外 KMP 在很多情况下，效率会退化为一般的暴力搜索。因此，要注意适用场景。
 */
const total = 10000 * 1000;
const case1 = {
  t: `${new Array(total).fill('a').join('')}bbb`,
  p: 'aaaaaaaaaaab'
};
const case2 = {
  t: `${new Array(total).fill('abcdeee').join('')}zmx`,
  p: 'eeezmx'
};
/* prettier-ignore */
const case3 = {
  t: `${new Array(total).fill(Math.ceil(Math.random() * 10)).join('')}zzzmmmxxx`,
  p: 'zzzmmmxxx'
};

const text = [case1.t, case2.t, case3.t];
const pattern = [case1.p, case2.p, case3.p];
const len = text.length;

for (let i = 0; i < len; i++) {
  console.log(`===== Test Case ${i + 1} Start: =====`);

  console.log(`Brute Start:`);
  console.time();
  const bruteFind = brute(text[i], pattern[i]);
  console.timeEnd();
  console.log(`Brute Find: `, bruteFind, '\n');

  console.log(`KMP Start:`);
  console.time();
  const kmpFind = kmp(text[i], pattern[i]);
  console.timeEnd();
  console.log(`KMP Find: `, kmpFind, '\n');

  console.log(`RabinKarp Start:`);
  console.time();
  const rkFind = rk(text[i], pattern[i]);
  console.timeEnd();
  console.log(`RabinKarp Find: `, rkFind, '\n');

  console.log(`===== Test Case ${i + 1} End  : =====\n`);
}
