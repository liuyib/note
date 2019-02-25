## 1、节流 和 防抖

> 节流：事件持续触发的时候，每 n 秒执行一次函数
> 防抖：事件持续触发结束后，间隔 n 秒才执行函数
> 学习资料：https://github.com/mqyqingfeng/Blog/issues/26（讶羽大大的博客）

## 2、基本数据类型 6 种（原始数据类型）

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

## 3、typeof 和 instanceof

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

## 4、类型转换

- `NaN` 是 `number` 类型的数据，所以 `number` 转其他类型时不要漏掉它。
- 对象转字符串，结果为：`[object Object]`
- 数组转数字：空数组、只有一个数字元素的数组转为数字，其余情况均为 `NaN`
- `undefined` 和 `null` 转数字，分别为：`NaN` 和 `0`

### 转为 `Boolean`

除了 `undefined`，`null`，`false`，`NaN`，`0`，`-0` 转为 `false`，其他的都转为 `true`，包括所有对象。

### 对象转为基本类型：

对象在转换为基本类型时，会调用内置的 `[[ToPrimitive]]` 函数，该函数的算法逻辑如下：

- 如果已经是基本类型，直接返回
- 调用内置的 valueOf()、toString() 方法，如果转换为基本类型的值，就返回转换的值
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

### 详细的数据类型转换表：

![](https://s2.ax1x.com/2019/02/25/k5hCM6.jpg)

### 类型转换的一些小技巧

- 数据前置 `+` 号，转换为 `number` 类型
- 数据与 `0` 相减，转换为 `number` 类型
- 数据前置 `!!` 号，转换为 `Boolean` 类型

### + 号运算符

四则运算中，`+` 号运算符相较其他运算符比较特殊，它的特点如下：

- 运算中存在字符串，则结果为字符串
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

四则运算中，除了加法运算以外，对于其他三种运算来说，只要一方有数字，另一方就会被转换：

```javascript
console.log(2 - '3');    // -1
console.log(2 * []);     // 0
console.log(2 / [1, 2]); // NaN
```

### 比较运算符

如果存在对象，就会通过 `toPrimitive` 函数转换。

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

### == 操作 和 === 操作

// TODO

### 为什么 `0.1 + 0.2 != 0.3`

// TODO