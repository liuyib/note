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

  public add(e: E, index: number): void {
    if (index < 0 && index > this.size) {
      throw new Error('Add failed. Illegal argument: index.');
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
    this.add(e, 0);
  }

  public addLast(e: E): void {
    this.add(e, this.size);
  }

  public toString(): string {
    let res = '';
    let curr = this.head.next;

    while (curr) {
      res += `${curr.e}->`;
      curr = curr.next;
    }
    res += 'NULL';

    return res;
  }
}

const link = new LinkedList();

for (let i = 0; i < 5; i++) {
  link.addFirst(i);
}
console.log(`link:`, link.toString());

for (let i = 5; i < 10; i++) {
  link.addLast(i);
}
console.log(`link:`, link.toString());

for (let i = 10; i < 15; i++) {
  link.add(i, i);
}
console.log(`link:`, link.toString());
```
