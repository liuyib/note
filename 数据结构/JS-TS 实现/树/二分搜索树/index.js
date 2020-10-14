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

  add(e) {
    this.root = this.addItem(e, this.root);
  }

  addItem(e, node) {
    if (node === null) {
      this.size += 1;
      return new NodeItem(e);
    }

    if (e < node.e) {
      node.left = this.addItem(e, node.left);
    } else if (e > node.e) {
      node.right = this.addItem(e, node.right);
    }

    return node;
  }

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

  preOrder(node = this.root) {
    if (node === null) return;

    console.log(node.e);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  midOrder(node = this.root) {
    if (node === null) return;

    this.midOrder(node.left);
    console.log(node.e);
    this.midOrder(node.right);
  }

  sufOrder(node = this.root) {
    if (node === null) return;

    this.sufOrder(node.left);
    this.sufOrder(node.right);
    console.log(node.e);
  }

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
