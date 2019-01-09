var oClass = require('./myClass');

function add(classes) {
  classes.forEach(function(item, index) {
    var _class = item;
    var _teacherName = _class.teacherName;
    var _students = _class.students;
    
    oClass.add(_teacherName, _students);
  });
}

exports.add = add;  // 暴露学校模块