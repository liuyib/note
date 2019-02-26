# 前端知识查漏补缺 -- 知识体系参照下图

![](https://s2.ax1x.com/2019/02/25/kI8xr8.md.png)

## JavaScript 部分

### 1、节流 和 防抖

> 节流：事件持续触发的时候，每 n 秒执行一次函数
> 防抖：事件持续触发结束后，间隔 n 秒才执行函数
> 学习资料：https://github.com/mqyqingfeng/Blog/issues/26（讶羽大大的博客）

### 2、基本数据类型 6 种（原始数据类型）

- boolean
- number
- string
- null
- undefined
- symbol - ES6 新引入的基本类型

需要注意的地方：
- 基本类型中储存的都是值，没有任何方法和属性。（虽然 `'1'.toString()` 可以使用，是因为这里 '1' 已经被后台转换为了基本包装类型）
- `null` 不是对象类型的。（虽然 `typeof null` 得到的结果是 `object`，但是这是一个很悠久的 `Bug` 造成的）
- `number` 类型是浮点类型的。（`0.1 + 0.2 != 0.3`）

### 3、typeof 和 instanceof

- `typeof` 对于基本类型来说，除了 `null` 都可以显示正确类型。
- `typeof` 对于对象来说，除了函数，都显示 `object`

`instanceof` 可以正确判断数据类型，是因为其内部是通过原型链来判断的。

不过 `instanceof` 不能用于判断基本类型：

```javascript
var str = 'hello world';
console.log(str instanceof String); // => false

var str = new String('hello world');
console.log(str instanceof String); // => true
```

但是有另一种方式可以让 `instanceof` 可以判断基本类型：

```javascript
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string';
  }
}

console.log('hello world' instanceof PrimitiveString); // true
```

其中 `Symbol.hasInstance` 是一个能让我们自定义 `instanceof` 行为的东西。上面的代码等同于 `typeof 'hello world' === 'string'`，所以结果就是 `true` 了。

手动实现一个 `instanceof：`

```javascript

```

### 4、类型转换

- `NaN` 是 `number` 类型的数据，所以 `number` 转其他类型时不要漏掉它。
- 对象转字符串，结果为：`[object Object]`
- 数组转数字：空数组、只有一个数字元素的数组转为数字，其余情况均为 `NaN`
- `undefined` 和 `null` 转数字，分别为：`NaN` 和 `0`

#### 转为 `Boolean`

除了 `undefined`，`null`，`false`，`NaN`，`0`，`-0` 转为 `false`，其他的都转为 `true`，包括所有对象。

#### 对象转为基本类型：

对象在转换为基本类型时，会调用内置的 `[[ToPrimitive]]` 函数，该函数的算法逻辑如下：

- 如果已经是基本类型，直接返回
- 依次尝试调用内置的 `valueOf、toString` 方法，如果成功转换为基本类型的值，就返回转换的值
- 如果都没有返回基本类型的值，就会抛错

当然，也可以自己重写 `Symbol.toPrimitive`（该方法在对象转基本类型时，调用优先级最高）：

```javascript
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return 1;
  },
  [Symbol.toPrimitive]() {
    return 2;
  }
};

console.log(1 + a); // => 3
```

#### 详细的数据类型转换表：

![](https://s2.ax1x.com/2019/02/25/k5hCM6.jpg)

#### 类型转换的一些小技巧

- 数据前置 `+` 号，转换为 `number` 类型
- 数据与 `0` 相减，转换为 `number` 类型
- 数据前置 `!!` 号，转换为 `Boolean` 类型

#### + 号运算符

四则运算中，`+` 号运算符相较其他运算符比较特殊，它的特点如下：

- 如果运算中存在字符串，则结果为字符串
- 运算的结果只有数字和字符串
- 运算中含有不是数字或字符串的数据，会根据转换规则进行转换

例如：

```javascript
console.log([1, 2, 3] + 4); // 1,2,34

// 由于 [1, 2, 3] 无法转换为数字，所以会转换为字符串 1,2,3 所以，再与 4 相加就会得到上面的结果
```

下面来看这个表达式 `'a' + + 'b'`：

```javascript
console.log('a' + + 'b'); // => aNaN

// 由于 + 'b' 会转换为 NaN，所以结果为 aNaN
```

四则运算中，除了加法运算以外，对于其他三种运算来说，只要一方有数字，另一方就会被尝试转换为数字：

```javascript
console.log(2 - '3');    // -1
console.log(2 * []);     // 0
console.log(2 / [1, 2]); // NaN
```

#### 比较运算符

如果进行比较运算时存在对象，就会通过 `toPrimitive` 函数转换对象。

```javascript
let a = {
  valueOf() {
    return 1;
  },
  toString() {
    return 3;
  }
};

console.log(a > 2); // => false
```
依次尝试 `valueOf` 和 `toString` 进行转换，当两者中任何一个成功转换时，则会直接返回转换结果。

#### == 操作 和 === 操作的区别

简单来说，使用 `==` 先比较类型，如果类型一样再比较值；如果类型不一样，会尝试 **类型转换**，转换成功后再比较值。而使用 `===` 只比较值，不会进行类型转换。

**通过 `==` 判断两者是否相同，判断流程如下：**

1. 两者类型是否相同。相同就再比较大小
2. 类型不同，进行 **类型转换**
3. 两者类型是否分别为 `null` 和 `undefined`，如果是直接返回 `true`
4. 两者类型是否分别为 `number` 和 `string`，如果是将 **字符串** 转换为 `number`
5. 是否存在 `boolean`，如果存在将 `boolean` 转换为 `number`
6. 一方是否为 `object` 且另一方为 `number、string` 或 `symbol`，是的话将 `object` 转换为基本类型

例子如下：

```javascript
// 4.
1 == '2'
      ↓
1 ==  2 // => false

// 5.
'1' == true
        ↓
'1' ==  1
 ↓
 1  ==  1 // => true

// 6.
'1' == {}
        ↓
'1' == '[object Object]'
```

> 思考题：请问 `[] == ![]` 的结果是什么？

[思考题答案戳我](https://s2.ax1x.com/2019/02/26/koaW4O.png)

关于 `===` 就很简单了，类型和值都相同时，结果才相同。

### 5、为什么 `0.1 + 0.2 != 0.3`

// TODO

### 6、this

`this` 这个概念并不难，只是很多文章把简单的东西说复杂了。这里一次将这个概念搞清楚。

首先来看几个使用场景：

```javascript
function foo() {
  console.log(this.a);
}

var a = 1;
foo();

var obj = {
  a: 2,
  foo: foo
};

obj.foo();

var b = new foo();
```

下面对这几种用法进行分析：

- 直接调用 `foo`，不管 `foo` 函数放在哪里，`this` 都是 `window`
- 对于 `obj.foo` 这种用法，只需要记住，谁调用了函数，`this` 就指向谁
- 对于 `new` 的方式来说，`this` 永远被绑定在了实例上，任何方式都无法改变 `this`

**箭头函数的 `this`：**

对于箭头函数的 `this` 只取决于包裹箭头函数的第一个普通函数的 `this`。举个例子：

```javascript
function foo() {
  return () => {
    return () => {
      console.log(this);
    }
  }
}

foo()(); // => window
```

这个例子中，由于包裹箭头函数的第一个普通函数是 `foo`，所以很显然结果为 `window`。

> 另外，对箭头函数使用绑定 `this` 的函数 `call、apply、bind` 是无效的。

**bind 这类改变上下文的 API：**

如果对一个函数多次使用 `bind`，那么上下文（`this` 的值）会是什么呢？

```javascript
var a = {};
var fn = function () {
  console.log(this);
};

fn.bind().bind(a)(); // => window
```

上面的 `fn` 为什么会被绑定到 `window` 上？其实 `fn.bind().bind(a)` 等价于：

```javascript
(function () {
  return function () {
    return fn.apply();
  }.apply(a);
})();
```

所以可以看出，不管给函数 `bind` 几次，函数的 `this` 永远由第一次 `bind` 决定。

```javascript
var a = {};
var fn = function () {
  console.log(this);
};

fn.bind(a).bind()(); // => {}
```

上面就是 `this` 的规则了。但是有可能多个规则同时出现，这时候不同规则之间就要根据 **优先级** 来决定 `this` 最终指向哪里。

优先级情况如下：

`new` 方式优先级最高，然后是 `bind` 这类函数，接着是 `obj.foo()` 这种方式，最后是 `直接调用: foo()`。同时要记得，箭头函数的 `this` 一旦被绑定，就不会再改变。

### 7、上下文 和 执行上下文

> 上下文始终是 this 的值
> 执行上下文是不同于上下文的另一个概念

// TODO

