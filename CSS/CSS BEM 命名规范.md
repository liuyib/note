# BEM 规范

## B -- Block

块。表示有意义的实体，块名称用于描述它的目的。例如：`header`, `container`, `main`, `menu`, `input`。

特点：

- 不能影响其他元素（即不能设置 `margin` 或 `position`）。
- 可以相互嵌套（任意嵌套级别）。

示例：

![bem block](./imgs/bem-block.jpg)

```html
<header class="header">
  <div class="logo"></div>
  
  <div class="menu">
    ...
  </div>

  <div class="search">
    ...
  </div>

  <div class="auth">
    ...
  </div>
</header>
```

> 块的位置是任意的，可以在页面或项目之间随意移动，且无需修改 CSS 或 JavaScript 代码。因此，要将块实现为独立的实体。

## E -- Element

元素。块的一部分，语义上与块相关联，没有独立意义，**不能单独使用**。例如：`menu item`, `list item`, `header title`。

结构：`block__element`。

特点：

- 可以相互嵌套（任意嵌套级别）。
- 不能单独使用，没有块就不能使用元素。
- 元素是可选的，并不是所有块都要有元素。

示例：

```html
<!-- 正确 -->
<div class="search">
  <div class="search__content">
    <input class="search__input">
  </div>
</div>

<!-- 错误（元素不能与块分开） -->
<div class="search"></div>

<div class="search__content">
  <input class="search__input">
</div>

<!-- 错误（不能连续两次使用元素） -->
<div class="search">
  <div class="search__content">
    <input class="search__content__input">
  </div>
</div>
```

## M -- Modifier

修饰符。用于定义块或元素的外观、状态、行为。例如：

> `disabled, highlighted, checked, fixed, big, yellow`

结构：

- `block_modifier` -- 块 + 修饰符。
- `block__element_modifier` -- 块 + 元素 + 修饰符。
- `block_modifier_value` -- 块 + 修饰符 + 修饰符的值。
- `block__element_modifier_value` -- 块 + 元素 + 修饰符 + 修饰符的值。

特点：

- 修饰符名称与 B 或 E 之间用单线划线 `_` 分隔。
- 不能同时使用多个具有不同值的修饰符。
- 不能单独使用，没有块或元素就不能使用修饰符。

示例：

``` html
<!-- 正确 -->
<!-- 块；`search`，修饰符：`theme`，修饰符的值：`islands`  -->
<div class="search search_theme_islands">
  <div class="search__content">
    <!-- 块：`search`，元素：`input`，修饰符：`size`，修饰符的值：`big` -->
    <input class="search__input search__input_size_big">
  </div>
</div>

<!-- 错误（不能同时使用多个具有不同值的修饰符） -->
<div class="search search_theme_islands">
  <div class="search__content">
    <input class="search__input
                  search__input_size_big
                  search__input_size_small">
  </div>
</div>

<!-- 错误（缺少块 `search`） -->
<div class="search_theme_islands">
  <div class="search__content">
    <input class="search__input">
  </div>
</div>
```

上面的示例中可以看到，元素和修饰符名称的前面带有块的名称，这样做的好处是：[为什么在修饰符和元素名中包含块名](https://en.bem.info/methodology/faq/#why-include-the-block-name-in-modifier-and-element-names)。

## 混合

特点：

- 在不复制代码的情况下组合多个实体的行为和样式。
- 基于现有的 UI 组件创建语义上新的 UI 组件。

示例：

``` html
<div class="header">
  <!-- 将 `search` 块与元素 `header__search` 混合 -->
  <div class="search header__search"></div>
</div>
```

## 命名规则

`block__elem_mod_value`

- 名称全小写。
- 如果名称中有多个单词，使用 `-` 分隔。

  例如：`search-form__input-username`

## 命名风格

除了上述示例的命名风格外，还有其他几种可供选择：

- `block__elem--mod--value` -- 双破折号风格
- `blockName-elemName_modName_modVal` -- 小驼峰风格
- `BlockNmae-ElemName_modName_modVal` -- 大驼峰风格
- 自定义风格（要符合 BEM 的规范）

## 文件结构

文件结构中目录或文件的命名也适用于 BEM 命名。详见：[File structure](https://en.bem.info/methodology/quick-start/#file-structure)

## 如何定位一个块

块具有独立性，不能影响其他块的定位。下面是定位块的几种方法。

- 通过混合来定位一个块

  ``` html
  <!-- 块：`page` -->
  <body class="page">
    <header class="header page__header"></header>
  </body>
  ```

  ``` css
  /* 影响定位的属性写在混合元素 `page__header` 上 */
  .page__header {
    margin: 20px
  }
  ```

- 添加额外的元素来定位一个快

  ``` html
  <!-- 块：`page` -->
  <body class="page">
    <div class="page__inner"></div>
  </body>
  ```

  ``` css
  .page__inner {
    margin: 0 auto;
    width: 960px;
  }
  ```

## 选择器

BEM 命名中，不能使用**标签选择器**和 **ID 选择器**。所有的元素都可以使用类选择器定位到。

对于一些特殊情况，可以使用下面几种选择器（都不推荐使用）：

- 联合标签选择器和类选择器。例如：`button.button_active`。
- 联合类选择器。例如：`.button.button_active`。
- 嵌套选择器。例如：`.button_hovered .button__text`。

这几种选择器改变了选择器的权重，增加了耦合度，不利于维护，所以不推荐使用。

## 如何切换到 BEM 样式的 CSS

在项目中应用以下 BEM 准则：

- 抛开 DOM 模型，尝试创建块。
- 不要使用 ID 或 标签选择器。
- 减少嵌套选择器的数目。
- 将一个块的 CSS 属性添加到修饰符上，如果它们看起来可能会更改。
- 使用混合。
- 重用块。

## 如何在已有的项目中使用 BEM

- 根据 BEM 的准则创建新的组件，并根据需要修改旧的组件。
- 在 CSS 类名前加私有前缀（例如：`bem-`），以便于和旧代码区分。

---

本文来源于：[BEM Methodology](https://en.bem.info/methodology/quick-start/)，进行总结和概括后，作为笔记记录下来。
