# 点击劫持攻击

用 `iframe` 将一个网站内嵌，然后 `opacity` 设为 `0` 进行隐藏，真实显示的是一些按钮等与用户交互的元素，诱导用户点击，而用户实际点击的是内嵌的网站。从而进行一些非法操作，盗取用户敏感信息。

例如：

![](./imgs/click_hijack.png)

## 防御点击劫持

  - 使用 JS

    ```js
    top.location === window.location
    ```

    `top.location` 指向网站主体的 window 对象，而 `window.location` 指向 iframe 的 window 对象

    通过对比这两个属性的值，就可以判断网站有没有被其他网站使用 iframe 嵌套，当被其他网站使用 iframe 引用时，直接跳转回来：

    ```js
    if (top.location === window.location) {
      top.location = window.location;
    }
    ```

    > 当 JS 被禁用，这种方法就会失效

  - 使用 HTTP 响应头 `x-frame-options` 来禁止被 `iframe` 内

    取值如下：

    ![](./imgs/x-frame-options.png)

    > 兼容性： IE8+

    详尽信息可以查阅：[MDN: x-frame-options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options)


使用时，应该以设置 `x-frame-options` 响应头为主，使用 JS 检测为辅。
