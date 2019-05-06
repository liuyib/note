// 未经过优化的冒泡排序
function sort(arr) {
  var time = new Date().getTime();

  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      var tmp = 0;

      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }

  console.log(new Date().getTime() - time);
}

// 加标志位优化
function sort2(arr) {
  var time = new Date().getTime();

  for (var i = 0; i < arr.length - 1; i++) {
    var isSorted = true; // 数组是否已经排好序

    for (var j = 0; j < arr.length - i - 1; j++) {
      var tmp = 0;

      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        isSorted = false; // 只要有元素交换，都将标记转为 false
      }
    }

    if (isSorted) break;
  }

  console.log(new Date().getTime() - time);
}

// 加有序区优化
function sort3(arr) {
  var time = new Date().getTime();

  for (var i = 0; i < arr.length - 1; i++) {
    var isSorted = true; // 数组是否已经排好序
    var sortBorder = arr.length - 1;

    for (var j = 0; j < sortBorder; j++) {
      var tmp = 0;

      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        isSorted = false; // 只要有元素交换，都将标记转为 false
        sortBorder = j;
      }
    }

    if (isSorted) break;
  }

  console.log(new Date().getTime() - time);
}

// 鸡尾酒排序（冒泡排序优化）
function sort4(arr) {
  var time = new Date().getTime();

  for (var i = 0; i < arr.length - 1; i++) {
    var isSorted = true; // 数组是否已经排好序
    var tmp = 0;
    var sortBorder = arr.length - 1;

    for (var j = i; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        isSorted = false; // 只要有元素交换，都将标记转为 false
        sortBorder = j;
      }
    }

    isSorted = true;
    sortBorder = arr.length - i - 1;
    for (var j = sortBorder; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
        isSorted = false;
        sortBorder = j;
      }
    }

    if (isSorted) break;
  }

  console.log(new Date().getTime() - time);
}

// var arr = [3, 4, 2, 1, 5, 6, 7, 8];
var len = 100000;

var arr = [];
for (var k = 0; k < len; k++) {
  arr.push(parseInt(Math.random() * len));
}

// sort(arr);  // 平均 14.4 s
// sort2(arr); // 平均 14.2 s
// sort3(arr); // 平均 35 ms
// sort4(arr); // 平均 9.5 s

// console.log(arr);