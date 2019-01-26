工程目录：

```shell
- node-echo/                        # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    + node_modules/                 # 存放三方包
    + tests/                        # 存放测试用例
    package.json
    README.md
```

这个部分文件示例如下：

bin/node-echo.js:
输出命令行中的参数。
```node
var echo = require('../lib/echo');
var argv = process.argv[2];

console.log(echo(argv));
```

lib/echo.js:
返回命令行中的参数。

```node
module.exports = function (mess) {
  return mess;
};
```