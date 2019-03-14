var EventEmitter = require("events").EventEmitter;
var oTest = new EventEmitter();

oTest.setMaxListeners(11);

// on 等价于 addEventListener
oTest.on("my_event1", function() {
  console.log(`my_event1: event one`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event two`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event three`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event four`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event five`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event six`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event seven`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event eight`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event nine`);
});

oTest.on("my_event1", function() {
  console.log(`my_event1: event ten`);
});

// 会有警告，EventEmitter默认监听的事件数是10个（防止内存泄漏），
// 如果超出10个，可以执行，但会有警告
// 可以设置最大可以绑定的事件数
oTest.on("my_event1", function() {
  console.log(`!!!my_event1: event eleven`);
});

// 用emit执行事件
oTest.emit("my_event1");

console.log(oTest.listeners('my_event1').length);

// -----------------------------

function todoRemove() {
  console.log('The function to be removed');
}

oTest.on('my_event2', todoRemove);

console.log(oTest.listeners('my_event2').length); // 1

oTest.removeListener('my_event2', todoRemove);

console.log(EventEmitter.listenerCount(oTest, 'my_event2')); // 0

// ------------------------------

console.log(oTest.listeners('my_event1').length); // 11

oTest.removeAllListeners('my_event1');

console.log(oTest.listeners('my_event1').length); // 0