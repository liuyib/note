## Flexible 移动端适配原理

项目地址：[https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)

相关文章：[https://github.com/amfe/article/issues/17](https://github.com/amfe/article/issues/17)

这算是一个过渡方案，可以应对绝大对数场景，但是存在一定问题，如今推荐使用 Viewport 方案（其兼容性已经够好）。

### px 转换为 rem

手淘设计师的设计稿通常是使用 750px 宽度，Flexible 的原理中，将设计稿的宽度均分为 100 份，每一份称为一个单位 a，并认定 `1rem = 10a`，因此（以宽 750px 的设计稿举例）：

```
1a = 7.5px
1rem = 75px
```

Flexible 会根据设备的 dpr 值，动态改变 rem 的大小，也就是 `<html>` 元素的字体大小。因此我们只需要将用到 px 的地方，将其转换成 rem，即可适配绝大多数移动设备。

人工将 px 转 rem 是很不可行的，所以可以**借助插件** 或 **借助预处理语言中的混合宏**，例如：

- 借助预处理语言中的混合宏

  以 Sass 为例：

  ```sass
  @mixin px2rem($property, $px-values, $baseline-px: 16px){
    // 将基准 px 转换为 rem
    $baseline-rem: $baseline-px / 1rem * 1;

    // 如果传入的 px 值只是数字，则返回 property / value
    @if type-of($px-values) == "number"{
        #{$property}: $px-values / $baseline-rem;
    }
    @else {
        // 准备一个空列表
        $rem-values: ();
        @each $value in $px-values {
            // 如果值为零或不是数字，则将其返回
            @if $value == 0 or type-of($value) != "number" {
                $rem-values: append($rem-values, $value / $baseline-rem);
            }
        }
        // 返回属性及其转换后的值列表
        #{$property}: $rem-values;
    }
  }
  ```

- 借助插件

  - [postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem)
  - Sublime 插件 [cssrem](https://github.com/flashlizi/cssrem)

## 文字大小不建议使用 rem

一般情况下，我们希望在不同设备上看到的文本字号是相同的。而且，现在大多数字体自带一些点阵尺寸，通常为偶数大小，如：`16px`，`24px`，所以我们不希望出现奇葩的字号，如：`15px`，`17px`。

因此，在 Flexible 方案中，字体仍使用 `px` 单位，但是根据 `<html>` 元素的 `data-dpr` 属性，来区分不同 dpr 下的字体大小：

```css
div {
  font-size: 12px;
}

[data-dpr="2"] div {
  font-size: 24px;
}

[data-dpr="3"] div {
  font-size: 36px;
}
```

为了便于开发，可以编写一个混合宏（Sass）：

```css
@mixin font-dpr($font-size) {
  font-size: $font-size;

  [data-dpr="2"] & {
    font-size: $font-size * 2;
  }

  [data-dpr="3"] & {
    font-size: $font-size * 3;
  }
}
```

然后，直接这样使用：

```css
@include font-dpr(16px);
```

在线体验 [Demo](https://liuyib.github.io/demo/note/h5-adapt-flexible/)

缺点：Flexible 目前只处理了 iOS 中 dpr 为 2 的情况，Android 中 dpr 为 1 的情况，其他的都没处理。

Flexible 放弃治疗 Android 的主要原因是，在 Android 机中，有很多奇葩的 dpr，例如 `dpr=1.5` ，这样使得处理后的效果惨不忍睹，
