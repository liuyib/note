// 计数排序
function count_sort(arr) {
  var c = [];
  for (var i = 0; i < arr.length; i++) {
    var j = arr[i];

    c[j] >= 1 ? c[j]++ : c[j] = 1;
  }

  // 存放排序结果
  var t = [];
  for (var i = 0; i < c.length; i++) {
    while (c[j] && c[i] > 0) {
      t.push(i);
      c[i]--;
    }
  }

  return t;
}

// ==========================================
// 测试
// ==========================================

// 数组是否排好序
function isSort(arr) {
  var t = true;
  for (var i = 0; i < arr.length - 2; i++)
    if (arr[i] > arr[i + 1])
      t = false;

  return t;
}

// 千万级测试数据
var len = 10000 * 1000;
var arr = [];

// 随机 0~len 之间的数
for (var k = 0; k < len; k++) {
  var num = parseInt(Math.random() * len);
  arr.push(num);
}

var time = new Date().getTime();

// 排序
var sorted = count_sort(arr);

// 排序执行时间
console.log(new Date().getTime() - time);

// 确认是否排好序
console.log(isSort(sorted));
