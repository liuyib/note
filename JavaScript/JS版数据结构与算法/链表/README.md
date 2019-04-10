# 链表

## 单向链表

> 使用 Proxy 对链表的方法进行了处理，可以省略的，为了练手 Proxy 哈

``` js
class Node {
  constructor(elem) {
    this.elem = elem;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 向链表末尾添加节点
  push(elem) {
    let node = new Node(elem);
    let curr = null;

    if (this.head === null) {
      this.head = node;
    } else {
      curr = this.head;

      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    }

    this.length++;
    return true;
  }

  // 向指定位置插入元素
  insert(pos, elem) {
    pos--; // 位置转为索引

    if (pos < 0 || pos > this.length) {
      return false;
    } else {
      let node = new Node(elem); // 新添加的节点
      let index = 0;
      let prev = null;
      let curr = this.head;

      if (pos === 0) {
        node.next = curr;
        this.head = node;
      } else {
        while (index < pos) {
          prev = curr;
          curr = curr.next;
          index++;
        }

        node.next = curr;
        prev.next = node;
      }

      this.length++;
      return true;
    }
  }

  // 删除指定的元素
  remove(elem) {
    return this.indexOf(elem) !== -1
      ? this.removeAt(this.indexOf(elem) + 1)
      : false;
  }

  // 删除指定位置的元素
  removeAt(pos) {
    pos--; // 位置转为索引

    if (pos < 0 || pos > this.length - 1) {
      return false;
    } else {
      let index = 0;
      let prev = null; // 前一个节点
      let curr = this.head; // 当前节点（初始指向 head）

      if (pos === 0) {
        this.head = curr.next;
      } else {
        while (index < pos) {
          prev = curr;
          curr = curr.next;
          index++;
        }

        prev.next = curr.next;
      }

      this.length--;
      curr = null; // 释放内存
      return true;
    }
  }

  // 查找指定元素的索引
  indexOf(elem) {
    let curr = this.head;
    let index = 0;

    while (curr) {
      if (curr.elem === elem) {
        return index;
      } else {
        curr = curr.next;
      }
      index++;
    }

    return -1; // 未找到指定元素
  }

  // 判断链表是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 获取链表的长度
  size() {
    return this.length;
  }

  // 获取链表的头结点
  getHead() {
    return this.head;
  }

  // 打印链表所有的元素
  print() {
    let curr = this.head;
    let index = 0;

    console.log('链表元素如下：');
    while (curr) {
      console.log(`${index}: ${curr.elem}`);
      curr = curr.next;
      index++;
    }
    console.log();
  }
}

// 链表的方法名
const listMethod = {
  push: "push",
  insert: "insert",
  remove: "remove",
  removeAt: "removeAt",
  indexOf: "indexOf",
  isEmpty: "isEmpty",
  size: "size",
  getHead: "getHead",
  print: "print"
};

// 对 list 的实例 new LinkList() 设置代理器
let list = new Proxy(new LinkList(), {
  get(tar, prop) {
    return function(...args) {
      switch (prop) {
        case listMethod.push:
          console.log(`添加元素 ${args[0]} ${
            tar[prop](args[0]) ? '成功' : '失败'
          }`);
          break;
        case listMethod.insert:
          console.log(`在位置 ${args[0]} 处插入元素 ${args[1]} ${
            tar[prop](args[0], args[1]) ? '成功' : '失败，插入位置不合法'
          }`);
          break;
        case listMethod.remove:
          console.log(`删除元素 ${args[0]} ${
            tar[prop](args[0]) ? '成功' : '失败'
          }`);
          break;
        case listMethod.removeAt:
          console.log(`删除位置 ${args[0]} 处的元素 ${
            tar[prop](args[0]) ? '成功' : '失败'
          }`);
          break;
        case listMethod.indexOf:
          console.log(`查找的元素 ${args[0]} 的索引为 ${
            tar[prop](args[0])
          }`);
          break;
        case listMethod.isEmpty:
          console.log(`链表${tar[prop]() ? '为' : '不为'}空\n`);
          break;
        case listMethod.size:
          console.log(`链表的长度为 ${tar[prop]()}`);
          break;
        case listMethod.getHead:
          console.log(`\n链表的头结点为：`);
          console.log(tar[prop]());
          break;
        case listMethod.print:
          return tar[prop]();
        default: break;
      }
    };
  }
});

list.isEmpty();      // => 链表为空

list.push(3);        // => 添加元素 3 成功
list.push(7);        // => 添加元素 7 成功
list.push(1);        // => 添加元素 1 成功
list.push(5);        // => 添加元素 5 成功

list.print();        // => 链表元素如下：
                     // => 0: 3
                     // => 1: 7
                     // => 2: 1
                     // => 3: 5

list.isEmpty();      // => 链表不为空

list.removeAt(100);  // => 删除位置 100 处的元素 失败
list.removeAt(2);    // => 删除位置 2 处的元素 成功

list.print();        // => 链表元素如下：
                     // => 0: 3
                     // => 1: 1
                     // => 2: 5

list.remove(99);     // => 删除元素 99 失败
list.remove(3);      // => 删除元素 3 成功

list.print();        // => 链表元素如下：
                     // => 0: 1
                     // => 1: 5

list.insert(20, 12); // => 在位置 20 处插入元素 12 失败，插入位置不合法
list.insert(3, 10);  // => 在位置 3 处插入元素 10 成功

list.print();        // => 链表元素如下：
                     // => 0: 1
                     // => 1: 5
                     // => 2: 10

list.insert(1, 9);   // => 在位置 1 处插入元素 9 成功

list.print();        // => 链表元素如下：
                     // => 0: 9
                     // => 1: 1
                     // => 2: 5
                     // => 3: 10

list.indexOf(3);     // => 查找的元素 3 的索引为 -1
list.indexOf(5);     // => 查找的元素 5 的索引为 2

list.getHead();      // => 链表的头结点为：
                     // => {
                     // =>   elem: 9,
                     // =>   next: { elem: 1, next: { elem: 5, next: [Object] } }
                     // => }
```

## 双向链表

