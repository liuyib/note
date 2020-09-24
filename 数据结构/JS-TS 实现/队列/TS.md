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

export class LinkedListQueue<E> {
  /**
   * 真实头结点、真实尾结点
   * 例如（ O 表示链表节点 ）：
   *   head      tail
   *    ↓         ↓
   *    O -> O -> O -> NULL
   */
  private head: any;
  private tail: any;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public enqueue(e: E): void {
    const node = new NodeItem(e, null);

    if (!this.tail) {
      this.tail = node;
      this.head = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size += 1;
  }

  public dequeue(): E {
    if (this.isEmpty()) {
      throw new Error('Cannot dequeue from an empty queue.');
    }

    const head = this.head;
    this.head = head.next;
    head.next = null;

    if (!this.head) {
      this.tail = null;
    }

    this.size -= 1;
    return head;
  }

  public print(): void {
    let head = this.head;
    let res = '';

    while (head !== null) {
      res += `${head.e}->`;
      head = head.next;
    }
    res += 'NULL';
    console.log(res);
  }
}

const queue = new LinkedListQueue();

console.log(`queue.getSize()`, queue.getSize());
console.log(`queue.isEmpty()`, queue.isEmpty());

for (let i = 0; i < 5; i++) {
  queue.enqueue(i);
}

queue.print();

queue.dequeue();
queue.dequeue();
queue.dequeue();

queue.print();
```
