- 创建模块  test.js
- 导出模块  exports.add =function () {}
- 加载模块  var oTest = require('./test.js')
- 使用模块  oTest.add('hello world')

module.exports = xxx;  // 使用 module.exports 使模块成为一个特殊的对象类型
exports.xxx = xxx;     // 使用 exports.xxx 使模块成为一个传统的模块实例  （推荐）