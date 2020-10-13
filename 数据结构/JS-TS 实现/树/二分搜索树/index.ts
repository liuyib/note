class NodeItem<E> {
  e: any;
  left: any;
  right: any;

  constructor(e?: E) {
    this.e = e;
    this.left = null;
    this.right = null;
  }
}

class BST<E> {
  private root: any;
  private size: number;

  constructor() {
    this.root = null;
    this.size = 0;
  }

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public add(e: E): void {
    this.root = this.addItem(e, this.root);
  }

  private addItem(e: E, node: NodeItem<E>): NodeItem<E> {
    if (node === null) {
      this.size += 1;
      return new NodeItem(e);
    }

    if (e < node.e) {
      node.left = this.addItem(e, node.left);
    } else if (e > node.e) {
      node.right = this.addItem(e, node.right);
    }

    // 节点值相同不做操作，即不会包含重复节点。
    return node;
  }

  public contains(e: E, node = this.root): boolean {
    if (node === null) {
      return false;
    }

    if (e < node.e) {
      return this.contains(e, node.left);
    } else if (e > node.e) {
      return this.contains(e, node.right);
    }

    return true;
  }

  public preOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    console.log(node.e);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  public midOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    this.midOrder(node.left);
    console.log(node.e);
    this.midOrder(node.right);
  }

  public sufOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    this.sufOrder(node.left);
    this.sufOrder(node.right);
    console.log(node.e);
  }

  // 前序遍历（非递归）
  public preOrderNR(): void {
    if (this.root === null) {
      return;
    }

    const stack = [];
    stack.push(this.root);

    while (stack.length !== 0) {
      const e = stack.pop();
      console.log(e.e);

      if (e.right !== null) {
        stack.push(e.right);
      }
      if (e.left !== null) {
        stack.push(e.left);
      }
    }
  }

  // 中序遍历（非递归）
  public midOrderNR(): void {
    if (this.root === null) {
      return;
    }

    const stack = [];
    let cur = JSON.parse(JSON.stringify(this.root));
    stack.push(cur);

    while (stack.length !== 0) {
      // 先找到最深的左节点
      if (cur.left !== null) {
        stack.push(cur.left);
        cur = cur.left;
      }
      // 找到 NULL 为止
      else {
        cur = stack.pop();
        // 将左节点置空，防止回溯的时候进入 if 逻辑
        cur.left = null;
        console.log(cur.e);

        // 如果有右节点，则回溯之后，从右节点开始递归上述操作
        if (cur.right !== null) {
          stack.push(cur.right);
          cur = cur.right;
        }
      }
    }
  }

  // 后序遍历（非递归）
  public sufOrderNR(): void {
    if (this.root === null) {
      return;
    }

    const stack = [];
    let cur = JSON.parse(JSON.stringify(this.root));
    stack.push(cur);

    while (stack.length !== 0) {
      // 先找到最深的左节点
      if (cur.left !== null) {
        stack.push(cur.left);
        cur = cur.left;
      }
      // 找到 NULL 为止
      else {
        cur = stack.pop();
        // 将左节点置空，防止回溯的时候进入 if 逻辑
        cur.left = null;

        if (cur.right !== null) {
          // 当前节点存在右节点，则当前节点先入栈，后续再输入
          stack.push(new NodeItem(cur.e));
          // 右节点入栈，然后递归执行上述操作
          stack.push(cur.right);
          cur = cur.right;
        } else {
          console.log(cur.e);
        }
      }
    }
  }

  // 层序遍历
  public levelOrder(): void {
    if (this.root === null) {
      return;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const cur = queue.shift();
      console.log(cur.e);

      if (cur.left !== null) {
        queue.push(cur.left);
      }

      if (cur.right !== null) {
        queue.push(cur.right);
      }
    }
  }
}

const bst = new BST();

bst.add(6);
bst.add(2);
bst.add(1);
bst.add(4);
bst.add(3);
bst.add(5);
bst.add(8);
bst.add(7);
bst.add(9);

console.log(`bst.contains(666)`, bst.contains(666)); // => false
console.log(`bst.contains(4)`, bst.contains(4)); // => true

console.log('Pre Order: ');
console.log('Recusive: ');
bst.preOrder();
console.log('Non-Recusive: ');
bst.preOrderNR();

console.log('Mid Order: ');
console.log('Recusive: ');
bst.midOrder();
console.log('Non-Recusive: ');
bst.midOrderNR();

console.log('Suf Order: ');
console.log('Recusive: ');
bst.sufOrder();
console.log('Non-Recusive: ');
bst.sufOrderNR();

console.log('Level Order: ');
bst.levelOrder();
