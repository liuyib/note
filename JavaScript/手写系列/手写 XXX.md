- [手写 instanceof](#手写-instanceof)
- [手写 new](#手写-new)
- [手写 call/apply/bind](#手写-callapplybind)

## 手写 instanceof

`instanceof` 的原理很简单：**沿左边变量的原型链向上查找，如果能找到右边的变量，就返回 `true`，否则返回 `false`**。

因此按照该原理，实现代码如下：

```js
function instanceof(a, b) {
  var left = a.__proto__;
  var right = b.prototype;

  while (true) {
    if (left === null) return false;
    if (left === right) return true;

    left = left.__proto__;
  }
}
```

## 手写 new

```js
function _new(constructor, ...args) {
  const instance = Object.create(constructor.prototype);
  const result = constructor.apply(instance, args);

  return typeof result === 'object' || result === null ? result : instance;
}
```

## 手写 call/apply/bind

`call`:

```js
Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;

  var args = [];
  // 注意循环从 1 开始，否则会把 context 包含进去
  for (var i = 1; i < arguments.length; i++) {
    args.push('args[' + i + ']');
  }

  var fn = new Function('ctx,args', `return ctx.fn(${args.join(',')})`);
  var result = fn(context, arguments);

  delete context.fn;

  return result;
};
```

`apply`:

```js
Function.prototype.apply = function (context, arr) {
  context = context ? Object(context) : window;
  context.fn = this;

  if (!arr) {
    return context.fn();
  }

  var args = [];
  for (let i = 0; i < arr.length; i++) {
    args.push('args[' + i + ']');
  }

  var fn = new Function('ctx,args', `return ctx.fn(${args.join(',')})`);
  var result = fn(context, arr);

  delete context.fn;

  return result;
};
```

`bind`:

https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/function-bind.js

> 这里直接使用 ES6 语法，省去不重要的细节。

```js
Function.prototype.bind = function (context, ...args1) {
  // 处理异常
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }

  const F = this;
  const P = F.prototype;

  const bound = function (...args2) {
    const args = args1.concat(args2);

    // 处理 new 和无 new 两种调用
    return this instanceof bound ? new F(...args) : F.apply(context, args);
  };

  // FIXME: MDN 上提到“However, because a bound function does not have the prototype property”，
  //        但是 core-js 和网上所有文章中实现的 bind 都与 MDN 的这句话不符，并且在浏览器中测试可知 MDN 是对的，
  //        经过我的尝试，目前用 JS 模拟实现 bind 貌似没法完美兼容原生 bind 的所有表现，可见测试用例：../__test__/bind.test.js
  //        原生的 bind 可以通过上面所有测试用例，但是网上所有模拟实现的 bind（包括 MDN 推荐的 Polyfill: core-js）都没法完全通过
  // 处理原型链（有问题，和原生 bind 不一致）
  if (P) {
    bound.prototype = P;
  }

  // 处理 bind 后的函数名
  Object.defineProperty(bound, 'name', {
    value: 'bound ' + F.name
  });

  return bound;
};
```

测试用例：[`../__test__/bind.test.js`](../__test__/bind.test.js)（完全参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 总结的）

参考资料：

- call/apply: https://github.com/sisterAn/JavaScript-Algorithms/issues/78
- bind: https://github.com/yygmind/blog/issues/23
