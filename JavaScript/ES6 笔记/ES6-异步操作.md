- [ES6 中的异步操作](#es6-中的异步操作)
  - [Promise](#promise)
  - [async / await](#async--await)

# ES6 中的异步操作

## Promise

`Promise` 是异步编程的一种解决方案，简单来说就是对异步操作的封装。其中保存着未来才会结束的事件（通常是一个异步操作）的状态。

> ```javascript
> new Promise((resolve, reject) => { // ... });
> ```
>
> 异步操作执行成功会调用 resolve，并将 promise 的状态改为 fulfilled（完成）
> 异步操作执行失败会调用 reject，并将 promise 的状态改为 rejected（失败）

例子:

```javascript
// 延迟一秒后输出结果
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 1000);
});

// then 中接收的两个函数分别就是 resolve 和 reject
promise.then(
  (res) => {
    console.log(res); // => foo
  },
  (err) => {
    console.log(err);
  }
);
```

其实 `Jquery` 库中的 `Ajax` 本身就是一个 `Promise`：

```javascript
$.ajax(// ...).then(res => {
  console.log(res);
}, err => {
  console.log(err);
});
```

和上面 `例子` 中的 `promise` 写法一模一样。

> 注意：`Promise` 内部的报错不会被抛出，需要手动捕获（`try-catch` 包裹异步操作代码）

- `promise.all`

  将多个异步操作包成一个 Promise 实例。

  > ```javascript
  > const p = Promise.all([p1, p2, p3])；
  > ```

  例子:

  ```javascript
  // p1，p2，p3 是异步操作
  Promise.all([p1, p2, p3]).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );

  // 当所有的异步操作都成功时，才会执行 `resolve` 函数；只要有一个异步操作失败，就会执行 `reject` 函数。
  ```

## async / await

使得异步操作变得更接近同步操作。实际上它们分别就是代替 `Generator` 和 `yield` 的语法糖。`async` 的返回值是 `Promise` 对象，进一步的说，`async` 完全可以看作多个异步操作，包装成的一个 `Promise` 对象。

> 使用 async 关键字，表名函数内部有异步操作。调用该函数会立即返回一个 Promise 对象。
> 使用 await 关键字，代码会等待 “被 await 修饰的异步操作” 执行完毕后，再继续向下执行。

例子:

```javascript
// 间隔指定时间，且异步操作成功后，输出 value
let timeout = (value, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  }).then((res) => {
    console.log(res);
  });
};

async function asyncPrint(value, time) {
  console.log('start');
  await timeout(value, time);
  console.log('end');
}

asyncPrint('hello world', 1000);
// 加上 await 关键字：
// 立即输出：start，间隔 1 秒后，输出 hello world 和 end

// 不加 await 关键字：
// 立即输出 start 和 end，间隔 1 秒后，输出 hello world
```

> 注意：使用 `await` 时，必须有 `async` 关键字
