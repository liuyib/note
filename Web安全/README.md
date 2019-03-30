# Web 安全

## 总结

- [XSS](https://github.com/liuyib/study-note/tree/master/Web%E5%AE%89%E5%85%A8/XSS)

  攻击类型：

    - 反射型

      **原因：** 通过 URL 参数发送的数据（可能混入 XSS 代码），没有进行处理，直接显示在页面上。
      

    - 存储型

      **原因：** 接收到的数据（可能混入 XSS 代码）没有进行处理，直接保存在了服务端。

  **防御：**
  
    - 对数据进行转义和过滤
    - 设置 HTTP 请求头 `Content-Security-Policy` (CSP)

      示例：

      ![](https://raw.githubusercontent.com/liuyib/study-note/master/Web%E5%AE%89%E5%85%A8/XSS/imgs/github_csp_example.png)

    - 设置 HTTP 响应头 `X-XSS-Protection`

      ![](https://raw.githubusercontent.com/liuyib/study-note/master/Web%E5%AE%89%E5%85%A8/XSS/imgs/browser_xss_protectino.png)

    - 浏览器自带防御功能（用处不大）

- [CSRF](https://github.com/liuyib/study-note/tree/master/Web%E5%AE%89%E5%85%A8/CSRF)

  攻击类型：

    - GET

      **原因：** 通过 URL 参数直接修改数据或资源，并且没有进行安全验证。

    - POST

      **原因：** 使用 `Cookies` 不合理，并且没有对数据进行安全性处理。

    - 超链接类型

      > 将 GET 类型攻击嵌入超链接中

      原因同 GET 类型攻击。

  **防御：** 

    - 同源检测

      - 检测 HTTP 请求头 `Origin`
      - 检测 HTTP 请求头 `Referer`
      - 设置 HTTP 响应头 `Referrer-Policy`
        
        > 设置 `Referrer-Policy` 的方式：
        >
        > - 通过 CSP 设置
        > `Content-Security-Policy: strict-origin-when-cross-origin`
        > - 使用 meta 标签设置
        > `<meta name="referrer" content="no-referrer|no-referrer-when-downgrade|origin|origin-when-crossorigin|unsafe-url">`
        > - a 标签添加 referrerpolicy 属性设置

    - 设置 HTTP 响应头 `Set-Cookie` 的 `Same-Site` 属性
    - 使用 `Token`
    - 双重 `Cookies` 验证

- [点击劫持](https://github.com/liuyib/study-note/tree/master/Web%E5%AE%89%E5%85%A8/%E7%82%B9%E5%87%BB%E5%8A%AB%E6%8C%81)

  **原因：** 网站允许被第三方网站通过 `iframe` 内嵌。
  **防御：** 设置 HTTP 响应头 `x-frame-options`，或使用 JS 判断网站顶层对象是否是 `Window`

## 辅助工具


检测网站设置的 HTTP 安全头：[Security Headers](https://securityheaders.com/)