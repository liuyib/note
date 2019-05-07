// 上浮调整（最小堆）
function upAdjust(arr, childIndex) {
  // 获取父节点的索引
  var parentIndex = parseInt((childIndex - 1) / 2);
  var tmp = arr[childIndex];

  while (childIndex > 0 && arr[parentIndex] > tmp) {
    arr[childIndex] = arr[parentIndex];
    childIndex = parentIndex;
    parentIndex = parseInt((parentIndex - 1) / 2);
  }
  arr[childIndex] = tmp;
}

// 下沉调整（最小堆）
function downAdjust(arr, parentIndex, length) {
  var childIndex = parentIndex * 2 + 1;
  var tmp = arr[parentIndex];

  while (childIndex < length) {
    // 如果有右孩子，并且右孩子小于左孩子，则定位到右孩子
    if (childIndex + 1 < length && arr[childIndex] > arr[childIndex + 1]) {
      childIndex++;
    }

    // 父节点小于等于任何一个子节点的值，直接跳出
    if (tmp <= arr[childIndex]) {
      break;
    }

    arr[parentIndex] = arr[childIndex];
    parentIndex = childIndex;
    childIndex = childIndex * 2 + 1;
  }
  arr[parentIndex] = tmp;
}

// 构建堆（最小堆）
function buildHeap(arr) {
  var len = arr.length;
  // 从最后一个非叶子节点开始，依次做 “下沉” 调整
  for (var i = parseInt((len - 2) / 2); i >= 0; i--) {
    downAdjust(arr, i, len);
  }
}

var arr = [7, 1, 3, 10, 5, 2, 8, 9, 6];
var arr2 = [1, 3, 2, 6, 5, 7, 8, 9, 10, 0];

buildHeap(arr);
console.log(arr);  // 正确结果应该是：[1, 5, 2, 6, 7, 3, 8, 9, 10]

upAdjust(arr2, arr2.length - 1);
console.log(arr2); // 正确结果应该是：[0, 1, 2, 6, 3, 7, 8, 9, 10, 5]
