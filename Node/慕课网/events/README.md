node API - event 的子模块EventEmitter 学习
当前 node 版本：v10.15.0

---

引入模块：

```node
var EventEmitter = require("events").EventEmitter;
```

引入的 EventEmitter 是一个构造函数，要 new 一个对象使用：

```node
var oTest = new EventEmitter();
```

添加事件：

```node
oTest.on('my_event1', function () {
  console.log('This is a callback');
});
```

执行事件：

```node
oTest.emit('my_event1');
```

同一个事件，往 EventEmitter 对象上绑定的数目不能超过10个。否则可能会造成内存泄漏。

当绑定超出10个时，代码可以执行，但会有警告。

可以手动设置，解除最大限制：

```node
oTest.setMaxListeners(n); // n 为要设置的数值
```

判断一个对象上绑定的相同事件数目：

```node
console.log(oTest.listeners().length); // 0  // 不传事件名，数目为零
console.log(oTest.listeners('my_event1').length); // 11

// EventEmitter.listenerCount 的参数：对象、事件名
console.log(EventEmitter.listenerCount(oTest, 'my_event1'));
```

移除绑定的事件：

```node
// 1、定义具名函数，通过函数名移除
function todoRemove() {
  console.log('The function to be removed');
}

oTest.on('my_event2', todoRemove);

console.log(oTest.listeners('my_event2').length); // 1

oTest.removeListener('my_event2', todoRemove);

console.log(EventEmitter.listenerCount(oTest, 'my_event2')); // 0

// 2、移除所有的同名事件
console.log(oTest.listeners('my_event1').length); // 11

oTest.removeAllListeners('my_event1');

console.log(oTest.listeners('my_event1').length); // 0

// 3、移除所有的事件
oTest.removeAllListeners();  // 不传递参数，默认移除对象上的所有事件
```