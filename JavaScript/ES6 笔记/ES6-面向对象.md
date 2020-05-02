# ES6 中的面向对象和模块化

> 目录
>
> - class、extends、constructor、super
> - ES5 中的伪面向对象
> - 模块化
>   - 导入
>   - 导出
>   - 简单的 webpack 配置

## 1、class、extends、constructor、super

```javascript
// 父类 Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  showName() {
    console.log(this.name);
  }

  showAge() {
    console.log(this.age);
  }
}

// 子类 Worker
class Worker extends Person {
  constructor(name, age, job) {
    super(name, age);

    this.job = job;
  }

  showJob() {
    console.log(this.job);
  }
}

let coder = new Worker('liuyibo', 20, 'coding');

coder.showName(); // => liuyibo
coder.showAge(); // => 20
coder.showJob(); // => coding
```

## 2、ES5 中的伪面向对象

ES5 中没有专门声明类的方法，所以使用构造函数来充当（伪）类

```javascript
// 父类 Person
function Person(name, age) {
  // 既是构造函数又充当类
  this.name = name;
  this.age = age;
}

Person.prototype.showName = function() {
  console.log(this.name);
};
Person.prototype.showAge = function() {
  console.log(this.age);
};

// 子类 Worker
function Worker(name, age, job) {
  Person.call(this, name, age); // 通过修改 this 指向来继承属性

  this.job = job; // 添加子类自己的属性
}

Worker.prototype = new Person(); // 将子类的原型指向父类的实例，从而继承父类的方法（子类的 constructor 也指向了父类）
Worker.constructor = Worker; // 修正子类的 constructor

// 添加子类自己的方法
Worker.prototype.showJob = function() {
  console.log(this.job);
};

let coder = new Worker('liuyibo', 20, 'coding');

coder.showName(); // => liuyibo
coder.showAge(); // => 20
coder.showJob(); // => coding
```

## 3、模块化

### 3.1、导入

```javascript
import 'xxx'; // 只导入不引用
import mod from 'xxx'; // 只导入 default 成员，并起一个别名 mod
import * as mod from 'xxx'; // 导入所有成员，并起一个总的别名 mod
import { mod1, mod2 as name2 } from 'xxx'; // 导入名称为 mod1，mod2 的成员，并给 mod2 起一个别名 name2
let promise = import('xxx'); // 异步导入，返回一个 Promise 对象（导入之后不会立即使用，而是按需使用）
```

### 3.2、导出

```javascript
export default xxx;

export let a = 10;
export {name: 'zhangsan', age: 20}
export function () { // ... }
export class Person { // ... }
```

### 3.3、简单的 webpack 配置

目前所有的浏览器还不支持模块化（简单来说就是：`import` 这样的语法浏览器还不认识），所有需要进行打包编译。

Demo:

```javascript
// mod.js
export let a = 1;
export let b = 2;
```

```javascript
// index.js
import * as mod from './mod'; // 文件名后缀可以省略（默认是 JS 文件）

console.log(mod.a, mod.b); // 1 2
```

```node
// webpack.config.js
const path = require('path');

module.exports = {
  mode: "production", // 生产模式（development：开发模式）
  entry: "./src/index.js",
  output: [
    path: path.resolve(__dirname, "build"), // 使用 node 的一个包，将路径转换为绝对路径，避免一些问题
    filename: "bundle.js"
  ]
};
```

在项目目录下的命令行中执行：`webpack`

程序会自动寻找 `webpack.config.js` 文件，然后按照文件里的配置，进行打包编译。
