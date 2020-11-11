function rabinKarp(text, pattern) {
  const tLen = text.length;
  const pLen = pattern.length;
  const mod = 65535; // Hash 表的大小，尽可能大的素数（不能过大，防止计算溢出）
  const radix = 31; // 字符集的大小（如 ACSII 128），这里 31 是经验值，适合运算
  let power = 1;
  let tHash = 0;
  let pHash = 0;

  for (let i = 0; i < pLen - 1; i++) {
    power = (power * radix) % mod;
  }

  for (let i = 0; i < pLen; i++) {
    tHash = (tHash * radix + text.charCodeAt(i)) % mod;
    pHash = (pHash * radix + pattern.charCodeAt(i)) % mod;
  }

  if (tHash === pHash) return 0;

  for (let i = 0; i < tLen - pLen; i++) {
    //（核心）复用当前的 Hash，计算下一次的，以减少计算量
    /* prettier-ignore */
    tHash = ((tHash - text.charCodeAt(i) * power) * radix + text.charCodeAt(i + pLen)) % mod;

    // 由于计算 Hash 后会取模，所以上面的减法可能得到负数，因此需要再加上模使其变成正数
    if (tHash < 0) tHash += mod;
    // Hash 碰撞时，两个相同的 Hash 值可能对应不同的字符串
    // 因此 Hash 匹配后，需要再比较下原字符串是否相等
    // 如果这一步执行次数过多，也比较耗费性能，因此要尽量减少 Hash 碰撞
    // 这也就是 mod 变量要尽可能大的原因
    if (tHash === pHash) {
      console.log('crash');
    }
    if (tHash === pHash && text.slice(i + 1, i + 1 + pLen) === pattern) {
      return i + 1;
    }
  }

  return -1;
}

module.exports = rabinKarp;
