- [手写 instanceof](#手写-instanceof)

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
