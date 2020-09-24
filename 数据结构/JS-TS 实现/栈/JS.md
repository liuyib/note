## 使用 ES5 构造函数来创建栈

```js
// 通过构造函数来创建栈
function Stack() {
  this.items = [];
}

// 添加元素
Stack.prototype.push = function () {
  Array.prototype.slice.apply(arguments).forEach((item) => {
    this.items.push(item);
  });
};

// 删除栈顶元素
Stack.prototype.pop = function () {
  return this.isEmpty() ? undefined : this.items.pop();
};

// 返回栈顶元素
Stack.prototype.getTop = function () {
  return this.isEmpty() ? undefined : this.items[this.items.length - 1];
};

// 判断栈是否为空
Stack.prototype.isEmpty = function () {
  return this.items.length === 0;
};

// 清空栈中的所有元素
Stack.prototype.clear = function () {
  this.items.length = 0;
};

// 返回栈中的元素个数
Stack.prototype.size = function () {
  return this.items.length;
};

// 打印栈中的所有元素
Stack.prototype.print = function () {
  console.log(`-${this.items.toString()}-`);
};

var s = new Stack();

s.print(); // => --
console.log(s.isEmpty()); // => true

s.push(...[3, 1, 5, 2]);
s.print(); // => -3,1,5,2-
console.log(s.getTop()); // => 2
console.log(s.size()); // => 4

s.pop();
s.print(); // => -3,1,5-

s.clear();
s.print(); // => --
```

## 使用 ES6 class 创建栈

> 这种方法实现的类中的属性并不是私有的

```js
class Stack {
  constructor() {
    this.items = []; // 这个属性可以通过实例随意访问，不是私有的
  }

  push(...elems) {
    this.items.push(...elems);
  }

  pop() {
    return this.isEmpty() ? undefined : this.items.pop();
  }

  getTop() {
    return this.isEmpty() ? undefined : this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items.length = 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(`-${this.items.toString()}-`);
  }
}

var s = new Stack();

s.print(); // => --
console.log(s.isEmpty()); // => true

s.push(...[3, 1, 5, 2]);
s.print(); // => -3,1,5,2-
console.log(s.getTop()); // => 2
console.log(s.size()); // => 4

s.pop();
s.print(); // => -3,1,5-

s.clear();
s.print(); // => --
```

## 实现数据的私有化

- **用 ES6 限定作用域 Symbol 实现**

```js
// 要访问 _items 只需把所有的 this.items 换成 this[_items]
var _items = Symbol();

class Stack {
  constructor() {
    this[_items] = [];
  }

  push(...elems) {
    this[_items].push(...elems);
  }

  pop() {
    return this.isEmpty() ? undefined : this[_items].pop();
  }

  getTop() {
    return this.isEmpty() ? undefined : this[_items][this[_items].length - 1];
  }

  isEmpty() {
    return this[_items].length === 0;
  }

  clear() {
    this[_items].length = 0;
  }

  size() {
    return this[_items].length;
  }

  print() {
    console.log(`-${this[_items].toString()}-`);
  }
}

var s = new Stack();

s.print(); // => --
console.log(s.isEmpty()); // => true

s.push(...[3, 1, 5, 2]);
s.print(); // => -3,1,5,2-
console.log(s.getTop()); // => 2
console.log(s.size()); // => 4

s.pop();
s.print(); // => -3,1,5-

s.clear();
s.print(); // => --
```

实际上这种方法创建的是一个假的私有属性。ES6 中新增的 `Object.getOwnPropertySymbols` 方法能够获取到类里面声明的所有 `Symbol` 属性，这样就能破坏通过 `Symbol` 构造出来的私有属性。

例如：

```js
var symbol = Object.getOwnPropertySymbols(s);
console.log(symbol.length); // => 1
console.log(symbol); // => [Symbol()]
console.log(symbol[0]); // => Symbol()
s[symbol[0]].push(9);
s.print(); // => 3,1,5,6,9
```

- **用 ES6 限定作用域 WeakMap 实现**

```js
let Stack = (() => {
  const items = new WeakMap();

  class Stack {
    constructor() {
      items.set(this, []);
    }

    push(...elems) {
      items.get(this).push(...elems);
    }

    pop() {
      return this.isEmpty() ? undefined : items.get(this).pop();
    }

    getTop() {
      return this.isEmpty()
        ? undefined
        : items.get(this)[items.get(this).length - 1];
    }

    isEmpty() {
      return items.get(this).length === 0;
    }

    clear() {
      // items.set(this, []);
      items.get(this).length = 0;
    }

    size() {
      return items.get(this).length;
    }

    print() {
      console.log(`-${items.get(this).toString()}-`);
    }
  }

  return Stack;
})();

let s = new Stack();

s.print(); // => --
console.log(s.isEmpty()); // => true
console.log(s.getTop()); // => undefined
console.log(s.pop()); // => undefined
console.log(s.size()); // => 0

s.push(...[3, 1, 5, 2]);
s.print(); // => -3,1,5,2-
console.log(s.getTop()); // => 2
console.log(s.size()); // => 4

s.pop();
s.print(); // => -3,1,5-

s.clear();
s.print(); // => --

// 无法直接访问私有属性
console.log(s.items); // => undefined
```

## 实际应用

- [十进制转任意进制](./栈的实际应用/十进制转任意进制.js)
- [平衡括号](./栈的实际应用/平衡括号.js)
