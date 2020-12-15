function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, l, r) {
  // 随机选取 [0, r - l] 之间的数
  const p = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(arr, l, p);

  let i = l + 1;
  let j = r;
  while (true) {
    while (i <= j && arr[i] < arr[l]) i++;
    while (i <= j && arr[j] > arr[l]) j--;

    if (i >= j) break;

    swap(arr, i, j);
    i++;
    j--;
  }

  swap(arr, l, j);

  return j;
}

function quickSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) return;

  const pivot = partition(arr, l, r);
  quickSort(arr, l, pivot - 1);
  quickSort(arr, pivot + 1, r);
}

// **************************************************
// 下面是测试代码
// **************************************************

let arr = [];
// 数据规模
const n = 10000 * 100;

// 生成随机数据
function genRandomData(arr, n) {
  arr.length = 0;
  for (let i = 0; i < n; i++) arr.push(Math.floor(Math.random() * n));
}

// 生成已经排好序的数据
function genRegularData(arr, n) {
  arr.length = 0;
  for (let i = 0; i < n; i++) arr.push(i);
}

// 生成所有值相等的数据
function genSameData(arr, n) {
  arr.length = 0;
  for (let i = 0; i < n; i++) arr.push(0);
}

// 检查是否排好序
function isSorted(arr, n) {
  for (let i = 1; i < n; i++) if (arr[i - 1] > arr[i]) return false;
  return true;
}

// 测试随机数据
genRandomData(arr, n);
console.time();
quickSort(arr);
console.timeEnd();
console.log(`sorted :`, isSorted(arr, n));

// 测试已经排好序的数据
genRegularData(arr, n);
console.time();
quickSort(arr);
console.timeEnd();
console.log(`sorted :`, isSorted(arr, n));

// 测试所有值相等的数据
genSameData(arr, n);
console.time();
quickSort(arr);
console.timeEnd();
console.log(`sorted :`, isSorted(arr, n));

/**
 * 测试环境：Node.js v12
 * 测试结果：
 *  - 随机数据：任意量级的数据都可排序。
 *  - 有序数据：任意量级的数据都可排序。
 *  - 等值数据：任意量级的数据都可排序。
 */
