class NodeItem<E> {
  public e: any;
  public left: any;
  public right: any;

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

  /**
   * 添加一个树节点
   * @param {number} e 要添加的值
   * @param {Object} node 树的节点（递归辅助参数）
   * @return {Object} 新添加的节点 | 已经存在的某个节点
   */
  public add(e: E, node = this.root): NodeItem<E> {
    const ret = new NodeItem(e);

    if (node === null) {
      if (this.root === null) {
        this.root = ret;
      }

      this.size += 1;
      return ret;
    }

    if (e < node.e) {
      node.left = this.add(e, node.left);
    } else if (e > node.e) {
      node.right = this.add(e, node.right);
    }

    return node;
  }

  /**
   * 检查树中是否包含某个节点值
   * @param {number} e 要检查的值
   * @param {Object} node 树的节点
   * @return {boolean}
   */
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

  // 前序遍历（递归）
  public preOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    console.log(node.e);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  // 中序遍历（递归）
  public midOrder(node = this.root): void {
    if (node === null) {
      return;
    }

    this.midOrder(node.left);
    console.log(node.e);
    this.midOrder(node.right);
  }

  // 后序遍历（递归）
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

  /**
   * 获取最小值
   * @param {Object} node 树的节点
   * @return {Object} 最小节点的值
   */
  public getMin(node = this.root): NodeItem<E> {
    if (this.size === 0) {
      throw new Error('BST is Empty.');
    }

    if (node.left === null) {
      return node;
    }

    return this.getMin(node.left);
  }

  /**
   * 获取最大值
   * @param {Object} node 树的节点
   * @return {number} 最大节点的值
   */
  public getMax(node = this.root): NodeItem<E> {
    if (this.size === 0) {
      throw new Error('BST is Empty.');
    }

    if (node.right === null) {
      return node;
    }

    return this.getMax(node.right);
  }

  /**
   * 删除最小节点（递归）
   * @param {Object} node 树的节点（递归辅助参数）
   * @return {Object} 被删除节点的右孩子 | 修改过左右孩子后的节点（递归用）
   */
  public delMin(node = this.root): NodeItem<E> {
    if (this.size === 0) {
      throw new Error('BST is Empty.');
    }

    if (node.left === null) {
      const right = node.right;
      node.right = null;
      this.size -= 1;
      return right;
    }

    node.left = this.delMin(node.left);
    return node;
  }

  /**
   * 删除最大节点（递归）
   * @param {Object} node 树的节点
   * @return {Object} 被删除节点的左孩子 | 修改过左右孩子后的节点（递归用）
   */
  public delMax(node = this.root): NodeItem<E> {
    if (this.size === 0) {
      throw new Error('BST is Empty.');
    }

    if (node.right === null) {
      const left = node.left;
      node.left = null;
      this.size -= 1;
      return left;
    }

    node.right = this.delMax(node.right);
    return node;
  }

  /**
   * 删除树中任意指定元素
   * @param {number} e 待删除的元素值
   * @param {Object} node
   */
  public del(e: E, node = this.root): NodeItem<E> {
    if (this.size === 0) {
      throw new Error('BST is Empty.');
    }

    if (e < node.e) {
      node.left = this.del(e, node.left);
      return node;
    } else if (e > node.e) {
      node.right = this.del(e, node.right);
      return node;
    }

    if (node.left === null) {
      const right = node.right;
      node.right = null;
      this.size -= 1;
      return right;
    }

    if (node.right === null) {
      const left = node.left;
      node.left = null;
      this.size -= 1;
      return left;
    }

    const replace = new NodeItem(this.getMin(node.right).e);
    replace.left = node.left;
    replace.right = this.delMin(node.right);
    node.left = node.right = null;

    return replace;
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

const minNode = bst.getMin();
console.log(`Min: `, minNode.e);

const maxNode = bst.getMax();
console.log(`Max: `, maxNode.e);

bst.delMin();
console.log('Del min: ');
bst.levelOrder();

bst.delMax();
console.log('Del max: ');
bst.levelOrder();

bst.del(2);
console.log('Del 2: ');
bst.levelOrder();
