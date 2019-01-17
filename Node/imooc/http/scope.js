// 作用域

var globalVariable = 'This is a global variable';

function globalFunction () {
  var _localVariable = 'This is a local variable';

  console.log(`globalVariable: ${globalVariable}`);
  console.log(`_localVariable: ${_localVariable}`);
  
  globalVariable = 'This is a changed global variable';

  console.log(`globalVariable: ${globalVariable}`);

  function localFunction () {
    var _innerLocalVariable = 'This is a inner local variable';

    console.log(`globalVariable: ${globalVariable}`);
    console.log(`_localVariable: ${_localVariable}`); 
    console.log(`_innerLocalVariable: ${_innerLocalVariable}`); 
  }

  console.log(`localFunction is run`);
  localFunction();
}

console.log(`globalFunction is run`);
globalFunction();