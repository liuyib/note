// 测试模块

var oTest = require('./index');  // 引入学校模块

var myClasses = [
  {
    teacherName: '一班老师',
    students: ['一班张三', '一班李四', '一班王五']
  },
  {
    teacherName: '二班老师',
    students: ['二班张三', '二班李四', '二班王五']
  },
  {
    teacherName: '三班老师',
    students: ['三班张三', '三班李四', '三班王五']
  },
];

oTest.add(myClasses);