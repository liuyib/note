# 队列

## ES6 class 实现

> 这里不考虑属性的私有性。关于设置属性私有性和栈中的解决方案一样。

``` js
class Queue {
  constructor() {
    this.items = [];
  }

  push(...elems) {
    this.items.push(...elems)
  }

  shift() {
    return this.isEmpty() ? undefined : this.items.shift();
  }

  getFirst() {
    return this.isEmpty() ? undefined : this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(`-${this.items.toString()}-`);
  }
}

let q = new Queue();

q.print();                 // -- 
console.log(q.isEmpty());  // true

q.push(...[4, 1, 5]);
q.print();                 // -4,1,5-
console.log(q.getFirst()); // 4
console.log(q.size());     // 3

q.shift();
q.print();                 // -1,5-
```

## 优先队列

``` js
// 最小优先队列
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  push(elem, priority) {
    const { items } = this;
    let added = false;
    let queueElem = {
      'elem': elem,    // 元素值
      'prio': priority // 优先级
    };

    for (let i = 0; i < items.length; i++) {
      if (queueElem.prio < items[i].prio) {
        items.splice(i, 0, queueElem);
        added = true;
        break;
      }
    }

    // 数组为空 或 优先级最小
    if (!added) items.push(queueElem);
  }

  print() {
    let result = '';
    this.items.forEach(item => {
      result += `elem: ${item.elem}, priority: ${item.prio}\n`;
    });
    console.log(`${result}`);
  }
}

let pq = new PriorityQueue();

pq.push('zhangsan', 2);
pq.push('lisi', 1);
pq.push('wangwu', 3);
pq.print(); // => elem: lisi, priority: 1
            // => elem: zhangsan, priority: 2
            // => elem: wangwu, priority: 3
```

> 这里实现的是最小优先队列，因为优先级越小的元素在队列中的位置越靠前。最大优先队列与之相反。
