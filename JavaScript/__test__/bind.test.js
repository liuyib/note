/**
 * 这些测试用例总结自 MDN：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */

// =========================
// case: this 只会被改变一次
// =========================

function foo(...args) {
  return [this, ...args];
}

const boundLog = foo.bind('a', 1, 2);
// this 一旦被 bind 绑定，就不会再被改变了，这里不会指向 b
const boundLog2 = boundLog.bind('b', 3, 4);

console.assert(boundLog2(5, 6).join('') === 'a123456');

// ================================
// case: 使用 new 后，正确的原型指向
// ================================

class Foo {
  constructor(...args) {
    console.assert(new.target === Foo);
    console.assert(args.join('') === '1234');
  }
}

const BoundFoo = Foo.bind(null, 1, 2);
const boundFoo = new BoundFoo(3, 4);

console.assert(boundFoo instanceof Foo);
console.assert(boundFoo instanceof BoundFoo);

// ===============================================
// case: bind 后的函数，prototype 丢了，不能再被继承
// ===============================================

try {
  class Derived extends class {}.bind(null) {}
  // 不应该执行到这一步
  console.assert(1 === 2);
} catch (error) {
  console.assert(
    String(error) ===
      'TypeError: Class extends value does not have valid prototype property undefined'
  );
}

// ====================
// case: 正确的原型指向
// ====================

class Foo2 {}
const BoundFoo2 = Foo2.bind(null, 1, 2);

console.assert(JSON.stringify(Foo2.prototype) === '{}');
console.assert(JSON.stringify(BoundFoo2.prototype) === undefined);
console.assert(new Foo2() instanceof Foo2);
console.assert(new Foo2() instanceof BoundFoo2);
console.assert(new BoundFoo2() instanceof Foo2);
console.assert(new BoundFoo2() instanceof BoundFoo2);

// ===================
// case: 正确的 name
// ===================

function Foo3() {}
const BoundFoo3 = Foo3.bind(null);

console.assert(BoundFoo3.name === 'bound Foo3');

// ====================
// case: 正确的接收参数
// ====================

function list(...args) {
  return args;
}

function addArguments(arg1, arg2) {
  return arg1 + arg2;
}

console.assert(list(1, 2, 3).join('') === '123');
console.assert(addArguments(1, 2) === 3);

const leadingThirtySevenList = list.bind(null, 37);
const addThirtySeven = addArguments.bind(null, 37);

console.assert(leadingThirtySevenList().join('') === '37');
console.assert(leadingThirtySevenList(1, 2, 3).join('') === '37123');
console.assert(addThirtySeven(5) === 42);
// 10 将会被忽略，因为 bind 前的函数 addArguments 只接收两个参数
console.assert(addThirtySeven(5, 10) === 42);

// =========================================================
// case: 绑定类时，当前类上的所有静态方法将丢失，但继承父类的不会丢
// =========================================================

class Base {
  static baseProp = 'base';
}

class Derived extends Base {
  static derivedProp = 'derived';
}

const BoundDerived = Derived.bind(null);

console.assert(BoundDerived.baseProp === 'base');
console.assert(BoundDerived.derivedProp === undefined);
console.assert(new BoundDerived() instanceof Derived);
