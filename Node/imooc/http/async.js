// 异步操作示例
var c = 0;

function myPrint() {
  console.log(c);
}

function plus(callback) {
  setTimeout(function () {
    c++;
    callback();
  }, 1000);
}

plus(myPrint); 