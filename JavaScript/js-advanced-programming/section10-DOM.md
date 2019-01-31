##### 1、DOM 是针对 HTML 和 **XML** 的一套 API。

##### 2、文档元素

文档元素是每个文档的根节点，在 `HTML` 中，文档元素始终是 `<html>`；在 `XML` 中，没有预定的元素，因此任何元素都有可能成为文档元素。

##### 3、节点类型

`DOM1` 中定义了一个 `Node` 接口，`JS` 中作为 `Node` 类型实现了这个接口。`JS` 中总共有 `12 种节点类型`，这些节点类型都继承自 `Node` 类型，并都有一个 `nodeType` 属性。这些节点类型中，常用的是 `元素、文本、注释` 节点，他们的 `nodeType` 分别是 `1、3、8`。

##### 4、nodeName 和 nodeValue 属性

> 这两个属性的值取决于节点类型（所以使用之前最好检测一下节点类型）。
> 例如：元素节点的 nodeName 是元素名，nodeValue 是 null

##### 5、访问节点

访问子节点：

- childNodes 属性
- firstChild
- lastChild

childNodes 属性中保存着 NodeList 对象。NodeList 对象是一种类数组对象。
其中

```javascript
childNodes[0] == firstChild
childNodes[childNodes.length - 1] == lastChild
```

如果没有子节点，则 firstChild, lastChild 均为 null。

> 注意：上面这三个属性，会获取 `所有类型的节点`。由于代码缩进的原因，我们平时写代码使用：`someNode.firstChild, someNode.childNodes[0]` 等，获取到的一般是一个文本节点。并不能直接按照索引获取我们想要的元素节点！

访问父节点：

- parentNode 属性

访问兄弟节点：

- previousSibling
- nextSibling

> 如果一个节点没有上一个 / 下一个节点，那么他的 previousSibling / nextSibling 属性为 null。

节点之间的访问属性可以用下图表示：

![](./imgs/section10/node_map.png)

访问根节点：

- ownerDocument

这是所有节点都有的一个属性，该属性表示整个文档节点。通过这个属性，我们可以不必在节点层次中层层回溯到达顶端，而是可以直接访问 `根节点`。

- hasChildNodes() 判断是否有 `子节点`（12 种节点之一）

##### 6、操作节点

- appendChild()

该方法接收一个参数：`新增的节点`。同时会返回 `新增的节点`。

如果传入的节点 `已经是文档的一部分`，那么该节点会从 `原来的位置` 移动到 `节点末尾`。即起到了移动节点的作用。例如：

```javascript
// someNode 有多个子节点
var returnNode = someNode.appendChild(someNode.firstChild);
console.log(returnNode == someNode.firstChild); // false
console.log(returnNode == someNode.lastChild);  // true
```
- insertBefore()

该方法接收两个参数：`新增的节点` 和 `参照的节点`。同时会返回 `新增的节点`。

如果 `参照节点` 为 `null`，则作用和 `appendChild` 一样。例如：

```javascript
// 插入成为最后一个节点
var returnNode = someNode.insertBefore(newNode, null);
console.log(returnNode == newNode); // true
console.log(returnNode == someNode.lastChild); // true

// 插入成为第一个节点
var returnNode = someNode.insertBefore(newNode, someNode.firstChild);
console.log(returnNode == someNode.firstChild); // true

// 插入到最后一个节点前面
var returnNode = someNode.insertBefore(newNode, someNode.lastChild);
console.log(returnNode == someNode.childNodes[someNode.childNodes.length - 2]); // true
```

- replaceChild()

该方法接收两个参数：`新增的节点` 和 `替换的节点`。同时会返回 `替换的节点`。例如：

```javascript
// 替换第一个子节点
someNode.replaceChild(newNode, someNode.firstChild);

// 替换最后一个子节点
someNode.replaceChild(newNode, someNode.lastChild);
```

被替换的节点虽然在文档中没了自己的位置，但是仍然存在。例如：

```html
<div id="oDiv">
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
</div>
```

```javascript
var oDiv = document.getElementById("oDiv");
var aSpans = oDiv.getElementsByTagName('span');
var oNewNode = document.createElement("span");
oNewNode.innerHTML = "new node";

var replaceNode = oDiv.replaceChild(oNewNode, aSpans[1]);

console.log(replaceNode); // <span>2</span>
```

- removeChild()

该方法接收一个参数：`要删除的节点`。同时会返回 `要删除的节点`。例如：

```javascript
// 删除第一个节点
someNode.removeChild(someNode.firstChild);

// 删除最后一个节点
someNode.removeChild(someNode.lastChild);
```

上面这四个方法操作的都是 `某个节点的子节点`。所以，在使用这几个方法之前，需要先获取父节点。但并不是所有的节点都有子节点。如果在不支持子节点的节点上调用了这个方法，会导致错误。








