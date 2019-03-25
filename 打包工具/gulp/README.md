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

- 公开的 task 从 `gulpfile.js` 中导出，可以直接使用 gulp 指令来调用这些 task。
- 私有的 task 只能在内部使用，通常用于 `series()` 和 `parallel()` 指令。

```js
const { series } = require('gulp');

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

上面的代码中 `clean 任务` 没有被 exports，是私有的 task，而 build 是公开的。

## 3、组合任务

> - series()
> - parallel()

要顺序执行 task 请使用 `series()`:

> 代码示例同上

要并发执行 task 请使用 `parallel()`:

```js
const { parallel } = require('gulp');

function clean(cb) {
  // ...
  cb();
}

function build(cb) {
  // ...
  cb();
}

exports.default = parallel(clean, build);
```

> `series` 和 `parallel` 可以相互嵌套任意深度。

如果既要同步执行，又要异步执行 task，可以这样使用：

```js
const { series, parallel } = require('gulp');

function clean(cb) {
  // ...
  cb()
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
- 错误优先回调 cb()  -- 没有返回值的 task，一定要执行 cb 方法
- 使用 async / await

[https://gulpjs.com/docs/en/getting-started/async-completion](https://gulpjs.com/docs/en/getting-started/async-completion)

## 5、读写文件

> - src()
> - dest()

读入文件使用 `src()` 方法，写入文件使用 `dest()` 方法：

```js
const { src, dest } = require('gulp');

exports.default = function () {
  return src('src/*.js')
    .pipe() // 一些插件
    .pipe(dest('release/bundle.js'));
};
```

[读取文件的模式（流、缓冲、空）](https://gulpjs.com/docs/en/getting-started/working-with-files#modes-streaming-buffered-and-empty)

## 6、特殊字符

- `\`
- `*`
- `**`
- `!`

[https://gulpjs.com/docs/en/getting-started/explaining-globs](https://gulpjs.com/docs/en/getting-started/explaining-globs)

## 7、使用插件

通常使用插件放置在 `src()` 和 `dest()` 方法之间。

`src()` 和 `dest()` 方法都可以放在流中，实现**文件分阶段编译输出**：

```js
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(dest('output/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}
```

### 改进操作

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

### 有条件的使用插件（借助 `gulp-if` 插件）：

```js
const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');

function jsJS(file) {
  return file.extname == '*.js';
}

exports.default = function () {
  return src(['src/*.js', 'src/*.css'])
    .pipe(gulpif(isJS, uglify())) // 如果 isJS 返回 true，则使用 uglify 插件
    .pipe(dest('release/bundle.js'));
};
```

### [内联插件](https://gulpjs.com/docs/en/getting-started/using-plugins#inline-plugins)

## 8、监听文件

可以监听单个 task，也可以监听多个 task：

```js
const { watch, series } = require('gulp');

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

watch('src/*.css', css);
watch('src/*.js', series(clean, js));
```

### 避免异步

> 传给 watch 的 task 不要异步进行。

### 设置 watch 的事件

默认情况下，watch 会在创建、更改或删除文件时，执行 task。如果想要 watch 在其他情况下执行 task，需要配置 events 参数：

```js
const { watch } = require('gulp');

watch('src/*.js', { events: 'all' }, function(cb) {
  // ...
  cb();
});
```

> 可以配置的参数有：`'add'`，`'addDir'`，`'change'`，`'unlink'`，`'unlinkDir'`，`'ready'`，`'error'`，`'all'`

### 初始执行

默认情况下，调用 `watch()`，任务不会执行，而是等待第一次文件修改。

如果想要在第一次文件修改之前执行任务，需要将 `ignoreInitial` 设置为 `false`：

```js
const { watch } = require('watch');

watch('src/*.js', { ignoreInitial: false }, function (cb) {
  // ...
  cb();
});
```

其他的设置：

- `queue: false` 禁止排队
- `delay: 500` 延迟执行 task

## 9、API

[https://gulpjs.com/docs/en/api/concepts](https://gulpjs.com/docs/en/api/concepts)

## 10、一些常用插件

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

## 示例

`gulpfile.js`:

```js
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var cleanHTML = require("gulp-htmlclean");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var del = require("del");

var paths = {
  html: {
    src: "src/*.html",
    dest: "build/"
  },
  styles: {
    src: "src/css/*.css",
    dest: "build/"
  },
  scripts: {
    src: "src/js/*.js",
    dest: "build/"
  },
  images: {
    src: "src/imgs/*",
    dest: "build/imgs/"
  }
};

function clean() {
  return del(["build"]); // 删除 build 目录
}

// 压缩 HTML
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(cleanHTML())
    .pipe(gulp.dest(paths.html.dest));
}

// 压缩 CSS
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "build",
        suffix: ""
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

// 压缩 JS
function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(jshint())
    .pipe(uglify())
    .pipe(
      rename({
        basename: "build",
        suffix: ""
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));
}

// 压缩图片
function images() {
  return gulp
    .src(paths.images.src, {
      since: gulp.lastRun(images) // 过滤没有更新的图片，使其不参与编译
    })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(paths.images.dest));
}

// 监听文件是否更改
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

// 进行串操作（首先移除指定文件夹）
var build = gulp.series(clean, gulp.parallel([html, styles, scripts, images]));

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;
exports.build = build;

exports.default = build;
```
