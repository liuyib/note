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

    // 获取栈顶元素
    getTop() {
      return items.get(this)[items.get(this).length - 1];
    }

    // 判断是否为空
    isEmpty() {
      return items.get(this).length === 0;
    }
  }

  return Stack;
})();

// 平衡括号
// 算法思路：
// 1、设置一个标记变量 flag，用来标记匹配结果和控制循环。1 表示正确匹配，0 表示错误匹配
// 2、扫描表达式，依次读入字符 ch，如果表达式没有扫描完毕并且 flag 非零，则执行以下循环：
//   若 ch 是 ( 或 [ ，则将其入栈
//   若 ch 是 ) 或 ] ，则根据栈顶元素的值分情况考虑：
//     如果栈非空并且栈顶元素是 ( 或 [ 则正确匹配，栈顶元素出栈；否则错误匹配，flag 置为 0
// 3、退出循环后，如果栈为空并且 flag 值为 1，则匹配成功，返回 true，否则，返回 false
function balanceBracket(str) {
  if (!str) return; // 没有收到参数或参数为空字符串
  
  let s = new Stack();
  let flag = true;     // 匹配结果（true：正确匹配，false：错误匹配）
  str = str.replace(/\s/mg, ''); // 去除空白字符
  
  for (let i = 0; i < str.length; i++) {
    let _item = str[i];
    let lefts = ['(', '[', '{'];
    let brackets = {
      ')': '(',
      ']': '[',
      '}': '{'
    };
    
    if (lefts.includes(_item)) { // 这个条件等价于 _item === '(' || _item === '[' || _item === '{'
      s.push(_item);             // 左边的括号入栈
      continue;
    }
    
    if (brackets.hasOwnProperty(_item)) { // 这个条件等价于 _item === ')' || _item === ']' || _item === '}'
      if (!s.isEmpty() && s.getTop() === brackets[_item])  {
        s.pop();      // 括号匹配成功，左边的括号出栈
      } else {
        flag = false; // 错误匹配
      }
      continue;
    }
  }

  return s.isEmpty() && flag;
}

console.log(balanceBracket('[(1 + 3) + (2 + 4)]')); // true
console.log(balanceBracket('(1 + 3 + (2 + 4)'));    // false
