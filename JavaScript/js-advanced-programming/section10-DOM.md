##### 1、DOM 是针对 HTML 和 **XML** 的一套 API。

##### 2、文档元素

文档元素是每个文档的根节点，在 `HTML` 中，文档元素始终是 `<html>`；在 `XML` 中，没有预定的元素，因此任何元素都有可能成为文档元素。

##### 3、节点类型

DOM1 中定义了一个 Node 接口，JS 中作为 Node 类型实现了这个接口。JS 中总共有 12 种节点类型，这些节点类型都继承自 Node 类型，并都有一个 nodeType 属性。这些节点类型中，我们能用到的是元素、文本、注释节点，他们的 nodeType 分别是 1、3、8。

##### 4、nodeName 和 nodeValue 属性

> 这两个属性的值取决于节点类型（所以使用之前最好检测一下节点类型）。
> 例如：元素节点的 nodeName 是元素名，nodeValue 是 null

##### 5、访问节点

访问子节点：

- childNodes 属性
- firstChild
- lastChild

> childNodes 属性中保存着 NodeList 对象。NodeList 对象是一种类数组对象。
> 其中
childNodes[0] == firstChild
childNodes[childNodes.length - 1] == lastChild
如果没有子节点，则 firstChild, lastChild 均为 null 

访问父节点：

- parentNode 属性

访问兄弟节点：

- previousSibling
- nextSibling

> 如果一个节点没有上一个 / 下一个节点，那么他的 previousSibling / nextSibling 属性为 null。

节点之间的访问属性可以用下图表示：

![](./imgs/section10/node_map.png)