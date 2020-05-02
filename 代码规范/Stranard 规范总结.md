# JavaScript Standard 规范（部分）

Standard 规范[完整版](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)。

这里只是记录了该规范中，我不熟悉或需要再次提醒自己的地方。

> 这个规范中有两个鲜明的特点是 **省略行尾的分号** 和 **函数名后加空格**。不过我还是更愿意始终保留行尾分号。
>
> **行首以 `(` `[` `` ` `` 这三种符号开头，是省略分号后，唯一会造成问题的地方。**

- 函数声明时括号与函数名间加空格。

```js
function name(arg) { ... }   // ✗ avoid
function name (arg) { ... }  // ✓ ok

run(function() { ... })      // ✗ avoid
run(function () { ... })     // ✓ ok
```

- 使用浏览器全局变量时加上 `window.` 前缀。`document`、`console` 和 `navigator` 除外。

```js
window.alert('hi'); // ✓ ok
```

- 对于三元运算符 `?` 和 `:` 与他们所负责的代码处于同一行。

```js
// ✗ avoid
let location = env.development ?
  'localhost' :
  'www.api.com';

// ✓ ok
let location = env.development ? 'localhost' : 'www.api.com';

// ✓ ok
let location = env.development
  ? 'localhost'
  : 'www.api.com';
```

- 条件语句中赋值语句使用括号包起来。

```js
while (m = text.match(expr)) { }   // ✗ avoid
while ((m = text.match(expr))) { } // ✓ ok
```

- 单行代码块两边加空格。

```js
function foo () {return true;}   // ✗ avoid
function foo () { return true; } // ✓ ok
```

- 模板字符串中变量前后不加空格。

```js
const message = `Hello, ${ name }`; // ✗ avoid
const message = `Hello, ${name}`;   // ✓ ok
```

- 不允许有多余的行末逗号。

```js
let obj = {
  message: 'hello', // ✗ avoid
};
```

- 不要使用 `undefined` 来初始化变量。

```js
let name = undefined; // ✗ avoid

let name;
name = 'value';       // ✓ ok
```

- `return` 语句中的赋值必需有括号包裹。

```js
function sum (a, b) {
  return result = a + b;   // ✗ avoid
}

function sum (a, b) {
  return (result = a + b); // ✓ ok
}
```

- 检查 `NaN` 的正确姿势是使用 `isNaN`。

```js
if (price === NaN) { } // ✗ avoid
if (isNaN(price)) { }  // ✓ ok
```

- 关系运算符的左值不要做取反操作。

> 这里的关系运算符指：`in`、`instanceof`

```js
if (!key in obj) { }            // ✗ avoid
if (!obj instanceof Ctor) { }   // ✗ avoid

if (!(key in object)) { }       // ✓ ok
if (!(obj instanceof Ctor)) { } // ✓ ok
if(("" + !key) in object) { }   // ✓ ok
```

- 对象中定义了存值器，一定要对应的定义取值器。

```js
let person = {
  set name (value) { // ✗ avoid
    this._name = value;
  }
};

let person = {
  set name (value) {
    this._name = value;
  },
  get name () {      // ✓ ok
    return this._name;
  }
};
```

- 子类的构造器中一定要调用 `super`

```js
class Dog {
  constructor () {
    super(); // ✗ avoid
  }
}

class Dog extends Mammal {
  constructor () {
    super(); // ✓ ok
  }
}
```

- 使用 `this` 前请确保 `super` 已调用。

```js
class Dog extends Animal {
  constructor () {
    this.legs = 4; // ✗ avoid
    super();
  }
}
```

- 同一模块有多个导入时一次性写完。

```js
import { myFunc1 } from 'module';
import { myFunc2 } from 'module';          // ✗ avoid

import { myFunc1, myFunc2 } from 'module'; // ✓ ok
```

- `import`, `export` 和解构操作中，禁止赋值到同名变量。

```js
import { config as config } from './config'; // ✗ avoid
import { config } from './config';           // ✓ ok
```

- `yield *` 中的 `*` 前后都要有空格。

```js
yield* increment();  // ✗ avoid
yield * increment(); // ✓ ok
```

- 不要扩展原生对象。

```js
Object.prototype.age = 21; // ✗ avoid
```

- 注意隐式的 `eval`。

```js
setTimeout("alert('Hello world')");                // ✗ avoid
setTimeout(function () { alert('Hello world'); }); // ✓ ok
```

- 嵌套的代码块中禁止再定义函数。

```js
if (authenticated) {
  function setAuthUser () {} // ✗ avoid
}
```

- 外部变量不要与对象属性重名。

```js
let score = 100;

function game () {
  score: while (true) { // ✗ avoid
    score -= 10;
    if (score > 0) continue score;
    break;
  }
}
```

- 不要使用标签语句。

```js
label:
  while (true) {
    break label; // ✗ avoid
  }
```

- 使用 `__dirname` 和 `__filename` 时尽量避免使用字符串拼接。

```js
const pathToFile = __dirname + '/app.js';          // ✗ avoid
const pathToFile = path.join(__dirname, 'app.js'); // ✓ ok
```

- 使用 `getPrototypeOf` 来替代 `__proto__`。

```js
const foo = obj.__proto__;              // ✗ avoid
const foo = Object.getPrototypeOf(obj); // ✓ ok
```

- 避免使用逗号操作符。

```js
if (doSomething(), !!test) { } // ✗ avoid
```

- 禁止使用稀疏数组（Sparse arrays）。

```js
let fruits = ['apple', , 'orange']; // ✗ avoid
```

- `finally` 代码块中不要再改变程序执行流程。

```js
try {
  // ...
} catch (e) {
  // ...
} finally {
  return 42; // ✗ avoid
}
```

- 避免使用 `arguments.callee` 和 `arguments.caller`。
- 不要使用 `debugger。`
- 不要使用 `eval`。
- 不要使用 `with。`
- 不要使用 `__iterator__`。
