function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, l, r) {
  // 随机选取 [0, r - l] 之间的数
  const p = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(arr, l, p);

  let lt = l;
  let i = l + 1;
  let gt = r + 1;

  while (i < gt) {
    if (arr[i] < arr[l]) {
      swap(arr, i, lt + 1);
      lt++;
      i++;
    } else if (arr[i] > arr[l]) {
      swap(arr, i, gt - 1);
      gt--;
    } else {
      i++;
    }
  }

  swap(arr, l, lt);

  return { lt: lt - 1, gt };
}

function quickSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) return;

  const { lt, gt } = partition(arr, l, r);
  quickSort(arr, l, lt);
  quickSort(arr, gt, r);
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
 *  - 等值数据：任意量级的数据都可排序。时间复杂度为 O(N) 级别，特别快。
 */
