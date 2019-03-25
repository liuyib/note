# babel 编译 ES6

## 初始化 package.json 文件

```shell
npm init // 加上参数 -yes（-y）可以一步生成
```

## 安装

```shell
npm i @babel/core @babel/cli @babel/preset-env
```

> - @babel/core babel 的核心库
> - @babel/cli  babel 的指令集
> - @babel/preset-env babel 的兼容库
>
> 如果需要兼容低版本的 IE 需要引入：@babel/polyfill

## 添加脚本

```json
"test": "babel src -d dest" // 将 src 目录下的脚本编译到 dest 下
```

## 添加配置

`.babelrc` 文件：
```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

## 执行

```shell
npm run test
```

然后编译后 ES5 文件就被输出到了 dest 文件夹下。