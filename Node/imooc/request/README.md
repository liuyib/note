node API - request 学习
当前 node 版本：v10.15.0

---

引入模块：

```node
var request = require('');
```

##### http.request(options[, callback])
##### http.request(url[, options][, callback])

```text
url <string> | <URL>
options <Object>
protocol <string> 使用的协议。默认为 http:。
host <string> 服务器的域名或 IP 地址。默认为 localhost。
hostname <string> host 的别名。为了支持 url.parse()，hostname 优先于 host。
family <number> 解析 host 和 hostname 时使用的 IP 地址族。值可以是 4 或 6。如果没有指定，则同时使用 IP v4 和 v6。
port <number> 远程服务器的端口。默认为 80。
localAddress <string> 网络连接绑定的本地接口。
socketPath <string> Unix 域 Socket。host:port 或 socketPath 二选一。
method <string> 请求的方法。默认为 'GET'。
path <string> 请求的路径。可以包括查询字符串，如 '/index.html?page=12'。如果请求的路径中包含非法字符，则抛出异常。默认为 '/'。
headers <Object> 请求头。
auth <string> 基本身份验证，如使用 'user:password' 计算 Authorization 请求头。
agent <http.Agent> | <boolean> 控制 Agent 的行为。可选的值有：

undefined (默认): 使用 http.globalAgent。
Agent: 使用传入的 Agent。
false: 新建一个使用默认配置的 Agent。
createConnection <Function> 如果没有指定 agent，则可用该函数为请求创建 socket 或流。这可以避免只是为了重写默认的 createConnection 而创建自定义的 Agent。详见 agent.createConnection()。
timeout <number>: socket 超时的毫秒数。
setHost <boolean>: 是否自动添加 Host 请求头。默认为 true。
callback <Function>
```

