class Queue {
  constructor() {
    this.items = [];
  }

  push(...elems) {
    this.items.push(...elems)
  }

  shift() {
    return this.isEmpty() ? undefined : this.items.shift();
  }

  getFirst() {
    return this.isEmpty() ? undefined : this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(`-${this.items.toString()}-`);
  }
}

// 击鼓传花
function passTheParcel(names, num = 1) {
  if (!names.length) return;

  let q = new Queue();
  let eliminated = ''; // 被淘汰的选手

  // 将选手姓名添加进队列
  names.forEach(name => {
    q.push(name);
  });

  while (q.size() > 1) {
    for (let i = 0; i < num; i++) {
      q.push(q.shift());    // 花传了 num 次（现在花位于队列头部）
    }

    eliminated = q.shift(); // 队列头部的那个人被淘汰
    console.log(`${eliminated} 在击鼓传花游戏中被淘汰。`);
  }

  return q.shift();         // 还剩一个人，即胜利者
}

let names = ['zhangsan', 'lisi', 'wangwu', 'liuyibo'];
let winner = passTheParcel(names, 3);

console.log(`胜利者是：${winner}`);
