class NodeItem<E> {
  elem: any;
  left: any;
  right: any;

  constructor(e?: E) {
    this.elem = e;
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

    if (e < node.elem) {
      node.left = this.addItem(e, node.left);
    } else if (e > node.elem) {
      node.right = this.addItem(e, node.right);
    }

    // 节点值相同不做操作，即不会包含重复节点。
    return node;
  }

  public contains(e: E): boolean {
    return this.containsItem(e, this.root);
  }

  private containsItem(e: E, node: NodeItem<E>): boolean {
    if (node === null) {
      return false;
    }

    if (e < node.elem) {
      return this.containsItem(e, node.left);
    } else if (e > node.elem) {
      return this.containsItem(e, node.right);
    }

    return true;
  }

  public preOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    console.log(node.elem);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  public midOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    this.midOrder(node.left);
    console.log(node.elem);
    this.midOrder(node.right);
  }

  public sufOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    this.sufOrder(node.left);
    this.sufOrder(node.right);
    console.log(node.elem);
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
      console.log(e.elem);

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

    while (cur !== null && stack.length !== 0) {
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
        console.log(cur.elem);

        // 如果有右节点，则回溯之后，从右节点开始递归上述操作
        if (cur.right !== null) {
          stack.push(cur.right);
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
    stack.push(this.root);

    while (cur !== null && stack.length !== 0) {
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
          stack.push(cur);
          // 对所有右子树，递归进行上述操作
          const rightChildTree = JSON.parse(JSON.stringify(cur.right));
          stack.push(rightChildTree);
          // 将右节点置空，防止回溯时进入 if 逻辑
          cur.right = null;
        } else {
          console.log(cur.elem);
        }
      }
    }
  }
}

const bst = new BST();

bst.add(5);
bst.add(3);
bst.add(8);
bst.add(1);
bst.add(9);
bst.add(0);

console.log(`bst.contains(666)`, bst.contains(666)); // => false
console.log(`bst.contains(3)`, bst.contains(3)); // => true

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
