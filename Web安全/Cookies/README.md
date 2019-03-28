# Cookies

- 前端数据储存
- 前端可读写
- 后端通过 HTTP 头设置
- 前端请求数据时，通过 HTTP 头传给后端
- 遵守同源策略

---


- `用户 ID + 签名` 作为用户登录的凭证

> 签名：一个使用盐值 + 用户 ID 加密成的 MD5 戳

用户 ID 明文保存在 Cookies 中，以及签名也保存在 Cookies 中，当请求数据时，后端将收到的用户 ID 再使用同样的方法加密，比较两个 MD5 戳是否一样。

- `Cookies 中存 SessionID` 作为用户登录的凭证

> SessionID 是一个随机的字符串，后端可以将 SessionID 存入文件，数据库，Redis等里面。

- Cookies 和 XSS 的关系

  - XSS 脚本可以偷走 Cookies
  - 使用 http-only 的 Cookies 不会被偷

- Cookies 和 CSRF 的关系

  - CSRF 利用了用户的 Cookies
  - 攻击者无法读写 Cookies

- Cookies 的安全策略

  - 使用签名
  - 加密
  - 设置 Cookies 的 http-only 属性（JS 不能修改 Cookis，防止 XSS）
  - 设置 Cookies 的 secure 属性（只有在 HTTPS 请求中才能读写 Cookies）
  - 设置 HTTP 请求头 same-site（第三方网站是否可以使用 Cookies。防止 CSRF，只兼容 Chrome）

- STS(strict-transport-security)

限制 Web 只使用 HTTPS 请求

> 可以包含最大过期时间，子域和预加载。

```http
strict-transport-security: max-age=31536000; includeSubDomains; preload
```

https://www.keycdn.com/blog/http-security-headers

一个检测 HTTP 安全头的设置情况的网站：https://securityheaders.com/