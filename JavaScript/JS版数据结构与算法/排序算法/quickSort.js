// 快速排序（双向循环法、递归实现）
function quick_sort(arr, startIndex, endIndex) {
  // 递归结束条件
  if (startIndex >= endIndex) return;

  // 获取基准元素的位置
  var pivotIndex = partition(arr, startIndex, endIndex);

  // 根据基准元素的位置，分两部分进行排序
  quick_sort(arr, startIndex, pivotIndex - 1);
  quick_sort(arr, pivotIndex + 1, endIndex);
};

function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// 分治（双向循环法）
function partition(arr, startIndex, endIndex) {
  // 随机选取基准元素
  var pivot = arr[startIndex];
  var left = startIndex;
  var right = endIndex;
  
  while (left != right) {
    while (arr[left] <= pivot && left < right) {
      left++;
    }

    while (arr[right] > pivot && left < right) {
      right--;
    }

    // 交换左右指针处的元素
    if (left < right) {
      swap(arr, left, right);
    }
  }

  // 基准元素和重合点元素交换
  arr[startIndex] = arr[left];
  arr[left] = pivot;

  return left;
}

// 快速排序（单向循环法、递归实现）
function quick_sort2(arr, startIndex, endIndex) {
  if (startIndex >= endIndex) return;
  
  var pivotIndex = partition2(arr, startIndex, endIndex);

  quick_sort2(arr, startIndex, pivotIndex - 1);
  quick_sort2(arr, pivotIndex + 1, endIndex);
};

// 分治（单向循环法）
function partition2(arr, startIndex, endIndex) {
  // 获取基准元素
  var pivot = arr[startIndex];
  var mark = startIndex;

  for (var i = startIndex + 1; i <= endIndex; i++) {
    if (arr[i] < pivot) {
      mark++;
      
      var tmp = arr[mark];
      arr[mark] = arr[i];
      arr[i] = tmp;
    }
  }

  arr[startIndex] = arr[mark];
  arr[mark] = pivot;

  return mark;
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
var len = 10000;
// var len = 10000 * 1000;
var arr = [];

// 随机 0~len 之间的数
for (var k = 0; k < len; k++) {
  var num = parseInt(Math.random() * len);
  arr.push(num);
}

var time = new Date().getTime();

// 排序
quick_sort(arr, 0, arr.length - 1);
// quick_sort2(arr, 0, arr.length - 1);

// 排序执行时间
console.log(new Date().getTime() - time);

// 确认是否排好序
console.log(isSort(arr));
