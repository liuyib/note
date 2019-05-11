// 未经过优化的冒泡排序
function bubble_sort(arr) {
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
}

// 加标志位优化
function bubble_sort2(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    // 数组是否已经排好序
    var isSorted = true;

    for (var j = 0; j < arr.length - i - 1; j++) {
      var tmp = 0;

      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        // 只要有元素交换，都将标记转为 false
        isSorted = false;
      }
    }

    if (isSorted) break;
  }
}

// 加有序区优化
function bubble_sort3(arr) {
  //记录最后一次交换的位置
  var lastExchangeIndex = 0;
  // 无序区的边界
  var sortBorder = arr.length - 1;
  var tmp = 0;

  for (var i = 0; i < arr.length - 1; i++) {
    // 数组是否已经排好序
    var isSorted = true;

    for (var j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        // 只要有元素交换，都将标记转为 false
        isSorted = false;
        lastExchangeIndex = j;
      }
    }
    sortBorder = lastExchangeIndex;

    if (isSorted) break;
  }
}

// 鸡尾酒排序（冒泡排序的升级版）
function cocktail_sort(arr) {
	var i, left = 0, right = arr.length - 1;
  var temp;

	while (left < right) {
    var isSorted = true;

		for (i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) {
				temp = arr[i];
				arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        isSorted = false;
			}
    }
    right--;

		for (i = right; i > left; i--) {
      if (arr[i - 1] > arr[i]) {
				temp = arr[i];
				arr[i] = arr[i - 1];
        arr[i - 1] = temp;
        isSorted = false;
			}
    }
    left++;

    if (isSorted) break;
  }
};

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

var len = 10000 * 10;
var arr = [];

// 随机 0~len 之间的数
for (var k = 0; k < len; k++) {
  var num = parseInt(Math.random() * len);
  arr.push(num);
}

var time = new Date().getTime();

// 排序
// bubble_sort(arr);
// bubble_sort2(arr);
bubble_sort3(arr);
// cocktail_sort(arr);

// 排序执行时间
console.log(new Date().getTime() - time);

// 确认是否排好序
console.log(isSort(arr));
