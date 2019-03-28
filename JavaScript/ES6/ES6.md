# <span id="top_top">ES6<span>

目录

- [解构赋值](#deconstruction)

  <details>
    <summary>
      ......
    </summary>

    - `对象` 解构赋值
    - `数组` 解构赋值
    - 一些限制
  </details>

- [箭头函数](#arrow_func)

  <details>
    <summary>
      ......
    </summary>

    - 有些情况可以省略 `()` 或 `{}`
    - 固定 `this`
  </details>

- [运算符 `...`](#expand_sign)

  <details>
    <summary>
      ......
    </summary>

    - 参数收集
    - 展开数组
    - 合并数组
    - 展开 / 合并对象
  </details>

- [默认参数](#default_para)
- [对 Array 的扩展](#expand_array)

  <details>
    <summary>
      ......
    </summary>

    - `map()`
    - `reduce()`
    - `filter()`
    - `forEach()`
  </details>

- [JSON 对象](#json_obj)

  <details>
    <summary>
      ......
    </summary>

    - `JSON.stringify()`
    - `JSON.parse()`
  </details>

- [对象代理](#obj_proxy)
- [迭代器 @@iterator](#iterator)

  <details>
    <summary>
      ......
    </summary>

    - 通过 `Symbol.iterator` 获取数组的迭代器
    - `entries()`
    - `keys()`
    - `values()`
  </details>

- [ES7、8、9 中新增的常用语法](#es7_8_9)

  <details>
    <summary>
      ......
    </summary>

    - ES7

      - 幂操作符 `**`
      - `Array.includes`

    - ES8

      - `async / await`

    - ES9

      - 异步迭代
      - 正则表达式扩展
      - `Promise.finally`
  </details>

- [ES6、7 新增的数组方法](#es6_7_array)

  <details>
    <summary>
      ......
    </summary>
    
    - [@@iterator](#iterator)

      - `entries`
      - `keys`
      - `values`

    - `copyWithin`
    - `includes`
    - `find`
    - `findIndex`
    - `fill`
    - `from`
    - `of`
  </details>

## <span id="deconstruction">解构赋值</span>

- `对象` 解构赋值

  ```javascript
  let { name, age } = { name: "zhangsan", age: 20 };

  // 另一种写法：
  // let obj = { name: 'zhangsan', age: 20 };
  // let { name, age } = obj;

  console.log(name); // => zhangsan
  console.log(age); // => 20
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

- 一些限制

  **1、两边的结构要一样（要么都是对象，要么都是数组）:**

  ```javascript
  let { a, b } = [1, 2];
  console.log(a, b); // => undefined undefined

  let [c, d] = { c: 1, d: 2 };
  console.log(c, d); // => error
  ```

  **2、赋值和解构要放在一起：**

  ```javascript
  // right
  let [a, b, c] = [1, 2, 3];

  // error
  let [a, b, c];
  [a, b, c] = [1, 2, 3];
  ```

<br>[⬆ back to top](#top_top)

## <span id="arrow_func">箭头函数</span>

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

- 有些情况可以省略 `()` 或 `{}`

  1、只有一个参数时，可以省略 `()`

  ```javascript
  let add = n => {
    return n + 5;
  };

  console.log(add(6)); // => 11
  ```

  2、函数体只有一条语句，并且是 `return` 语句时，可以省略 `{}`

  ```javascript
  let add = n => n + 5;

  console.log(add(6)); // => 11
  ```

- 固定 `this`

  箭头函数可以将 `this` 固定到 **当前代码执行的环境对象** 上：

  ```javascript
  // 不固定 this
  let person1 = {
    name: "name1",
    showName: function() {
      return this.name;
    }
  };
  console.log(person1.showName()); // => name1

  // 固定 this
  let person2 = {
    name: "name1",
    showName: () => {
      return this.name;
    }
  };

  console.log(person2.showName()); // => undefined
  // 这里 this 是指向了 Window，并且 showName 并不会因为被 person2 调用而改变 this 指向
  ```

  箭头函数固定 this 的另一个例子：

  ```javascript
  // 不固定 this
  let Person = function() {
    this.name = "name1";
    this.attr = {
      name: "name2",
      showName: function() {
        return this.name;
      }
    };
  };

  console.log(new Person().attr.showName()); // => name2

  // 固定 this
  let Person = function() {
    this.name = "name1";
    this.attr = {
      name: "name2",
      showName: () => {
        return this.name;
      }
    };
  };

  console.log(new Person().attr.showName()); // => name1
  ```

<br>[⬆ back to top](#top_top)

## <span id="expand_sign">运算符 `...`</span>

- 参数收集

  ```javascript
  // 例一：
  let show = (a, b, ...c) => {
    console.log(a, b, c);
  };

  show(1, 2, 3, 4, 5, 6); // => 1 2 [3, 4, 5, 6]

  // 例二：
  let add = (...nums) => {
    let sum = 0;
    nums.forEach(item => {
      sum += item;
    });
    return sum;
  };

  console.log(add(1, 2, 3, 4)); // => 10

  // 用 ES5 的方法实现例二：
  function add() {
    // 将类数组对象 arguments 转为数组
    var arr = Array.prototype.slice.apply(arguments);
    var sum = 0;

    arr.forEach(function(item) {
      sum += item;
    });

    return sum;
  }

  console.log(add(1, 2, 3, 4)); // => 10
  ```

  > 在最后一个参数前面加上运算符 `...`，使得前两个参数赋给了 a、b，其余所有的参数都赋给 c

- 展开数组

  ```javascript
  let arr = [1, 2, 3];

  let add = (a, b, c) => {
    console.log(a + b + c);
  };

  add(...arr); // => 6
  ```

- 合并数组

  ```javascript
  // ES6
  let arr1 = [1, 2, 3];
  let arr2 = [...arr1, 4, 5, 6];

  console.log(arr2); // => [1, 2, 3, 4, 5, 6]

  // ES5
  var arr1 = [1, 2, 3];
  let arr2 = arr1.concat([4, 5, 6]);

  console.log(arr2); // => [1, 2, 3, 4, 5, 6]
  ```

- 展开 / 合并对象

  ```javascript
  let obj1 = {
    a: 1,
    b: 2
  };

  let obj2 = {
    ...obj1,
    c: 3
  };

  console.log(obj2); // => {a: 1, b: 2, c: 3}
  ```

<br>[⬆ back to top](#top_top)

## <span id="default_para">默认参数</span>

在函数的参数后面赋值，即可给函数设置一个默认参数

```javascript
let fn = (a = "hello world") => {};
```

可以将默认参数设置为一个函数：

```javascript
const myError = () => {
  throw new Error("请传入参数");
};

let fn = (a = myError()) => {
  return a;
};

try {
  fn();
} catch (e) {
  console.log(e);
}

// 当没有传入参数时，会执行 myError 函数，并抛出错误
```

<br>[⬆ back to top](#top_top)

## <span id="expand_array">对 Array 的扩展</span>

- `map()`

  ```javascript
  let arr = [68, 55, 98, 32, 66];

  // 将数组中的分数转换为 “及格” 或 “不及格”
  let arr2 = arr1.map(item => (item >= 60 ? "及格" : "不及格"));

  console.log(arr2); // => ["及格", "不及格", "及格", "不及格", "及格"]
  ```

- `reduce()`

  ```javascript
  let arr = [68, 55, 98, 32, 66];

  // 求数组中的平均数
  let result = arr.reduce((acc, curr, index) => {
    return index === arr.length - 1 ? (acc + curr) / arr.length : acc + curr;
  });

  console.log(result); // => 63.8
  ```

- `filter()`

  ```javascript
  let arr = [68, 55, 98, 32, 66];

  // 获取数组中的偶数
  let even = arr.filter(item => item % 2 === 0);

  console.log(even); // => [68, 98, 32, 66]
  ```

- `forEach()`

  ```javascript
  let arr = [68, 55, 98, 32, 66];

  // 打印数组元素和索引
  arr.forEach((item, index) => console.log(`第${index}个：${item}`));
  // => 第0个：68
  // => 第1个：55
  // => 第2个：98
  // => 第3个：32
  // => 第4个：66
  ```

<br>[⬆ back to top](#top_top)

## <span id="json_obj">JSON 对象</span>

- `JSON.stringify()`

  > 将 `Json` 转换为字符串

- `JSON.parse()`
  > 将 `Json` 字符串转换为 `Json`

<br>[⬆ back to top](#top_top)

## <span id="obj_proxy">对象代理</span>

通过在对象的定义上加一层“代理”（保护数据的规则自己实现）来保护一些数据，使得不能直接访问对象里的数据，只能通过提供的 API（相当于一个代理层） 进行访问。

例子：

```javascript
// ES5 保护数据 例一
var Person = function() {
  var data = {
    name: "name1",
    sex: "male",
    age: 20
  };

  this.get = function(key) {
    return data[key];
  };

  this.set = function(key, value) {
    if (key !== "sex") {
      data[key] = value;
    }
  };
};
var person = new Person();

console.log(person.data); // => undefined // 不能直接访问私有数据
console.log(person.get("name")); // => name1     // 通过 API 才能获取私有数据

person.set("name", "name2");
console.log(person.get("name")); // => name2     // 通过 API 更改私有数据

person.set("sex", "formale");
console.log(person.get("sex")); // => male      // 不允许更改 sex 数据

// ES5 保护数据 例二
var person = {
  name: "name1",
  age: 20
};

Object.defineProperty(person, "sex", {
  value: "male",
  writable: false
});

person.sex = "formale";
console.log(person.sex); // => male

// ES6 // 使用 Proxy 进行代理
let Person = {
  name: "name1",
  sex: "male",
  age: 20
};

let person = new Proxy(Person, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    if (key !== "sex") {
      target[key] = value;
    }
  }
});

console.log(person.name); // => name1 // 读取数据时，默认会调用 get API（修改数据同理）

person.age = 21;
console.log(person.age); // => 21    // 可以修改

person.sex = "formale";
console.log(person.sex); // => male  // 不可以修改
```

<br>[⬆ back to top](#top_top)

## <span id="iterator">迭代器 @@iterator</span>

下面是几种得到迭代器的方法：

- 通过 `Symbol.iterator` 获取数组的迭代器

  ```js
  var arr = [1, 2, 3];
  var iter = arr[Symbol.iterator]();

  // 不断调用迭代器的 next 方法，就能依次获取数组的值
  console.log(iter.next().value); // => 1
  console.log(iter.next().value); // => 2
  console.log(iter.next().value); // => 3
  ```

- `entries()`

  > 用来获取数组**键值对**的迭代器。key 是元素的索引，value 是元素值

  ```js
  var arr = [1, 2, 3];
  let iter = arr.entries();

  console.log(iter.next());       // {value: Array, done: false}
  console.log(iter.next().value); // => [0, 1] // 0 是索引，1 是元素值
  console.log(iter.next().value); // => [1, 2]
  console.log(iter.next().value); // => [2, 3]
  ```

- `keys()`

  > 获取数组**索引**的迭代器

  ```js
  var arr = [1, 2, 3];
  let iter = arr.keys();

  console.log(iter.next());       // => {value: 0, done: false}
  console.log(iter.next().value); // => 0
  console.log(iter.next());       // => {value: 1, done: false}
  console.log(iter.next().value); // => 1
  console.log(iter.next());       // => {value: 2, done: false}
  console.log(iter.next().value); // => 2
  ```

- `values()`

  > 获取数组**值**的迭代器

  ```js
  var arr = [1, 2, 3];
  let iter = arr.values();

  console.log(iter.next());       // => {value: 1, done: false}
  console.log(iter.next().value); // => 1
  console.log(iter.next());       // => {value: 2, done: false}
  console.log(iter.next().value); // => 2
  console.log(iter.next());       // => {value: 3, done: false}
  console.log(iter.next().value); // => 3
  ```

<br>[⬆ back to top](#top_top)

## <span id="es7_8_9">ES7、8、9 中新增的常用语法</span>

- ES7

  - 幂操作符 `**`

    ```javascript
    let power = 2 ** 4;

    console.log(power); // 16
    ```

  - `Array.includes`

    > 判断数组中是否包含指定项

    ```javascript
    let arr = [1, 2, 3, 4];

    console.log(arr.includes(3)); // true
    console.log(arr.includes(8)); // false
    ```

- ES8

  - `async / await`

- ES9

  - 异步迭代
  - 正则表达式扩展
  - `Promise.finally`

<br>[⬆ back to top](#top_top)

## <span id="es6_7_array">ES6、7 新增的数组方法</span>

- [@@iterator](#iterator)

  - `entries`
  - `keys`
  - `values`

- `copyWithin`
- `includes`
- `find`
- `findIndex`
- `fill`
- `from`
- `of`

<br>[⬆ back to top](#top_top)