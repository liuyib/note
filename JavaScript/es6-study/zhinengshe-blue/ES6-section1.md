# ES6 中的一些基础特性

> 目录
> 1. 解构赋值
> 2. 箭头函数
> 3. 运算符 `...`
> 4. 对 Array 的扩展
> 5. JSON 对象

## 1、解构赋值

- `对象` 解构赋值

```javascript
let { name, age } = { name: 'zhangsan', age: 20 };

// 另一种写法：
// let obj = { name: 'zhangsan', age: 20 };
// let { name, age } = obj;

console.log(name); // => zhangsan
console.log(age);  // => 20
```

- `数组` 解构赋值

```javascript
let [a, b, c] = [1, 2, 3];

// 另一种写法：
// let arr = [1, 2, 3];
// let [a, b, c] = arr;

console.log(a); // => 1
console.log(b); // => 2
console.log(c); // => 3
```

当然，解构赋值也有一些限制：

1.两边的结构要一样（要么都是对象，要么都是数组）:

```javascript
let {a, b} = [1, 2];
console.log(a, b); // => undefined undefined

let [c, d] = {c: 1, d: 2};
console.log(c, d); // => error
```

2.赋值和解构要放在一起：

```javascript
// right
let [a, b, c] = [1, 2, 3];

// error
let [a, b, c];
[a, b, c] = [1, 2, 3];
```

## 2、箭头函数

```javascript
// es5 普通函数
function () {
  // ...
}

// es6 箭头函数
() => {
  // ...
}
```

1.有些情况可以省略 `()` 或 `{}` ：

- 只有一个参数时，可以省略 `()`:

```javascript
const add = n => { return n + 5 };

console.log(add(6)); // => 11
```

- 函数体只有一条语句，并且是 `return` 语句时，可以省略 `{}`

```javascript
const add = n => n + 5;

console.log(add(6)); // => 11
```

2.固定 `this`

箭头函数可以将 `this` 固定到当前代码执行的环境对象上：

```javascript
// 没有固定 this
let person1 = {
  name: 'zhangsan',
  showName: function () {
    console.log(this);
  }
}
person1.showName(); // => {name: "zhangsan", showName: ƒ}

// 固定 this
let person2 = {
  name: 'lisi',
  showName: () => {
    console.log(this);
  }
};

person2.showName(); // => Window
```

所以使用箭头函数不用担心 `this` 的指向会发生改变：

```javascript
class Person {
  constructor() {
    this.name = 'zhangsan',
    this.showName = function () {
      console.log(this.name);
    }
    // this.showName = () => {
    //  console.log(this.name);
    // }
  }
}

let person1 = new Person();

person1.showName(); // => zhangsan

let person2 = {};

person2.showName = person1.showName; // 修改 this 指向

person2.showName(); // => undefined // 普通函数（this 指向发生改变）
                    // => zhangsan  // 箭头函数（固定 this 指向不变）
```

## 3、运算符 `...`

- 参数收集

```javascript
let show = (a, b, ...c) => {
  console.log(a, b, c);
};

show(1, 2, 3, 4, 5, 6); // => 1 2 [3, 4, 5, 6]
```

> 在最后一个参数前面加上运算符 `...`，使得前两个参数赋给了 a、b，其余所有的参数都赋给 c

- 数组展开

```javascript
let arr = [1, 2, 3];

let add = (a, b, c) => {
  console.log(a + b + c);
};

add(...arr); // => 6
```

利用这个特性可以进行数组合并：

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let arr =[...arr1, ...arr2];
console.log(arr); // => [1, 2, 3, 4, 5, 6];
```

- `Json` 展开

```javascript
let obj1 = {
  a: 1,
  b: 2
};

let obj2 = {
  ...obj1,
  c: 3
}

console.log(obj2); // => {a: 1, b: 2, c: 3}
```

## 4、对 Array 的扩展

增加了几个很有用的方法：

- map()
- reduce()
- filter()
- forEach()

### 1.map()

```javascript
let arr = [68, 55, 98, 32, 66];

// 将数组中的分数转换为 “及格” 或 “不及格”
let arr2 = arr1.map(item => item >= 60 ? '及格' : '不及格');

console.log(arr2); // => ["及格", "不及格", "及格", "不及格", "及格"]
```

### 2.reduce()

```javascript
let arr = [68, 55, 98, 32, 66];

// 求数组中的平均数
let result = arr.reduce((acc, curr, index) => {
  return index === arr.length - 1 ? (acc + curr) / arr.length : acc + curr;
});

console.log(result); // => 63.8
```

### 3.filter()

```javascript
let arr = [68, 55, 98, 32, 66];

// 获取数组中的偶数
let even = arr.filter((item) => item % 2 === 0);

console.log(even); // => [68, 98, 32, 66]
```

### 4.forEach()

```javascript
let  arr  = [68,  55,  98,  32,  66];

// 打印数组元素和索引
arr.forEach((item,  index)  =>  console.log(`第${index}个：${item}`));
// => 第0个：68
// => 第1个：55
// => 第2个：98
// => 第3个：32
// => 第4个：66
```

## 5、JSON 对象

- JSON.stringify() - 将 `Json` 转换为字符串
- JSON.parse() - 将 `Json` 字符串转换为 `Json`
