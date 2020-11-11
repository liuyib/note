/**
 * Rabin-Karp 算法被称道的三个原因：
 * - 它可以用来检测抄袭，因为它能够处理多模式匹配。
 * - 虽然在理论上并不比暴力匹配法更优，但在实际应用中它的复杂度仅为 O(n+m)。
 * - 如果能够选择一个好的哈希函数，它的效率将会很高，而且也易于实现。
 *
 * Rabin-Karp 算法被诟病的两个原因：
 * - 有许多字符串匹配算法的复杂度小于 O(n+m)。
 * - 有时候它和暴力匹配法一样慢，并且它需要额外空间。
 *
 * Rabin-Karp 算法之所以出众最大的原因就是它可以对多模式进行匹配。这一特性使得它在检测抄袭方面（尤其是大篇幅文字）非常好用。
 *
 *  @param {string} text 总字符串
 * @param {string} pattern 待匹配的字符串
 */
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
