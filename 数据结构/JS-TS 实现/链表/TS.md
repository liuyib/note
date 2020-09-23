## 单向链表

```ts
/**
 * 链表节点
 */
class NodeItem<E> {
  public e: any;
  public next: any;

  constructor(e?: E, next?: any) {
    this.e = e;
    this.next = next;
  }
}

/**
 * 单向链表（只有头结点）
 */
class LinkedList<E> {
  private head: any;
  private size: any;

  constructor() {
    this.head = new NodeItem();
    this.size = 0;
  }

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public add(index: number, e: E): void {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed. Illegal index');
    }

    let prev: NodeItem<E> = this.head;
    // 找到待插入位置的前一个节点
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }

    prev.next = new NodeItem(e, prev.next);
    this.size += 1;
  }

  public addFirst(e: E): void {
    this.add(0, e);
  }

  public addLast(e: E): void {
    this.add(this.size, e);
  }

  /**
   * 获取链表中，指定索引位置的元素
   * （该操作在链表中不常用，练习用）
   * @param index 索引
   */
  public get(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index');
    }

    let curr: NodeItem<E> = this.head.next;

    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }

    return curr.e;
  }

  public getFirst(): E {
    return this.get(0);
  }

  public getLast(): E {
    return this.get(this.size - 1);
  }

  /**
   * 设置链表中，指定索引位置的元素
   * （该操作在链表中不常用，练习用）
   * @param index 索引
   * @param e 节点的元素值
   */
  public set(index: number, e: E): void {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index');
    }

    let curr: NodeItem<E> = this.head.next;

    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }
    curr.e = e;
  }

  public setFirst(e: E): void {
    this.set(0, e);
  }

  public setLast(e: E): void {
    this.set(this.size - 1, e);
  }

  /**
   * 查找链表中，是否包含某元素
   * @param e 节点的元素值
   */
  public contains(e: E): boolean {
    let curr = this.head.next;

    while (curr !== null) {
      if (curr.e === e) {
        return true;
      }
      curr = curr.next;
    }

    return false;
  }

  /**
   * 在链表中，删除指定为值的节点，并返回被删除的节点值
   * @param index 索引
   */
  public del(index: number): E {
    if (index < 0 || index >= this.size) {
      throw new Error('Del failed. Illegal index');
    }

    let prev = this.head;

    // 找到待删除节点的前一个节点
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }

    const curr = prev.next;
    prev.next = curr.next;
    curr.next = null; // 释放内存
    this.size -= 1;

    return curr.e;
  }

  public delFirst(): E {
    return this.del(0);
  }

  public delLast(): E {
    return this.del(this.size - 1);
  }

  public print(): void {
    let res = '';
    let curr = this.head.next;

    while (curr) {
      res += `${curr.e}->`;
      curr = curr.next;
    }
    res += 'NULL';
    console.log(res);
  }
}

const link = new LinkedList();

for (let i = 0; i < 5; i++) {
  link.addFirst(i);
}
link.print();

for (let i = 5; i < 10; i++) {
  link.addLast(i);
}
link.print();

for (let i = 10; i < 15; i++) {
  link.add(i, i);
}
link.print();

link.set(6, '666');
link.setFirst('zmx');
link.setLast('lyb');

link.print();

console.log(`link.get(6)`, link.get(6));
console.log(`link.getFirst()`, link.getFirst());
console.log(`link.getLast()`, link.getLast());

link.del(6);
link.delFirst();
link.delLast();

link.print();
```
