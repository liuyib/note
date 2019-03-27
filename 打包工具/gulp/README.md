# Gulp 学习笔记

## 1、安装

gulp 既要全局安装，又要本地安装才可以使用：

```shell
npm install gulp -g
npm install gulp -D
```

官网：[https://gulpjs.com/](https://gulpjs.com/)

中文官网: [https://www.gulpjs.com.cn/](https://www.gulpjs.com.cn/)

GitHub：[https://github.com/gulpjs/gulp](https://github.com/gulpjs/gulp)

## 2、导出

task 可以是公开的和私有的。

- 使用 exports 可以使 task 成为公开的。
- 公开的 task 可以直接被 gulp 指令单独调用。
- 私有的 task 只能在内部使用，通常用于 `series()` 和 `parallel()` 指令。

```js
const { series } = require("gulp");

function clean(cb) {
  // ...
  cb();
}

function build(cb) {
  // ...
  cb();
}

exports.build = build;
exports.default = series(clean, build);
```

上面的代码中 `clean 任务` 没有被 exports 是私有的 task。而 build 是公开的。

## 3、组合任务

> - series()
> - parallel()

- 使用 `series()` 使 task 顺序执行
- 使用 `parallel()` 使 task 并发执行

```js
const { series, parallel } = require("gulp");

function clean(cb) {
  // ...
  cb();
}

function build(cb) {
  // ...
  cb();
}

exports.series = series(clean, build);
exports.parallel = parallel(clean, build);
```

> `series` 和 `parallel` 可以相互嵌套任意深度。

如果既要同步执行，又要异步执行 task，可以这样使用：

```js
const { series, parallel } = require("gulp");

function clean(cb) {
  // ...
  cb();
}

function css(cb) {
  // ...
  cb();
}

function javascript(cb) {
  // ...
  cb();
}

// 先执行 clean，然后异步执行 css 和 javascript
exports.default = series(clean, parallel(css, javascript));
```

## 4、异步完成

- 返回一个 stream
- 返回一个 promise
- 返回一个 event emitter
- 返回一个 child process
- 返回一个 observable
- 错误优先回调 cb() -- 没有返回值的 task，一定要执行 cb 方法
- 使用 async / await

[https://gulpjs.com/docs/en/getting-started/async-completion](https://gulpjs.com/docs/en/getting-started/async-completion)

## 5、读写文件

> - src()
> - dest()

读入文件使用 `src()` 方法，写入文件使用 `dest()` 方法：

```js
const { src, dest } = require("gulp");

exports.default = function() {
  return src("src/*.js")
    .pipe() // 一些操作
    .pipe(dest("release/bundle.js"));
};
```

> **src() 方法的参数可以是一个数组，dest() 的不行**

[读取文件的模式（流、缓冲、空）](https://gulpjs.com/docs/en/getting-started/working-with-files#modes-streaming-buffered-and-empty)

## 6、特殊字符

- `\`
- `*`
- `**`
- `!`

[https://gulpjs.com/docs/en/getting-started/explaining-globs](https://gulpjs.com/docs/en/getting-started/explaining-globs)

## 7、多输入多输出

通常使用插件放置在 `src()` 和 `dest()` 方法之间。

`src()` 和 `dest()` 方法都可以放在流中，实现**文件分阶段编译输出**：

```js
const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

exports.default = function() {
  return src("src/*.js")
    .pipe(babel())
    .pipe(src(["vendor/*.js", "content/*.js"]))
    .pipe(dest("output/"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("output/"));
};
```

## 8、引入其它库 / 模块

并不一定所有内容都需要插件。可以通过引入其他模块或库来改进操作：

```js
const { rollup } = require('rollup');

exports.default = async function () {
  const bundle = async rollup.rollup({
    input: 'src/main.js'
  });

  return bundle.write({
    format: 'iife',
    name: 'packname',
    file: 'release/bundle.js'
  });
};
```

## 9、有条件的使用插件（借助 `gulp-if` 插件）

```js
const { src, dest } = require("gulp");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");

function jsJS(file) {
  return file.extname == "*.js";
}

exports.default = function() {
  return src(["src/*.js", "src/*.css"])
    .pipe(gulpif(isJS, uglify())) // 如果 isJS 返回 true，则使用 uglify 插件
    .pipe(dest("release/bundle.js"));
};
```

## 10、内联插件

[https://gulpjs.com/docs/en/getting-started/using-plugins#inline-plugins](https://gulpjs.com/docs/en/getting-started/using-plugins#inline-plugins)

## 11、监听文件

可以监听单个 task，也可以监听多个 task：

```js
const { watch, series } = require("gulp");

function clean(cb) {
  // ...
  cb();
}

function css(cb) {
  // ...
  cb();
}

function js(cb) {
  // ...
  cb();
}

watch("src/*.css", css);
watch("src/*.js", series(clean, js));
```

## 12、避免异步

> 传给 watch 的 task 不要异步进行。

## 13、配置 watch 的参数

默认情况下，watch 会在创建、更改或删除文件时，执行 task。如果想要 watch 在其他情况下执行 task，需要配置 events 参数：

```js
const { watch } = require("gulp");

watch("src/*.js", { events: "all" }, function(cb) {
  // ...
  cb();
});
```

> 可以配置的参数有：`'add'`，`'addDir'`，`'change'`，`'unlink'`，`'unlinkDir'`，`'ready'`，`'error'`，`'all'`

## 14、初始执行

默认情况下，调用 `watch()`，任务不会执行，而是等待第一次文件修改。

如果想要在第一次文件修改之前执行任务，需要将 `ignoreInitial` 设置为 `false`：

```js
const { watch } = require("watch");

watch("src/*.js", { ignoreInitial: false }, function(cb) {
  // ...
  cb();
});
```

其他的设置：

- `queue: false` 禁止排队
- `delay: 500` 延迟执行 task

## 15、API

[https://gulpjs.com/docs/en/api/concepts](https://gulpjs.com/docs/en/api/concepts)

## 16、一些常用插件

gulp 插件网址：[https://gulpjs.com/plugins/](https://gulpjs.com/plugins/)

> 安装方法均为：npm install 包名 -D

- gulp-htmlclean 压缩 HTML

- gulp-clean-css 压缩 CSS

- gulp-uglify 压缩 JS

- gulp-less

- gulp-babel

  ```shell
  # Babel 7
  $ npm install gulp-babel @babel/core @babel/preset-env -D

  # Babel 6
  $ npm install gulp-babel@7 babel-core babel-preset-env -D
  ```

- gulp-jshint

- gulp-concat 连接文件

- gulp-rename

- gulp-imagemin 压缩图片

- del 删除文件 / 目录

## 17、示例

官网示例代码：[https://github.com/gulpjs/gulp#sample-gulpfilejs](https://github.com/gulpjs/gulp#sample-gulpfilejs)

如果要将不同页面中引用的外部文件分别打包，比如：将`index.html` 引用的 `head.css` `main.css` `foot.css` 打包为 `index.css`，并将 `list.html` 引用的 `head.css` `nav.css` `foot.css` 打包为 `list.css`：

`gulpfile.js`:

```js
var gulp = require("gulp");
var cssclean = require("gulp-clean-css");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssgrace = require('cssgrace');

var datas = [{
  src: ['./css/head.css', './css/main.css', './css/foot.css'],
  name: 'index.css'
}, {
  src: ['./css/head.css', './css/nav.css', './css/foot.css'],
  name: 'list.css'
}];

// 处理 CSS 文件
function style_item(data, i) {
  return gulp.src(data[i].src)
    .pipe(concat(data[i].name)) // 合并后的文件名
    .pipe(postcss([             // 对 CSS 进行后处理
      autoprefixer,
      cssgrace
    ]))
    // .pipe(gulp.dest('./build/css/'))    // 产出未压缩的 CSS 文件 // 如果需要未压缩的 CSS 文件，请取消注释这一行代码
    .pipe(cssclean())
    .pipe(rename({ extname: '.min.css' })) // 重命名
    .pipe(gulp.dest('./build/css/'))       // 产出压缩的 CSS 文件
}

// 执行 CSS 文件处理
function styles(cb) {
  for (let i = 0; i < datas.length; i++) {
    style_item(datas, i);
  }
  cb();
}

exports.styles = styles;
exports.default = styles;
```

