// 回调函数示例

function learn(something) {
  console.log(something);
}

function we(callback, something) {
  something += ' is cool';
  callback(something);
}

// 传递具名函数
we(learn, "Nodejs"); // => Nodejs is cool

// 传递匿名函数
we(function (something) {
  console.log(something)
}, 'JavaScript') // => JavaScript is cool
