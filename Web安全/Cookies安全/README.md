# Cookies 安全

## Cookies 的特性

- 前端数据储存
- 前端可读写
- 后端通过 HTTP 头设置
- 前端请求数据时，通过 HTTP 头传给后端
- 遵守同源策略

## 使用

- `用户 ID + 签名` 作为用户登录的凭证

  > 签名：一个 MD5 戳，可以使用盐值 + 用户 ID 加密成的。

  用户 ID 明文保存在 `Cookies` 中，以及签名也保存在 `Cookies` 中，当请求数据时，后端将收到的用户 ID 再使用同样的方法加密，比较两个 MD5 戳是否一样。

- `Cookies` 中存 `SessionID` 作为用户登录的凭证

  `SessionID` 是一个随机的字符串，后端可以将 `SessionID` 存入文件，数据库，Redis 等里面。

- `Cookies` 和 XSS 的关系

  - XSS 脚本可以偷走 `Cookies`
  - 使用 `HttpOnly` 的 `Cookies` 不会被偷

- `Cookies` 和 CSRF 的关系

  - CSRF 利用了用户的 `Cookies`
  - 攻击者无法读写 `Cookies`

- `Cookies` 的安全策略

  - 使用签名
  - 加密传输
  - 设置 `Set-Cookie` 的 `HttpOnly` 属性（JS 不能修改 `Cookies`）
  - 设置 `Set-Cookie` 的 `Secure` 属性（只有 HTTPS 请求才能使用 `Cookies`）
  - 设置 `Set-Cookie` 的 `SameSite` 属性（请求跨站时 `Cookies` 会不会被发送。目前只有 Chrome 支持）
  - 设置 HTTP 请求头 STS (`Strict-Transport-Security`)

    > 限制 Web 只能使用 HTTPS 请求。可以包含最大过期时间，子域和预加载。

    ```http
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
    ```

  示例：

  ![github-cookies-secure](./imgs/github-cookies-secure.png)

许多 Web 攻击方式都与 `Cookies` 有关，例如：`XSS` `CSRF`等，因此，保证 `Cookies` 的安全，是保证网站安全最基本的要求之一。

---

参考文章：

[keycdn: Hardening Your HTTP Security Headers](https://www.keycdn.com/blog/http-security-headers)
