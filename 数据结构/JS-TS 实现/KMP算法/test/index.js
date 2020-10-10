const brute = require('../brute');
const kmp = require('../kmp');

/**
 * 这里只测试了极端情况
 * 另外 KMP 在很多情况下，效率会退化为一般的暴力搜索。因此，要注意适用场景。
 */
const prefix = new Array(10000 * 1000).fill('a').join('');
const text = `${prefix}b`;
const pattern = 'aaaaaab';

console.time();
const kmpFind = kmp(text, pattern);
console.timeEnd();
console.log(`kmpFind: `, kmpFind);

console.time();
const bruteFind = brute(text, pattern);
console.timeEnd();
console.log(`bruteFind: `, bruteFind);
