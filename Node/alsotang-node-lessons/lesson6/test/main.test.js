var main = require('../main');
var should = require('should');

describe('test/main.test.js', function () {
  it('should equal 0 when n === 0', function () {
    main.fibonacci(0).should.equal(0);
  });

  it('should equal 1 when n === 1', function () {
    main.fibonacci(1).should.equal(1);
  });
  
  it('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });

  it('should throw when n > 10', function () {
    (function () {
      main.fibonacci(11);
    }).should.throw('n should <= 10');
  });

  it('should throw when n < 0', function () {
    (function () {
      main.fibonacci(-1);
    }).should.throw('n should >= 0');
  });

  if ('should throw when n isnt Number', function () {
    (function () {
      main.fibonacci('呵呵呵');
    }).should.throw('n should be a Number');
  });
});

// should 断言库的一些其他用法
/* 
1、测试一个数是不是大于 3： 
  (5).should.above(3)
2、测试一个字符串是否有着特定的前缀：
  'foo'.should.startWith('foo');
*/