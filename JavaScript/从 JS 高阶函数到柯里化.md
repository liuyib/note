- [从 JS 高阶函数到函数柯里化](#从-js-高阶函数到函数柯里化)
  - [函数柯里化](#函数柯里化)
  - [高阶函数实战](#高阶函数实战)

# 从 JS 高阶函数到函数柯里化

所谓高阶函数，只要满足一下条件之一即可：

- 函数作为参数
- 返回值为函数

我们平时一直在用高阶函数，只不过可能没有了解过这个概念。JS 中内置的高阶函数有很多，例如：`forEach`、`filter`、`reduce` 等等。

为了更好的理解，这里举两个例子：

1）函数作为参数

```js
function calc(a, b, fn) {
  return fn(a) + fn(b);
}

function multi(a) {
  return a * a;
}

calc(3, 4, multi); // => 25
```

2）返回值为函数

```js
function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };
}

isType('String')('liuyib'); // => true
```

## 函数柯里化

在这里介绍函数柯里化，是因为柯里化函数中运用了很多高阶函数。

**柯里化（Currying）是一种技术，用于把多个参数的函数转换为一系列使用单个参数的函数**。

柯里化函数在执行时，并不会立即求值，而是通过闭包把参数保存起来，当参数的数量可以满足函数执行时（可能是**参数为空时**，也可能是**参数全部接收后**），就开始执行函数了。

举例如下：

1）参数为空时，执行柯里化函数

场景：统计每天的销售额，到月底计算一次销售总额。

```js
// 柯里化函数
function currying(fn) {
  // 这个变量会保持在内存中（通过闭包）
  var args = [];

  return function () {
    // 不传变量的时候，执行 fn
    if (arguments.length === 0) {
      return fn(args);
    } else {
      // 传入变量时，将变量收集起来
      Array.prototype.push.apply(args, arguments);
    }
  };
}

// 实际用于计算的函数
function total(arr) {
  var sum = 0;
  arr.forEach((a) => {
    sum += a;
  });
  return sum;
}

var sellAmount = currying(total);
sellAmount(100);
sellAmount(200);
sellAmount(300);
sellAmount(); // => 600
```

2）参数全部接收后，执行柯里化函数

```js
function currying(fn, args) {
  return function () {
    // 收集上次递归传来的参数，形如 currying(fn, [1, 2, ...])
    var _args = args || [];
    // 收集 fn 的参数，形如 fn(1, 2, ...)
    Array.prototype.push.apply(_args, arguments);

    // 递归出口（收集的参数达到了指定数量）
    // fn.length 就是函数的参数个数
    if (_args.length === fn.length) {
      return fn.apply(this, _args);
    } else {
      // 把收集的参数递归向下传递
      return currying(fn, _args);
    }
  };
}

// 实际用于计算的函数
function add(a, b, c, d) {
  return a + b + c + d;
}

// 将 add 函数柯里化
var sum = currying(add);
sum(1)(2)(3)(4); // => 10
sum(1, 2)(3)(4); // => 10
sum(1, 2, 3)(4); // => 10
sum(1, 2, 3, 4); // => 10

// 或者

var sum2 = currying(add, [1]);
sum2(2)(3)(4); // => 10

var sum3 = currying(add, [1, 2]);
sum3(3)(4); // => 10

var sum4 = currying(add, [1, 2, 3]);
sum4(4); // => 10

var sum5 = currying(add, [1, 2, 3, 4]);
sum5(); // => 10
```

更近一步，就是处理含有“占位符”的情况，例如 [lodash 的柯里化函数](https://www.lodashjs.com/docs/lodash.curry)：

```js
var abc = function (a, b, c) {
  return [a, b, c];
};

var curried = _.curry(abc);

// 其中 _ 表示占位符
curried(1)(_, 3)(2); // => [1, 2, 3]
```

## 高阶函数实战

- 函数节流

  ```js
  function throttle(fn, wait) {
    var isRuning = false;

    return function () {
      if (isRuning) return;

      isRuning = true;
      fn.apply(this, arguments);

      setTimeout(function () {
        isRuning = false;
      }, wait);
    };
  }

  window.onscroll = throttle(function () {
    console.log('execute');
  }, 300);
  ```

- `...`
