- [JavaScript 基础 2](#javascript-基础-2)
  - [new](#new)
  - [call、apply 和 bind 的区别](#callapply-和-bind-的区别)
  - [上下文 和 执行上下文](#上下文-和-执行上下文)
  - [继承](#继承)
  - [防抖和节流](#防抖和节流)
    - [防抖的应用场景](#防抖的应用场景)
    - [节流的应用场景](#节流的应用场景)
  - [模块化](#模块化)
  - [Promise](#promise)
  - [Generator](#generator)
  - [async 和 await](#async-和-await)
  - [Map、FlapMap 和 Reduce](#mapflapmap-和-reduce)
  - [Proxy](#proxy)
  - [为什么 `0.1 + 0.2 != 0.3`](#为什么-01--02--03)
  - [正则表达式](#正则表达式)

# JavaScript 基础 2

> - 这部分的知识总结，大部分来源于对掘金小册 [《前端面试之道》](https://juejin.im/book/5bdc715fe51d454e755f75ef) 的学习。
> - 文中提到的：实现一个 xxx，表示实现其原理，并不代表将其功能完全实现。

涉及的知识点参考了下图中的 JS 部分：

![interview_map](https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190727161531.png)

## new

// TODO

## call、apply 和 bind 的区别

// TODO

## 上下文 和 执行上下文

> 上下文始终是 this 的值
> 执行上下文是不同于上下文的另一个概念

[https://github.com/mqyqingfeng/Blog/issues/4](https://github.com/mqyqingfeng/Blog/issues/4)

## 继承

// TODO

## 防抖和节流

> 防抖（debounce）：事件持续触发结束后，等待 n 秒才执行函数
> 节流（throttle）：事件持续触发的时候，每 n 秒执行一次函数
>
> - [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
> - [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
> - [underscore 函数节流的实现](https://github.com/hanzichi/underscore-analysis/issues/22)
> - [underscore 函数去抖的实现](https://github.com/hanzichi/underscore-analysis/issues/21)
> - [JavaScript 函数节流和函数去抖应用场景辨析](https://github.com/hanzichi/underscore-analysis/issues/20)

### 防抖的应用场景

- 每次 `resize` 触发的事件
- 文本输入验证（连续输入文字后发送 Ajax 验证请求，验证一次就好了）
- 监听页面滚动事件，只让事件执行一次（`scroll`）

### 节流的应用场景

- DOM 元素的拖拽功能实现（`mousemove`）
- 射击游戏的 `mousedown / keydown` 事件（单位时间内只能发射一颗子弹）
- 计算鼠标移动距离（`mousemove`）
- Canvas 模拟画板功能（`mousemove`）
- 搜索联想功能（`keyup`）
- 监听页面滚动事件，让事件以固定时间间隔执行（`scroll`）

## 模块化

// TODO

## Promise

// TODO

## Generator

// TODO

## async 和 await

// TODO

## Map、FlapMap 和 Reduce

// TODO

## Proxy

// TODO

## 为什么 `0.1 + 0.2 != 0.3`

// TODO

## 正则表达式

[正则表达式](https://github.com/liuyib/study-note/tree/master/JavaScript/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
