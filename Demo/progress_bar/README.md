### 纯CSS绘制进度条

实现效果如下：

![](./imgs/progress_1.gif)

#### 实现需求

这个效果是用 **线性渐变** 实现的。

核心代码：
```css
body {
  background-image: linear-gradient(to right top, #fc0 50%, #eee 50%);
  background-repeat: no-repeat;
}
```

添加上面代码后，效果如下：

![](./imgs/progress_2.gif)

有了这个效果，接下来怎么做就很明显了。

这里我们用一个伪元素，将多余的部分遮住：

```css
body::after {
  content: '';
  z-index: -1;
  position: fixed;
  top: 5px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
```

效果如下：

![](./imgs/progress_3.gif)

眼尖的同学可能已经看出来，当滚动条到达底部的时候，滚动条并没有达到100%：

![](./imgs/progress_4.png)

解决办法很简单，调整一下渐变大小即可：

```diff
body {
   background-image: linear-gradient(to right top, #fc0 50%, #eee 50%);
   background-repeat: no-repeat;
+  background-size: 100% calc(100% - 100vh + 5px);
}
```

最后，效果就完美实现了:

![](./imgs/progress_1.gif)

以上 :rocket: