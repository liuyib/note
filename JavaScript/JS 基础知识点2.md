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

### 实现并发请求

请求组装到数组中，然后根据业务具体情况使用 `Promise.all` / `Promise.allSettled` / `Promise.race` 来并发执行数组中的请求。

### 并发数量控制

实现“错误重试、并发控制”，代码如下：

```js
/** 默认参数 */
const DEFAULT_OPTIONS = {
  /** 错误最大重试次数 */
  retryCount: 3,
  /** 错误重试前等待的时间 */
  retryWaitTime: 1000 * 3,
  /** 最大并发数量 */
  concurrentCount: 5,
  /** 并发过程中的回调（用于获取请求进度） */
  onProgress: () => {}
};

async function sleep(time) {
  return await new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * 重试函数包装器
 * @param {Function} fn 要重试的函数
 * @param {number} options.retryCount 错误最大重试次数
 * @param {number} options.retryWaitTime 错误重试前等待的时间
 * @returns result | errorMsg
 */
async function retryWrapper(fn, options = {}) {
  const { retryCount, retryWaitTime } = { ...DEFAULT_OPTIONS, ...options };
  let count = retryCount;

  while (count > 0) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      console.log(
        `${fn.name} 函数请求出错，将在 ${retryWaitTime} 毫秒后重试，剩余重试次数 ${count} 次`
      );
      count--;
      await sleep(retryWaitTime);
    }
  }

  const msg = `${fn.name} 函数请求结束，已超出失败最大重试次数`;

  console.log(msg);
  throw msg;
}

/**
 * 并发控制
 * @param {Promise[]} tasks 需要并发控制的请求任务
 * @param {number} options.concurrentCount 最大并发数量
 * @param {number} options.onProgress 并发过程中的回调（用于获取请求进度）
 * @param {*} rest 同 retryWrapper 函数的参数
 * @returns [results, errors]
 */
async function concurrent(tasks, options = {}) {
  const { concurrentCount, onProgress, retryCount, retryWaitTime } = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  // 任务池（原始任务、重试任务）
  const tasksPool = new Set();
  const results = [];
  const errors = [];

  for (const [index, task] of tasks.entries()) {
    const promise = retryWrapper(task, { retryCount, retryWaitTime })
      .then((data) => (results[index] = data))
      .catch((error) => (errors[index] = { task, error }))
      .finally(() => tasksPool.delete(promise));

    tasksPool.add(promise);
    onProgress(index, task);

    // 达到上限后，等待任意一个任务执行完成
    if (tasksPool.size >= concurrentCount) {
      await Promise.race(tasksPool);
    }
  }

  // 等待其中所有任务做完（做完指：完成或失败）
  await Promise.allSettled(tasksPool);

  return [results, errors];
}

// -------- test case --------

const loadData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.25) {
        resolve(`success ${Date.now()}`);
      } else {
        reject(`fail ${Date.now()}`);
      }
    }, 2000);
  });
};

const tasks = Array(20).fill(loadData);
async function run() {
  const [results, errors] = await concurrent(tasks, {
    onProgress: (index) => {
      console.log(`onProgress 处理中，当前索引：${index}`);
    }
  });

  console.log(`results -->`, results);
  console.log(`errors -->`, errors);
}

run();
```

## Map、FlapMap 和 Reduce

// TODO

## Proxy

// TODO

## 为什么 `0.1 + 0.2 != 0.3`

// TODO

## 正则表达式

[正则表达式](https://github.com/liuyib/study-note/tree/master/JavaScript/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
