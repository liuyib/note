- [CSS 实现等比缩放](#css-实现等比缩放)
  - [vw 方案](#vw-方案)
  - [padding 方案](#padding-方案)
  - [padding 方案改进](#padding-方案改进)

# CSS 实现等比缩放

元素的等比缩放（`宽:高 = 固定比例`）是一个常见的需求，也是面试中可能问到的问题。

我们最终要实现的效果是：**「实现一个宽度自适应父元素，高度始终为宽度 N % 的元素」**。

这里，我们以高是宽的 30% 作为举例。

## vw 方案

CSS 中 `vw` 单位相对于**浏览器视口**宽度，100vw 等于视口宽度的 100%。其中“浏览器视口”指的是浏览器可视区域的大小，也就是 `window.innerWidth / window.innerHeight` 获取到的大小。

因此，如果**有一个元素是横向占满空间**，那么想要保持该元素的宽高比，就可以使用 `vw` 单位。如下所示：

```html
<style>
  div {
    width: 100%;
    height: 30vw;
  }
</style>

<div>我的宽占满屏幕，我的高是宽的 30%</div>
```

如果宽度不是占满屏幕，想要两边“留点缝”，可以借助 `calc()` 函数。如下所示：

```html
<style>
  div {
    /* 左右两边各留 20px */
    width: calc(100% - 40px);
    /* 重新计算高度为宽度的一半（也可以是其他任意比例） */
    height: calc(0.3 * (100vw - 40px));
    margin: 0 auto;
  }
</style>

<div>我的左右两边距离屏幕两侧各 20px，我的高是宽的 30%</div>
```

从上面的介绍可以看出，`vw` 方案存在如下局限性：**需要确定元素宽度和浏览器视口宽度的比例**。也就是说，元素宽度和浏览器视口宽度之比，需要是 100%、50%、30% 等等，必须是一个确定的比例才行。

由于 `vw` 方案的局限性，无法实现我们最终想要的效果“宽度自适应父元素，高度始终为宽度 N %”，因此这里仅做介绍，下面才是今天的主角 `padding-top / padding-bottom`。

## padding 方案

要知道，`padding-top / padding-bottom` 设置百分比的值时，是相对于父元素的宽度来计算的。利用这一特点，可以很容易实现我们最终的效果。如下所示：

```html
<style>
  div {
    width: 100%;
    height: 0;
    /* 也可以是 padding-bottom: 30% */
    padding-top: 30%;
  }
</style>

<div>我的高是宽的 30%，使用 padding-top 实现</div>
```

其中，将元素的 `height` 设为 0，然后使用 `padding-top` 来撑开元素的高度，由于 `padding-top` 是根据元素宽度来计算的，所以就实现了等比缩放。

## padding 方案改进

由于元素 `height` 为 0，高度由 `padding-top` 来撑起，所以该元素有子元素时，就会被“挤到外面”。因此需要用 `position: absolute;` 来解决， 如下所示：

```html
<style>
  /* 父级元素（任意大小） */
  .outer {
    width: 400px;
    height: 400px;
  }

  /* 控制等比缩放 */
  .scale {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 40%;
    border: 1px solid red;
  }

  /* 内部元素 */
  .inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
</style>

<div class="outer">
  <div class="scale">
    <div class="inner">hello world</div>
  </div>
</div>
```

改进后的方案中，对于等比缩放元素来说，如果想要**改变其宽度**或**在其两边留点缝**，需要再包一层父元素来控制。实现也很简单，这里不再赘述。
