function insertSort(arr) {
  const arrLen = arr.length;

  for (let i = 0; i < arrLen; i++) {
    const cur = arr[i];
    let j = i - 1;

    for (; j >= 0; j--) {
      if (cur < arr[j]) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }

    arr[j + 1] = cur;
  }

  return arr;
}
