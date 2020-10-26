/**
 * 未经任何优化的冒泡排序
 */
function bubbleSort(arr) {
  if (arr.length <= 1) return arr;

  const arrLen = arr.length;

  for (let i = 0; i < arrLen; i++) {
    for (let j = 0; j < arrLen; j++) {
      if (j + 1 < arrLen && arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

/**
 * 优化点 1：减少循环次数
 */
function bubbleSort(arr) {
  if (arr.length <= 1) return arr;

  const arrLen = arr.length;

  // 外层只需要循环 arrLen - 1 即可
  // 因为最后一次循环还剩一个元素，其必定有序
  for (let i = 0; i < arrLen - 1; i++) {
    // 排序一次，数组最后就会多一个排好序的数据
    // 所以，每次内层循环可以减去循环次数
    // 再减去 1，就可以省去数组越界的判断逻辑
    for (let j = 0; j < arrLen - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

/**
 * 优化点 2：当前数组已经有序（加标志位判断），则直接退出
 */
function bubbleSort(arr) {
  if (arr.length <= 1) return arr;

  const arrLen = arr.length;

  for (let i = 0; i < arrLen - 1; i++) {
    let isSorted = true;

    for (let j = 0; j < arrLen - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        isSorted = false;

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }

    if (isSorted) break;
  }

  return arr;
}

/**
 * 优化点 3：加有序区优化（右边有序区）
 * 注意    ：左边有序区是无法实现的，因为那会改变冒泡排序的时间复杂度。
 */
function bubbleSort(arr) {
  //记录最后一次交换的位置
  let lastExchangeIndex = 0;
  // 无序区的边界
  let sortBorder = arr.length - 1;
  let tmp = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    // 数组是否已经排好序
    let isSorted = true;

    for (let j = 0; j < sortBorder; j++) {
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

/**
 * 鸡尾酒排序（冒泡排序的升级版）
 */
function cocktailSort(arr) {
  let i;
  let left = 0;
  let right = arr.length - 1;
  let temp;

  while (left < right) {
    let isSorted = true;

    for (i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        isSorted = false;
      }
    }
    right -= 1;

    for (i = right; i > left; i--) {
      if (arr[i - 1] > arr[i]) {
        temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;
        isSorted = false;
      }
    }
    left += 1;

    if (isSorted) break;
  }

  return arr;
}

// ==========================================
// 测试
// ==========================================

// 数组是否排好序
function isSort(arr) {
  let t = true;
  for (let i = 0; i < arr.length - 2; i++) if (arr[i] > arr[i + 1]) t = false;

  return t;
}

let len = 10000 * 10;
let arr = [];

// 随机 0~len 之间的数
for (let k = 0; k < len; k++) {
  let num = parseInt(Math.random() * len);
  arr.push(num);
}

let time = new Date().getTime();

// 排序
// bubble_sort(arr);
// bubble_sort2(arr);
bubble_sort3(arr);
// cocktail_sort(arr);

// 排序执行时间
console.log(new Date().getTime() - time);

// 确认是否排好序
console.log(isSort(arr));
