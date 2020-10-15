class NodeItem {
  constructor(e) {
    this.e = e;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  /**
   * 添加一个树节点
   * @param {number} e 要添加的值
   * @param {Object} node 树的节点
   * @return {Object} 新添加的节点 | 修改过左右孩子后的节点
   */
  add(e, node = this.root) {
    if (node === null) {
      const ret = new NodeItem(e);

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
  contains(e, node = this.root) {
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
  preOrder(node = this.root) {
    if (node === null) return;

    console.log(node.e);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  // 中序遍历（递归）
  midOrder(node = this.root) {
    if (node === null) return;

    this.midOrder(node.left);
    console.log(node.e);
    this.midOrder(node.right);
  }

  // 后序遍历（递归）
  sufOrder(node = this.root) {
    if (node === null) return;

    this.sufOrder(node.left);
    this.sufOrder(node.right);
    console.log(node.e);
  }

  // 前序遍历（非递归）
  preOrderNR() {
    if (this.root === null) return;

    const stack = [];
    stack.push(this.root);

    while (stack.length !== 0) {
      const cur = stack.pop();
      console.log(cur.e);

      if (cur.right !== null) {
        stack.push(cur.right);
      }
      if (cur.left !== null) {
        stack.push(cur.left);
      }
    }
  }

  // 中序遍历（非递归）
  midOrderNR() {
    if (this.root === null) return;

    const stack = [];
    let cur = JSON.parse(JSON.stringify(this.root));
    stack.push(cur);

    while (stack.length !== 0) {
      if (cur.left !== null) {
        stack.push(cur.left);
        cur = cur.left;
      } else {
        cur = stack.pop();
        cur.left = null;
        console.log(cur.e);

        if (cur.right !== null) {
          stack.push(cur.right);
          cur = cur.right;
        }
      }
    }
  }

  // 后序遍历（非递归）
  sufOrderNR() {
    if (this.root === null) return;

    const stack = [];
    let cur = JSON.parse(JSON.stringify(this.root));
    stack.push(cur);

    while (stack.length !== 0) {
      if (cur.left !== null) {
        stack.push(cur.left);
        cur = cur.left;
      } else {
        cur = stack.pop();
        cur.left = null;

        if (cur.right !== null) {
          stack.push(new NodeItem(cur.e));
          stack.push(cur.right);
          cur = cur.right;
        } else {
          console.log(cur.e);
        }
      }
    }
  }

  // 层序遍历
  levelOrder() {
    if (this.root === null) return;

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
  getMin(node = this.root) {
    if (this.size === 0) {
      throw new Error('BST is Empty.');
    }

    if (node && node.left === null) {
      return node;
    }

    return this.getMin(node.left);
  }

  /**
   * 获取最大值
   * @param {Object} node 树的节点
   * @return {number} 最大节点的值
   */
  getMax(node = this.root) {
    if (this.size === 0) {
      throw new Error('BST is Empty');
    }

    if (node && node.right === null) {
      return node;
    }

    return this.getMax(node.right);
  }

  /**
   * 删除最小节点（递归）
   * @param {Object} node 树的节点
   * @return {Object} 被删除节点的右孩子 | 修改过左右孩子后的节点
   */
  delMin(node = this.root) {
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
   * @return {Object} 被删除节点的左孩子 | 修改过左右孩子后的节点
   */
  delMax(node = this.root) {
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
  del(e, node = this.root) {
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

    // 左节点为空，直接把右节点替代当前节点
    if (node.left === null) {
      const right = node.right;
      node.right = null;
      this.size -= 1;
      return right;
    }

    // 右节点为空，直接把左节点替代当前节点
    if (node.right === null) {
      const left = node.left;
      node.left = null;
      this.size -= 1;
      return left;
    }

    // 左右节点都不为空，用右子树中最小的节点替换当前节点
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
