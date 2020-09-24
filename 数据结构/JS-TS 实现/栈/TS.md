```ts
import { LinkedList } from './LinkedList';

class LinkedListStack<E> {
  private link: any;

  constructor() {
    this.link = new LinkedList();
  }

  public getSize(): number {
    return this.link.getSize();
  }

  public isEmpty(): boolean {
    return this.link.isEmpty();
  }

  public push(e: E): void {
    this.link.addLast(e);
  }

  public pop(): E {
    return this.link.delLast();
  }

  public peek(): E {
    return this.link.getLast();
  }

  public print(): void {
    this.link.print();
  }
}

const stack = new LinkedListStack();

stack.push('1');
stack.push('2');
stack.push('3');
stack.print();

console.log(`stack.peek()`, stack.peek());

stack.pop();
stack.pop();
stack.print();
```
