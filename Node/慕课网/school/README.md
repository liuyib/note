- 创建模块 test.js
- 导出模块 exports.add = function () {}
- 加载模块 var oTest = require('./test.js')
- 使用模块 oTest.add('hello world')

module.exports = xxx; // 使用 module.exports 使模块成为一个特殊的对象类型
exports.xxx = xxx; // 使用 exports.xxx 使模块成为一个传统的模块实例 （推荐）

#### 一个简单的学校模块

|文件|作用|
|--|--|
|index.js|入口文件（学校模块）|
|myClass.js|班级（引用student、teacher文件）|
|student.js|学生|
|teacher.js|老师|
|test.js|测试模块|

> 在改文件目录下，使用命令：**node test.js**
输出：

```bash
Add teacher: 一班老师
Add student: 一班张三
Add student: 一班李四
Add student: 一班王五
Add teacher: 二班老师
Add student: 二班张三
Add student: 二班李四
Add student: 二班王五
Add teacher: 三班老师
Add student: 三班张三
Add student: 三班李四
Add student: 三班王五
```