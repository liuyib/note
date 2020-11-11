V8 快排（旧版）：

```js
var GetThirdIndex = function (a, from, to) {
  var t_array = new InternalArray();
  // Use both 'from' and 'to' to determine the pivot candidates.
  var increment = 200 + ((to - from) & 15);
  var j = 0;
  from += 1;
  to -= 1;
  for (var i = from; i < to; i += increment) {
    t_array[j] = [i, a[i]];
    j++;
  }
  t_array.sort(function (a, b) {
    return comparefn(a[1], b[1]);
  });
  var third_index = t_array[t_array.length >> 1][0];
  return third_index;
};

var QuickSort = function QuickSort(a, from, to) {
  var third_index = 0;
  while (true) {
    // Insertion sort is faster for short arrays.
    if (to - from <= 10) {
      InsertionSort(a, from, to);
      return;
    }
    if (to - from > 1000) {
      third_index = GetThirdIndex(a, from, to);
    } else {
      third_index = from + ((to - from) >> 1);
    }
    // Find a pivot as the median of first, last and middle element.
    var v0 = a[from];
    var v1 = a[to - 1];
    var v2 = a[third_index];
    var c01 = comparefn(v0, v1);
    if (c01 > 0) {
      // v1 < v0, so swap them.
      var tmp = v0;
      v0 = v1;
      v1 = tmp;
    } // v0 <= v1.
    var c02 = comparefn(v0, v2);
    if (c02 >= 0) {
      // v2 <= v0 <= v1.
      var tmp = v0;
      v0 = v2;
      v2 = v1;
      v1 = tmp;
    } else {
      // v0 <= v1 && v0 < v2
      var c12 = comparefn(v1, v2);
      if (c12 > 0) {
        // v0 <= v2 < v1
        var tmp = v1;
        v1 = v2;
        v2 = tmp;
      }
    }
    // v0 <= v1 <= v2
    a[from] = v0;
    a[to - 1] = v2;
    var pivot = v1;
    var low_end = from + 1; // Upper bound of elements lower than pivot.
    var high_start = to - 1; // Lower bound of elements greater than pivot.
    a[third_index] = a[low_end];
    a[low_end] = pivot;

    // From low_end to i are elements equal to pivot.
    // From i to high_start are elements that haven't been compared yet.
    partition: for (var i = low_end + 1; i < high_start; i++) {
      var element = a[i];
      var order = comparefn(element, pivot);
      if (order < 0) {
        a[i] = a[low_end];
        a[low_end] = element;
        low_end++;
      } else if (order > 0) {
        do {
          high_start--;
          if (high_start == i) break partition;
          var top_elem = a[high_start];
          order = comparefn(top_elem, pivot);
        } while (order > 0);
        a[i] = a[high_start];
        a[high_start] = element;
        if (order < 0) {
          element = a[i];
          a[i] = a[low_end];
          a[low_end] = element;
          low_end++;
        }
      }
    }
    if (to - high_start < low_end - from) {
      QuickSort(a, high_start, to);
      to = low_end;
    } else {
      QuickSort(a, from, low_end);
      from = high_start;
    }
  }
};
```

所以选择合适的轴元素（pivot）对 Quicksort 的性能有着很大的影响。V8 采用了两条策略：

找到数组中的第一个，最后一个和“第三个”元素，然后选择这三个元素的中间值作为 pivot。对于较短数组，“第三个”的的元素就是中间 元素。
对于较长的数组，就从中抽出一个小数组进行排序，并将排序后中位数作为上述计算中的“第三个”元素。

V8 中，计算“第三个元素”位置有两种方法：

1. 数据大于 1000 时，根据一定间隔（例如 200）取出数组元素，组成新的较短的数组（较短的数组中，要保存元素原来的索引），然后获取较短数组中，中间元素原来的索引 --- （可以用随机的方式替代）
2. 数据小于 1000 时，取中间的元素

```js
// num >> 1 等价于 Math.floor(num / 2);
thirdIndex = from + ((to - from) >> 1);
```

单路快速排序（对于完全有序的数据退化，解决：引入随机化）

如果所有元素都一样，又会退化，因此需要用到双路快速排序

在双路快速排序的基础上，还可以优化。对于重复元素较多、或元素完全相同时，可以采用三路快速排序

时间复杂度，最坏是 O(n²)，平均是 O(nlogn)
但是由于我们引入了随机化，最坏情况发生的概率很小很少，趋近于 0，所以在分析时间复杂度时，看期望更合适

普通算法：看最差 能找到一组数据 100% 使算法恶化
随机算法：看期望 没有一组数据能 100% 使算法恶化
