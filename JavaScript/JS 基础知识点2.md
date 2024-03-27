- [JavaScript 基础 2](#javascript-基础-2)
  - [new](#new)
  - [call、apply 和 bind 的区别](#callapply-和-bind-的区别)
  - [上下文 和 执行上下文](#上下文-和-执行上下文)
  - [继承](#继承)
  - [节流和防抖](#节流和防抖)
    - [防抖的应用场景](#防抖的应用场景)
    - [节流的应用场景](#节流的应用场景)
  - [模块化](#模块化)
  - [Promise](#promise)
  - [Generator](#generator)
  - [async/await](#asyncawait)
    - [实现并发请求](#实现并发请求)
    - [并发数量控制](#并发数量控制)
  - [Map、FlapMap 和 Reduce](#mapflapmap-和-reduce)
  - [Proxy](#proxy)
  - [为什么 `0.1 + 0.2 != 0.3`](#为什么-01--02--03)
  - [正则表达式](#正则表达式)

# JavaScript 基础 2

> - 这部分的知识总结，大部分来源于对掘金小册 [《前端面试之道》](https://juejin.im/book/5bdc715fe51d454e755f75ef) 的学习。
> - 文中提到的：实现一个 xxx，表示实现其原理，并不代表将其功能完全实现。

涉及的知识点参考了下图中的 JS 部分：

![interview_map](https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190727161531.png)

## new

// TODO

## call、apply 和 bind 的区别

// TODO

## 上下文 和 执行上下文

> 上下文始终是 this 的值
> 执行上下文是不同于上下文的另一个概念

[https://github.com/mqyqingfeng/Blog/issues/4](https://github.com/mqyqingfeng/Blog/issues/4)

## 继承

// TODO

## 节流和防抖

节流（throttle）：事件持续触发的时候，每 n 秒执行一次函数

```js
function throttle(fn, timeout) {
  let timer = null;

  return function (...args) {
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, timeout);
  };
}
```

防抖（debounce）：事件持续触发结束后，等待 n 秒才执行函数

```js
function debounce(fn, timeout) {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, timeout);
  };
}
```

参考资料：

- [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
- [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

### 防抖的应用场景

- 每次 `resize` 触发的事件
- 文本输入验证（连续输入文字后发送 Ajax 验证请求，验证一次就好了）
- 监听页面滚动事件，只让事件执行一次（`scroll`）

### 节流的应用场景

- DOM 元素的拖拽功能实现（`mousemove`）
- 射击游戏的 `mousedown / keydown` 事件（单位时间内只能发射一颗子弹）
- 计算鼠标移动距离（`mousemove`）
- Canvas 模拟画板功能（`mousemove`）
- 搜索联想功能（`keyup`）
- 监听页面滚动事件，让事件以固定时间间隔执行（`scroll`）

## 模块化

// TODO

## Promise

// TODO

## Generator

// TODO

## async/await

在 ES8 引入，是 Generator 和 Promise 的语法糖。

底层实现如下，举例：

```js
async function log() {}

async function print() {
  return await log();
}
```

会被 Babel 编译成（[在线尝试](https://babeljs.io/repl#?browsers=chrome%3E%3D54&build=&builtIns=usage&corejs=3.21&spec=false&loose=false&code_lz=IYZwngdgxgBAZgV2gFwJYHsIwDboOYAUAlDAN4C-AUJaJLIihlgA4BOqEyxZlAkKwFNkCVlmAB3YKmQ58xANyVyQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=env&prettier=true&targets=&version=7.21.3&externalPlugins=&assumptions=%7B%7D)）：

```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;

    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }

      _next(undefined);
    });
  };
}

function log() {
  return _log.apply(this, arguments);
}

function _log() {
  _log = _asyncToGenerator(function* () {});
  return _log.apply(this, arguments);
}

function print() {
  return _print.apply(this, arguments);
}

function _print() {
  _print = _asyncToGenerator(function* () {
    return yield log();
  });
  return _print.apply(this, arguments);
}
```

由此可见，编译后：一个 `await` 对应一个 `yield`，没什么特别。主要是 `async`，只要函数被 `async` 修饰，整个函数体就会被包裹到一个特殊的函数中，这个特殊的函数形如（不准确，只是方便理解）下面的格式：

```js
new Promise(function (resolve, reject) {
  function* () {
    // 函数体的所有代码在这
  }
})
```

### 实现并发请求

请求组装到数组中，然后根据业务具体情况使用 `Promise.all` / `Promise.allSettled` / `Promise.race` 来并发执行数组中的请求。

### 并发数量控制

实现“错误重试、并发控制”，代码如下：[控制最大并发量、错误重试.js](../模仿面试/封装%20request%20专题/控制最大并发量、错误重试.js)。

## Map、FlapMap 和 Reduce

// TODO

## Proxy

// TODO

## 为什么 `0.1 + 0.2 != 0.3`

// TODO

## 正则表达式

[正则表达式](https://github.com/liuyib/study-note/tree/master/JavaScript/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
