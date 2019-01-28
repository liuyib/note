var head = require('./head');
var body = require('./body');

var create = function (name) {
  return {
    name: name,
    head: head.create(),
    body: body.create()
  };
};

exports.create = create;