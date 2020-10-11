import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Remarkable from 'remarkable'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>

        {/* <MarkdownEditor />, */}

        <HelloWorld text={this.state.text} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}


// 2
// class MarkdownEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.md = new Remarkable();
//     this.handleChange = this.handleChange.bind(this);
//     this.state = { value: 'Hello, **world**!' };
//   }

//   handleChange(e) {
//     this.setState({ value: e.target.value });
//   }

//   getRawMarkup() {
//     return { __html: this.md.render(this.state.value) };
//   }

//   render() {
//     return (
//       <div className="MarkdownEditor">
//         <h3>Input</h3>
//         <label htmlFor="markdown-content">
//           Enter some markdown
//         </label>
//         <textarea
//           id="markdown-content"
//           onChange={this.handleChange}
//           defaultValue={this.state.value}
//         />
//         <h3>Output</h3>
//         <div
//           className="content"
//           dangerouslySetInnerHTML={this.getRawMarkup()}
//         />
//       </div>
//     );
//   }
// }

// 3
class HelloWorld extends React.Component {
  render() {
    function formatName(user) {
      return user.firstName + ' ' + user.lastName;
    }
    
    const user = {
      firstName: 'Harper',
      lastName: 'Perez'
    };
    
    let element = (
      <h1>
        Hello, {formatName(user)}!
      </h1>
    );

    function getGreeting(user) {
      if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
      }
      return <h1>Hello, Stranger.</h1>;
    }

    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    
    element = <Welcome name="Sara" />;

    // 4
    function Avatar(props) {
      return (
        <img className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />
      );
    }
    function UserInfo(props) {
      return (
        <div className="UserInfo">
          <Avatar user={props.user} />
          <div className="UserInfo-name">
            {props.user.name}
          </div>
        </div>
      );
    }
    function Comment(props) {
      return (
        <div className="Comment">
          <UserInfo user={props.author} />
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
    function formatDate() {}
    let author = {
      avatarUrl: '',
      name: '帅比'
    },
    date = new Date(),
    text = "玩会"

    // 5

    class Clock extends React.Component{
      constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }

      componentDidMount() {
        this.timeId = setInterval(
          () => this.tick(),
          1000
        )
      }

      componentWillUnmount() {
        clearInterval(this.timeId)
      }

      tick() {
        this.setState({  // State 的更新可能是异步的, 可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数
          date: new Date()
        })
      }

      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.props.number || 1}, now is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        )
      }
    }

    // # 事件处理
    // 6.1
    class Toggle extends React.Component {
      constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    
        // 为了在回调中使用 `this`，这个绑定是必不可少的
        // JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined
        this.handleClick = this.handleClick.bind(this);
        // 除了绑定，还有两种方式可以解决：使用实验性的 public class fields 语法，将该函数以箭头函数的方式声明；绑定监听事件时，{函数表达式也通过箭头函数调用}，但由于后者在组件每次渲染时都会重新创建，通过prop传递给子组件时，也会造成子组件跟着渲染，不建议使用
      }
    
      handleClick() {
        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
      }

      deleteRow(param, e) {
        alert(param, e);
      }
    
      render() {
        return (
          <div>
            <button onClick={this.handleClick}>
              {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
            {/* 事件对象以及更多的参数将会被隐式的进行传递。?? */}
            <button onClick={this.deleteRow.bind(this, 'aa')}>Delete Row</button> 
          </div>
        );
      }
    }

    // 6.2
    function ActionLink() {
      function handleClick(e) {
        e.preventDefault();
        alert('The link was clicked.');
      }
    
      return (
        <a href="#" onClick={handleClick}>
          Click me
        </a>
      );
    }

    return (
      <div>
        {/* {element} */}
        {/* {getGreeting(user)}
        {getGreeting()} */}
        <Welcome name="Sara" />
        <Welcome name="Shasha" />
        <Welcome name="Haha" />

        <Comment author={author} date={date} text={this.props.text} />

        <Clock />
        <Clock number="2" />
        <Clock number="3" />

        <Toggle />
        <ActionLink />
      </div>
    );

    // JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。
    // React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。
    // Babel 会把 JSX 转译成 React.createElement() 函数调用, 生成“React 元素”对象，React 读取它们来构建 DOM 以及保持随时更新。
    // 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签
    // React 非常灵活，但它也有一个严格的规则：所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
  }
}
export default App;
