使用 Babel 在线进行解析 React：

```js
import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      input: '{/* Input your txt! */}',
      output: '',
      error: ''
    };
  }
  
  update = (e) => {
    let code = e.target.value;

    try {
      this.setState({
        output: window.Babel
          .transform(code, { presets: ['es2015', 'react'] }).code,
        error: '',
      });
    } catch (err) {
      this.setState({
        error: err.message
      })
    }
  };
  
  render() {
    return (
      <div>
        <header>{this.state.error}</header>
        <textarea
          onChange={this.update}
          defaultValue={this.state.input}
        />
        <pre>{this.state.output}</pre>
      </div>
    )
  }
}

export default App

```

运行效果：

<iframe height="452" style="width: 100%;" scrolling="no" title="JSX Live Compiler" src="//codepen.io/liuyib/embed/bJbepZ/?height=452&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/liuyib/pen/bJbepZ/'>JSX Live Compiler</a> by liuyib
  (<a href='https://codepen.io/liuyib'>@liuyib</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
