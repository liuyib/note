# Rollup

## 原生支持多入口和多出口

```js
// rollup.config.js
export default [{
  input: './src/main-a.js',
  output: {
    format: 'cjs'
    file: 'release/bundle-a.js',
  }
}, {
  input: './src/main-b.js',
  output: [
    {
      format: 'cjs'
      file: 'release/bundle-b1.js',
    },
    {
      format: 'esm'
      file: 'release/bundle-b2.js',
    }
  ]
}];
```

## 在 Rollup 中使用 Babel

在 Rollup 中使用 Babel 的最简单的办法就是使用插件 [rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel)

```shell
npm install rollup-plugin-babel -D
```

添加到 `rollup.config.js` 里面：

```js
// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  entry: "src/main.js",
  output: {
    format: "iife",
    name: "packname",
    file: "release/bundle.js",
    sourceMap: true
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**" // 忽略 node_modules
    })
  ]
};
```

还需要为 Bable 添加一个配置文件 `.babelrc`：

```json
{
  "presets": [
    ["latest", {
      "es2015": {
        "modules": false
      }
    }]
  ],
  "plugins": ["external-helpers"]
}
```

这里设置 `modules: false`，防止 Babel 在 Rollup 之前，将我们的依赖模块转成 CommonJS，导致 Rollup 的一些失败处理。

使用 `external-helpers` 插件，它允许 Rollup 在文件束前仅引用一次任何的 'helpers' 函数，而不是在每个使用这些 'helpers' 的模块里都引入一遍（一般是默认行为）。

那么在编译之前，还需要安装一下插件 `babel-preset-latest` 和 `babel-plugin-external-helpers`：

```shell
npm install babel-preset-latest babel-plugin-external-helpers -D
```

## babel-preset-env

在没有任何配置选项的情况下，`babel-preset-env` 与 `babel-preset-latest`（是 preset 的集合，包括 `ES2015+`）的行为完全相同。

`babel-preset-env` 的出现，是为了优化 `babel-preset-latest` ，它能够根据你的配置，自动决定适合你的 Babel 插件的 `preset`。


配置示例：

- 开发目标是浏览器

  ```json
  // babel-preset-env
  {
    "presets": [
      ["env", {
        "targets": {
          "browsers": [
            "last 1 version",
            "> 1%",
            "not dead",
            "ie >= 10"
          ]
        }
      }]
    ]
  }
  ```

  > Borwserslist 的所有配置项：[Borwserslist](https://github.com/browserslist/browserslist)

- 开发目标是 Node

  ```json
  {
    "presets": [
      ["env", {
        "targets": {
          "node": "8.0"
        }
      }]
    ]
  }
  ```

  为了方便，可以使用 `"node": "current"` 来包含运行 Babel 所必须的 Node 版本的 `polyfills` 和 `transforms`：

  ```diff
  {
    "presets": [
      ["env", {
        "targets": {
  +      "node": "current"
        }
      }]
    ]
  }
  ```
