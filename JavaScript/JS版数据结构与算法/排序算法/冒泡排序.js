// 未经过优化的冒泡排序
Array.prototype.bubble_sort = function () {
  for (var i = 0; i < this.length - 1; i++) {
    for (var j = 0; j < this.length - i - 1; j++) {
      var tmp = 0;

      if (this[j] > this[j + 1]) {
        tmp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = tmp;
      }
    }
  }
}

// 加标志位优化
Array.prototype.bubble_sort2 = function () {
  for (var i = 0; i < this.length - 1; i++) {
    // 数组是否已经排好序
    var isSorted = true;

    for (var j = 0; j < this.length - i - 1; j++) {
      var tmp = 0;

      if (this[j] > this[j + 1]) {
        tmp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = tmp;
        // 只要有元素交换，都将标记转为 false
        isSorted = false;
      }
    }

    if (isSorted) break;
  }
}

// 加有序区优化
Array.prototype.bubble_sort3 = function () {
  //记录最后一次交换的位置
  var lastExchangeIndex = 0;
  var sortBorder = this.length - 1;
  var tmp = 0;

  for (var i = 0; i < this.length - 1; i++) {
    // 数组是否已经排好序
    var isSorted = true;

    for (var j = 0; j < sortBorder; j++) {
      if (this[j] > this[j + 1]) {
        tmp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = tmp;
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
Array.prototype.cocktail_sort = function () {
	var i, left = 0, right = this.length - 1;
  var temp;

	while (left < right) {
    var isSorted = true;

		for (i = left; i < right; i++) {
      if (this[i] > this[i + 1]) {
				temp = this[i];
				this[i] = this[i + 1];
        this[i + 1] = temp;
        isSorted = false;
			}
    }
    right--;

		for (i = right; i > left; i--) {
      if (this[i - 1] > this[i]) {
				temp = this[i];
				this[i] = this[i - 1];
        this[i - 1] = temp;
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
// arr.bubble_sort();
// arr.bubble_sort2();
arr.bubble_sort3();
// arr.cocktail_sort();

// 排序执行时间
console.log(new Date().getTime() - time);

// 确认是否排好序
console.log(isSort(arr));
