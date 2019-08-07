# JSX 编译器

使用 Babel 在线进行解析 React：

```js
import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input:
        'const App = () => {\n  return (\n    <div>hello world</div>\n  );\n}\nexport default App;\n',
      output: '',
      error: ''
    };
  }

  update = e => {
    let code = e.target.value;

    try {
      this.setState({
        output: window.Babel.transform(code, { presets: ['es2015', 'react'] })
          .code,
        error: ''
      });
    } catch (err) {
      this.setState({
        error: err.message
      });
    }
  };

  render() {
    return (
      <div>
        <header>{this.state.error}</header>
        <textarea onChange={this.update} defaultValue={this.state.input} />
        <pre>{this.state.output}</pre>
      </div>
    );
  }
}

export default App;
```

运行效果：

[Click to CodePen](https://codepen.io/liuyib/pen/bJbepZ/)
