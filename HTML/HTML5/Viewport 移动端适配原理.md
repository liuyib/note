## Viewport 移动端适配原理

先回顾一下 Flexible 的思想：

- 根据 dpr 的值来修改 `viewport` 实现 `1px` 的线
- 根据 dpr 的值来修改 `html` 的 `font-size`，从而使用 `rem` 实现等比缩放
- 使用 Hack 手段用 `rem` 模拟 `vw` 特性

如今，`vw` 已得到众多浏览器的支持，因此 Viewport 方案的已经可以正式投入使用。

### 基于 vw 转换设计稿

`vw` 是基于 Viewport 视窗的长度单位，这里的视窗（Viewport）就是指浏览器的可视区域，它的大小就是 `window.innerWidth/Height` 的值。

和 Viewport 相关的单位有四个，分别为 `vw`、`vh`、`vmin` 和 `vmax`。

- `vw`：是 Viewport's width 的简写，`1vw` 等于 `window.innerWidth` 的 `1%`
- `vh`：是 Viewport's height 的简写，`1vh` 等于 `window.innerHeihgt` 的 `1%`
- `vmin`：`vmin` 的值是当前 `vw` 和 `vh` 中较小的值
- `vmax`：`vmax` 的值是当前 `vw` 和 `vh` 中较大的值

加入我们的设计稿宽度为 750px，因此 `100vw = 750px`，即 `1vw = 7.5px`。之后需要将代码中的 `px` 转换为 对应的 `vw` 值，手动转换是不现实的，因此需要**使用预处理语言**或者**借助插件**。举例如下：

- 使用预处理语言

  以 Scss 为例：

  ```scss
  /* 设计稿的宽度 */
  $vw_base: 750;

  @function vw($px) {
    @return ($px / $vm_base) * 100vw;
  }

  /* 使用如下 */
  div {
    margin: vw(20);
    padding: vw(10) vw(5);
    width: vw(40);
    height: vw(40);
  }
  ```

- 使用 PostCSS 插件 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

  编写如下代码：

  ```css
  div {
    width: 75px;
  }
  ```

  PostCSS 进行编译后，将 `px` 转换为 `vw`：

  ```css
  div {
    width: 10vw;
  }
  ```

  实际使用的时候，需要根据设计稿的大小，配置该插件。

### vw 的适用场景

包括但不限于以下场景：

- 容器适配，可以使用 `vw`
- 文本的适配，可以使用 `vw`
- 大于 `1px` 的边框、圆角、阴影都可以使用 `vw`
- 内距和外距，可以使用 `vw`

对于使用 `1px` 的地方，不建议转换为 `vw` 单位，`1px` 的问题需要另做解决，这就延伸出了另一个话题：[Retina 屏幕下 1px 的解决方案](./1px%20的解决方案.md)

缺点：当容器使用 `vw` 单位，`margin` 采用 `px` 单位时，很容易造成整体宽度超过 `100vw`，从而影响布局效果。

解决办法： 在 `px` 和 `vw` 混用的地方，使用 `calc` 进行计算

## 总结

Viewport 方案已经越来越成熟，并随着时间的推移，`vh`、`vw`、`vmin`、`vmax`、`calc` 的兼容性越来越好，因此完全可以在实际项目中投入使用。
