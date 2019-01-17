// 事件驱动示例

window.onload = function () {
  var oBtn = document.getElementById('oBtn');

  function my_test() {
    console.log('我是一个事件驱动函数');
  }

  oBtn.addEventListener('click', my_test);
};