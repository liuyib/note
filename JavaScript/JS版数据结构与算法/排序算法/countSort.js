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

// 优化后的计数排序
function count_sort2(arr) {
  // 计算最小值
  var min = arr[0];
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }
  var d = max - min;

  // 创建统计数组，统计元素个数
  var c = new Array(d).fill(0);
  for (var i = 0; i < arr.length; i++) {
    // 元素在统计数组中的相对位置
    var j = arr[i] - min;
    c[j] >= 1 ? c[j]++ : c[j] = 1;
  }

  // 改造数组，使得每个元素都等于它前面元素之和
  for (var i = 1; i < d + 1; i++) {
    c[i] += c[i - 1];
  }

  // 倒序遍历原始数据，根据统计数组找到正确位置，输出结果到数组
  var t = new Array(arr.length).fill(0);
  for (var i = arr.length - 1; i >= 0; i--) {
    var j = arr[i] - min;
    t[c[j] - 1] = arr[i];
    // 计数减一
    c[j]--;
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
// var sorted2 = count_sort2(arr);

// 排序执行时间
console.log(new Date().getTime() - time);

// 确认是否排好序
console.log(isSort(sorted));
