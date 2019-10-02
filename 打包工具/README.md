# 打包工具对比

Gulp，Rollup，webpack 三种打包工具之间的对比和选择。

## Gulp

Gulp 是一个基于流的自动化构建工具。只通过 5 个 API 就可以支持几乎所有构建场景：

- `gulp.task` 注册一个任务。
- `gulp.run` 执行任务。
- `gulp.watch` 监听文件的变化。
- `gulp.src` 读取文件。
- `gulp.dest` 写入文件。

Gulp 简单易于理解，灵活，插件丰富，但是使用前需要自己编写整个配置文件。

有关 Gulp 的详细笔记，参见：[Gulp 学习笔记](https://github.com/liuyib/study-note/tree/master/%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7/gulp)

## Rollup

Rollup 是专注于 JS 的打包工具，能针对源码进行 Tree Shaking。和 webpack 相比，它的缺点如下：

- 不支持 Code Spliting。
- 生态还不完善。
- 很多场景下找不到现有的解决方案。

Rollup 的优点是配置和使用简单，在打包 JS 库时，打包的代码体积更小，更快。

有关 Rollup 的详细笔记，参见：[Rollup 学习笔记](https://github.com/liuyib/study-note/tree/master/%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7/rollup)

## webpack

webpack 是一个模块化打包工具，一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出多模块组合成的打包文件。

webpack 优点如下：

- 专注于模块化的项目，可以开箱即用。
- 可通过插件扩展。
- 使用场景不只局限于 Web 开发。
- 社区庞大，生态好。
- 大多数场景都能找到相应的解决方案。

webpack 的缺点是只能用户模块化开发的项目中。

有关 webpack 的详细笔记，参见：[webpack 学习笔记](https://github.com/liuyib/study-note/tree/master/%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7/webpack)

## 总结对比

webpack 大势所趋，熟练掌握之后能成为项目开发的利器之一，Gulp 和 Rollup 不失其独特之处，在一些情况下也是不错的选择。
