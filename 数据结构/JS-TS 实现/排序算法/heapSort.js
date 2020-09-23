// 堆排序（升序）
function heap_sort(arr) {
  var len = arr.length;
  // 构建最大堆
  for (var i = parseInt((len - 2) / 2); i >= 0; i--) {
    downAdjust(arr, i, len);
  }

  for (var i = len - 1; i > 0; i--) {
    // 把最大的元素（首元素）放在最后
    var tmp = arr[i];
    arr[i] = arr[0];
    arr[0] = tmp;

    // 通过 “下沉”，将剩余元素中的最大元素调整到堆顶
    downAdjust(arr, 0, i);
  }
}

// 下沉调整（最大堆）
function downAdjust(arr, parentIndex, length) {
  var childIndex = parentIndex * 2 + 1;
  var tmp = arr[parentIndex];

  while (childIndex < length) {
    // 如果有右孩子，并且右孩子大于左孩子，则定位到右孩子
    if (childIndex + 1 < length && arr[childIndex] < arr[childIndex + 1]) {
      childIndex++;
    }

    // 父节点大于等于任何一个子节点的值，直接跳出
    if (tmp >= arr[childIndex]) {
      break;
    }

    arr[parentIndex] = arr[childIndex];
    parentIndex = childIndex;
    childIndex = childIndex * 2 + 1;
  }
  arr[parentIndex] = tmp;
}

var arr = [7, 4, 6, 2, 5, 10, 8, 9, 3];

heap_sort(arr);

console.log("排序后的数组为：");
console.log(arr); // [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
