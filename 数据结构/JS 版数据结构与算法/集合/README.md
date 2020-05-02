# 集合

``` js
class MySet {
  constructor() {
    this.items = {};
  }

  has(elem) {
    return Object.prototype.hasOwnProperty.call(this.items, elem);
  }

  add(elem) {
    if (!this.has(elem)) {
      this.items[elem] = elem;
      return true;
    }
    return false;
  }

  delete(elem) {
    if (this.has(elem)) {
      delete this.items[elem];
      return true;
    }
    return false;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.values(this.items);
  }

  isEmpty() {
    return this.size() === 0;
  }

  print() {
    if (this.isEmpty()) {
      console.log('集合为空');
      return '';
    }

    const values = this.values();
    let result = [];

    for (const v of values) {
      result.push(v);
    }

    console.log(`集合中的元素如下：`);
    console.log(result);
  }

  // 使用 MySet 实现交集
  intersection(otherSet) {
    let set = new MySet();
    let smaller = this.values();
    let bigger = otherSet.values();

    if (smaller.length > bigger.length) {
      [smaller, bigger] = [bigger, smaller];
    }
    
    for (const v of smaller) {
      if (bigger.includes(v)) {
        set.add(v);
      }
    }

    return set.values();
  }  

  // 使用 MySet 实现并集
  union(otherSet) {
    let set = new MySet();
    let values = [...this.values(), ...otherSet.values()];

    values.forEach(v => {
      set.add(v);
    });

    return set.values();
  }

  // 使用 MySet 实现差集
  difference(otherSet) {
    let set = new MySet();
    
    this.values().forEach(v => {
      if (!otherSet.values().includes(v)) {
        set.add(v);
      }
    });

    return set.values();
  }

  // 使用 MySet 实现子集运算
  subSet(otherSet) {
    if (this.size() < otherSet.size()) {
      return false;
    }

    for (const v of otherSet.values()) {
      if (!this.values().includes(v)) {
        return false;
      }
    }

    return true;
  }
}

let set = new MySet();

set.print(); // => 集合为空

set.add('hello');
set.add('world');
set.add('web');
set.add('code');
set.print(); // => 集合中的元素如下：
             // => [ 'hello', 'world', 'web', 'code' ]

set.delete('world');
set.print(); // => 集合中的元素如下：
             // => [ 'hello', 'web', 'code' ]

// 交、并、差、子集运算
let setA = new MySet();

setA.add(1);
setA.add(2);
setA.add(4);
setA.add(5);

let setB = new MySet();

setB.add(2);
setB.add(3);
setB.add(5);
setB.add(6);

console.log('两个集合中的元素分别如下：');
console.log('setA: ');
console.log(setA.values());           // => [ 1, 2, 4, 5 ]
console.log('setB: ');
console.log(setB.values());           // => [ 2, 3, 5, 6 ]

// 并集
console.log('进行并集运算后的集合为：');
console.log(setA.union(setB));        // => [ 1, 2, 3, 4, 5, 6 ]

// 交集
console.log('进行交集运算后的集合为：');
console.log(setA.intersection(setB)); // => [ 2, 5 ]

// 差集
console.log('集合 A 对集合 B 进行差集运算后的结果为：');
console.log(setA.difference(setB));   // => [ 1, 4 ]

// 子集
console.log('判断集合 B 是否为集合 A 的子集：');
console.log(setA.subSet(setB));       // => false
```