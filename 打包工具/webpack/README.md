# webpack4.0 学习笔记

系统学习 webpack4.0 时记录的笔记，学习资料如下：

- [深入浅出的 webpack](https://webpack.wuhaolin.cn/)（纸质书籍）
- [webpack 官方文档](https://www.webpackjs.com/concepts/)（电子文档）
- [webpack 深入与实战](https://www.imooc.com/learn/802)（慕课免费视频）
- [手把手带你掌握新版 webpack4.0](https://coding.imooc.com/class/316.html)（慕课收费视频）

> webpack 官方指出，webpack 应当总是以小写字母书写，即使在一句话的起始位置也是如此。所以 Webpack、WebPack 等写法都是错误的。具体可查看：[webpack - 品牌指南](https://www.webpackjs.com/branding/)

## 学习路线

1. 通过官网，学习 webpack 的基本[概念](https://www.webpackjs.com/concepts/)。
2. 官网[指南](https://www.webpackjs.com/guides/) 提供了一系列 Demo，跟着操作一遍。

## 基础概念

webpack4.0 中有四大核心概念：

- 入口(entry)
- 出口(output)
- Loader
- 插件(plugins)

### 入口

webpack 从入口文件开始，根据代码中的模块化导入语句，递归地找到入口文件的所有依赖，然后将入口文件和所有依赖打包到出口文件中。

在 webpack 中，通过配置 `entry` 属性来指定一个或多个入口。默认路径为 `./src`。一个最简单的例子如下：

``` js
module.exports = {
  entry: './src/main.js'
};
```

### 出口

出口告诉 webpack 打包后的文件输出到哪里，以及如何命名。默认路径为 `./dist`。当然，也可以配置多出口。一个最简单的例子如下：

``` js
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
};
```

### Loader

Loader 可以将所有类型的文件转换为 webpack 能够处理的模块。webpack 本身只能理解 JS 文件，因此需要借助 Loader 处理非 JS 文件。

在 webpack 中使用 Loader 需要配置两个基本属性：

1. `test` 属性。用于匹配需要用 Loader 转换的文件（属性值一般为正则表达式）。
2. `use` 属性。用于指定转换文件时，应该使用哪一个 Loader。

举个例子，借助 css-loader 和 style-loader 来转换 CSS 文件：

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
```

其中，使用 css-loader 读取 CSS 文件，再用 style-loader 将读取的 CSS 代码注入到 JS 中，页面加载后 JS 会将 CSS 插入到 `style` 标签中。

> 如果想要 webpack 单独输出 CSS 文件，需要借助插件机制来实现。

在配置 Loader 时有以下两点要注意：

1. `use` 属性中 Loader 的执行顺序是由后向前。
2. 每个 Loader 都可以通过查询参数或 `options` 属性传入参数。

### 插件

插件用来扩展 webpack 的功能，通过在构建过程中注入钩子来实现，相比 Loader 它的作用范围更广。插件的作用范围包括：打包优化、压缩、重新定义环境中的变量。

上面介绍 Loader 时，举了如何处理 CSS 文件的例子，但是还只能将 CSS 代码注入到页面的 `style` 标签中。下面我们来借助插件，将 CSS 代码提取到单独的文件中：

``` js
const path = require('path');
// 别忘了安装 npm install --save-dev extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        loaders: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css'
    })
  ]
};
```

上面的 `[name]`、`[chunkHash]` 是占位符（也叫模板字符），是内置的变量。`filename` 属性的占位符和作用如下：

- `[hash]`：模块标识符的 hash（每次打包都会生成一个 hash）。
- `[chunkhash]`：chunk 内容的 hash。
- `[name]`：模块名称。
- `[id]`：模块标识符（默认和模块名称相同）。
- `[query]`：模块的 query（文件名 `?` 后面的查询字符串）。

`[hash]` 和 `[chunkhash]` 的长度可以使用 `:数字` 来指定，默认长度为 20。或者通过 `output.hashDigestLength` 在全局配置长度。

## 快速开始

### 安装

找个空目录，初始化一下 package.json 文件：`npm init -y`（参数 `-y` 表示跳过所有步骤，生成一个默认的配置文件）。然后安装 webpack，执行指令 `npm install --save-dev webpack webpack-cli`（在 webpack4+ 版本中，需要安装 CLI）。

### 基础配置

前端项目的源代码文件一般都放在 src 目录下，我们新建 src 目录，然后在这个目录下新建 index.js 文件。打包后的文件一般放在 dist 目录中。因此，我们可以这样编写配置文件：

**webpack.config.js**

``` js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
};
```

这就是最简单的 webpack 配置，只设置了打包的**入口**和**出口**。

### 打包

如果全局安装了 `webpack` 和 `webpack-cli` 那么直接在命令行中执行：

``` bash
webpack # 可自行添加参数
```

即可进行打包。但是在项目中一般不会这么做，在项目中使用，首先会添加一个 npm 脚本：

``` json
"script": {
  "build": "webpack --mode=development"
}
```

然后在命令行中执行指令 `npm run build` 进行打包。

> webpack 默认配置文件的名称为 **webpack.config.js**，你可以通过参数 `--config` 指定其它的名称，例如：`webpack --config webpack.config.dev.js`。

## 进阶使用

### 处理图片、字体

file-loader 可以接收并加载任何文件，包括字体和图片：

``` bash
$ npm install --save-dev file-loader
```

仓库地址：[file-loader](https://github.com/webpack-contrib/file-loader)。

**webpack.config.js**

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|jpe?g|svg|gif|woff2?|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

进行构建后，代码中**图片**或**字体文件**的路径都会被替换成处理后的路径。

### 加载数据

在 webpack 中，默认是支持 JSON 数据的导入的，也就是说 `import Data from './data.json'` 可以正常运行。如果想要导入 CSV、TSV、XML 数据，就需要使用 Loader 处理：

``` bash
npm install --save-dev csv-loader xml-loader
```

仓库地址：[csv-loader](https://github.com/theplatapi/csv-loader)、[xml-loader](https://github.com/gisikw/xml-loader)。

> csv-loader 处理 CSV、TSV 文件，xml-loader 处理 XML 文件。

**webpack.config.js**

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

### 全局资源

上面介绍的配置方式最出色之处是，你可以将代码和资源放在一起，而不是将资源文件全部放在 `/assets` 目录，这样更有利于组件的复用。例如：

``` diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

其中 `my-component` 组件的代码和依赖的资源放在了一起，具有很高的可移植性。

如果你的项目无法使用这种形式，而只能将资源文件放在公共目录中，那么前面的配置方式仍然是可以使用的。

### 处理 HTML

一般来说，项目的 index.html 文件会放在 `/public` 文件夹中，我们需要在打包构建时，将其生成在 `/dist` 目录下。安装插件：

``` bash
$ npm install --save-dev html-webpack-plugin
```

仓库地址：[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)。

**webpack.config.js**

``` diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       template: './public/index.html',
+       title: 'Home Page Title'
+     })
+   ]
  };
```

如果不指定 `template` 参数，该插件会新生成一个 HTML 到 `/dist` 目录中。

### 清理文件夹

项目打包构建后，文件会生成到 `/dist` 文件夹，多次之后 `/dist` 文件夹就会变得相当杂乱，因此我们在每次打包之前对其进行清理。

``` bash
$ npm install --save-dev clean-webpack-plugin
```

仓库地址：[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)。

**webpack.config.js**

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'Home Page Title'
      })
    ]
  };
```

### Manifest

仓库地址：[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)。

### 使用 source map

打包后的源码中，可能会很难追踪警告或错误的位置，因此可以使用 source map 功能，将编译后的代码映射到源代码中，从而更容易追踪警告或错误。

你可以使用 webpack 自带的 `devtool` 属性，来设置是否生成以及如何生成 source map：

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'Home Page Title'
      })
    ]
  };
```

该属性的可选值如下：[devtool - source map](https://www.webpackjs.com/configuration/devtool/#devtool)。

|`debtool`|构建速度|重新构建速度|生产环境|品质|
|:--|:--:|:--:|:--:|:--|
|`(none)`|+++|+++|yes|打包后的代码|
|`eval`|+++|+++|no|生成后的代码|
|`cheap-eval-source-map`|+|++|no|转换过的代码（仅限行）|
|`cheap-module-eval-source-map`|o|++|no|原始源代码（仅限行）|
|`eval-source-map`|--|+|no|原始源代码|
|`cheap-source-map`|+|o|no|转换过的代码（仅限行）|
|`cheap-module-source-map`|o|-|no|原始源代码（仅限行）|
|`inline-cheap-source-map`|+|o|no|转换过的代码（仅限行）|
|`inline-cheap-module-source-map`|o|-|no|原始源代码（仅限行）|
|`source-map`|--|--|yes|原始源代码|
|`inline-source-map`|--|--|no|原始源代码|
|`hidden-source-map`|--|--|yes|原始源代码|
|`nosources-source-map`|--|--|yes|无源代码内容|

> `+++` 非常快速, `++` 快速, `+` 比较快, `o` 中等, `-` 比较慢, `--` 慢

有一些例子，帮助你更好地理解这些值的作用：[显示所有 devtool 变体效果的示例](https://github.com/webpack/webpack/tree/master/examples/source-map)。

### 自动编译代码

每次编译时，手动运行 `npm run build` 会很麻烦，下面介绍几种自动编译代码的方法：

1. 观察者模式（`--watch`）
2. webpack-dev-server
3. webpack-dev-middleware

#### 观察者模式（`--watch`）

在 npm 脚本后面添加 `--watch` 参数：

``` json
"scripts": {
  "watch": "webpack --watch"
}
```

当运行 `npm run watch` 后，命令行并不会退出，会一直监听文件的变动。这种做法的唯一的缺点是，虽然修改代码后可以自动编译，但是你需要刷新浏览器才能看到效果。

> 如果使用 VS Code 的 live-server 插件来运行项目的 index.html 那么配合 webpack 的观察者模式简直完美。

#### 使用 webpack-dev-server

webpack-dev-server 会为你提供一个简单的 Web 服务器，从而能够实时重新加载。

``` bash
$ npm install --save-dev webpack-dev-server
```

修改配置文件，告诉 webpack-dev-server 在哪里查找文件：

**webpack.config.js**

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'Home Page Title'
      })
    ]
  };
```

添加 npm 脚本：

``` json
"scripts": {
  "start": "webpack-dev-server --open"
}
```

更多配置请查看：[开发中 Server(devServer)](https://www.webpackjs.com/configuration/dev-server/)。

#### 使用 webpack-dev-middleware

webpack-dev-middleware 是一个容器，它会把 webpack 处理后的文件传递给一个服务器。下面是一个 webpack-dev-middleware 配合 express 服务器的示例。

首先，安装 webpack-dev-middleware 和 express：

``` bash
$ npm install --save-dev express webpack-dev-middleware
```

还需要调整一下配置文件，以确保中间件能够正常使用：

**webpack.config.js**

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
+     publicPath: '/'
    },
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'Home Page Title'
      })
    ]
  };
```

`publicPath` 会在服务器脚本中用到，以确保文件资源能够在 `localhost:3000` 下正确访问。下面来搭建 express 服务：

在项目目录下添加 server.js 文件。

**server.js**

``` js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告诉 express 使用 webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// 将文件暴露在 3000 端口
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
```

添加 npm 脚本来运行服务：

``` json
"scripts": {
  "server": "node server.js"
}
```

执行 `npm run server` 后，在浏览器里访问 `localhost:3000` 就能看到程序正在运行。
