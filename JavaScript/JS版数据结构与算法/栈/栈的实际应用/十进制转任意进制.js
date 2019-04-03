let Stack = (() => {
  const items = new WeakMap();

  class Stack {
    constructor () {
      items.set(this, []);
    }

    // 添加元素
    push(...elems) {
      items.get(this).push(...elems);
    }

    // 删除栈顶元素
    pop() {
      return items.get(this).pop();
    }

    // 判断是否为空
    isEmpty() {
      return items.get(this).length === 0;
    }
  }

  return Stack;
})();

// 十进制转任意进制
// 算法思路：
// 用十进制数除以要转换的进制，将余数依次进栈
// 直到商为 0 为止，然后将栈中的数据依次出栈，就得到了结果
let baseConverter = (decNumber, base) => {
  let s = new Stack();             // 余数栈
  let rem,                         // 余数
      result = '',                 // 结果
      digits = '0123456789ABCDEF'; // 允许转换的范围 2~16 进制

  while (decNumber > 0) {
    rem = decNumber % base;
    s.push(rem);
    decNumber = Math.floor(decNumber / base);
  }

  while (!s.isEmpty()) {
    result += digits[s.pop()];
  }

  return result;
}

console.log(baseConverter(100, 2));  // => 1100100
console.log(baseConverter(100, 4));  // => 1210
console.log(baseConverter(100, 8));  // => 144
console.log(baseConverter(100, 16)); // => 64
console.log(baseConverter(100, 32)); // => 34
