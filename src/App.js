import React, { useState, useEffect } from 'react';
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

    // 7 条件渲染
    // 7.1
    function UserGreeting(props) {
      return <h1>Welcome back!</h1>;
    }
    function GuestGreeting(props) {
      return <h1>Please sign up.</h1>;
    }
    function Greeting(props) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <UserGreeting />;
      }
      return <GuestGreeting />;
    }

    function LoginButton(props) {
      return (
        <button onClick={props.onClick}>
          Login
        </button>
      );
    }
    function LogoutButton(props) {
      return (
        <button onClick={props.onClick}>
          Logout
        </button>
      );
    }
    class LoginControl extends React.Component {
      constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
      }
    
      handleLoginClick() {
        this.setState({isLoggedIn: true});
      }
    
      handleLogoutClick() {
        this.setState({isLoggedIn: false});
      }
    
      render() {
        const isLoggedIn = this.state.isLoggedIn;
        // let button;
        // if (isLoggedIn) {
        //   button = <LogoutButton onClick={this.handleLogoutClick} />;
        // } else {
        //   button = <LoginButton onClick={this.handleLoginClick} />;
        // }
    
        return (
          <div>
            <div>
              The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
            </div>
            <Greeting isLoggedIn={isLoggedIn} />
            {/* {button} */}
            <div>
              {isLoggedIn
                ? <LogoutButton onClick={this.handleLogoutClick} />
                : <LoginButton onClick={this.handleLoginClick} />
              }
            </div>
          </div>
        );
      }
    }
    
    // 7.2
    function Mailbox(props) {
      const unreadMessages = props.unreadMessages;
      return (
        <div>
          <h1>Hello!</h1>
          {unreadMessages.length > 0 &&
            <h2>
              You have {unreadMessages.length} unread messages.
            </h2>
          }
        </div>
      );
    }
    
    const messages = ['React', 'Re: React', 'Re:Re: React'];

    // 7.3
    function FalseEle() {
      const count = 0;
      return (
        <div>
          { count && <h1>Messages: {count}</h1>}
        </div>
      );
    }

    // 7.4
    function WarningBanner(props) {
      if (!props.warn) {
        return null;
      }
    
      return (
        <div className="warning">
          Warning!
        </div>
      );
    }
    
    class Page extends React.Component {
      constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
      }
    
      handleToggleClick() {
        this.setState(state => ({
          showWarning: !state.showWarning
        }));
      }
    
      render() {
        return (
          <div>
            <WarningBanner warn={this.state.showWarning} />
            <button onClick={this.handleToggleClick}>
              {this.state.showWarning ? 'Hide' : 'Show'}
            </button>
          </div>
        );
      }
    }
    
    // 8 列表&key
    const numbers = [1, 2, 3, 4, 5];
    // const listItems = numbers.map((number) =>
    //   <li key={number.toString()}>{number}</li>
    // );

    // function NumberList(props) {
    //   const numbers = props.numbers;
    //   // key:给数组中的每一个元素赋予的确定的标识,帮助 React 识别哪些元素改变了。好的经验法则是：在 map() 方法中的元素需要设置 key 属性
    //   // key 最好是元素在列表中拥有的一个独一无二的字符串。通常使用数据中的 id 来作为元素的 key, 没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key, 这样做会导致性能变差
    //   const listItems = numbers.map((number) =>
    //     <li key={number.toString()}>{number}</li>
    //   );
    //   return (
    //     <ul>{listItems}</ul>
    //   );
    // }

    function ListItem(props) {
      // 正确！这里不需要指定 key：
      // props的 key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值
      return <li>{props.key + '---' + props.value}</li>;
    }
    function NumberList(props) {
      const numbers = props.numbers;
      // const listItems = numbers.map((number) =>
      //   // 正确！key 应该在数组的上下文中被指定
      //   <ListItem key={number.toString()} value={number} />
      // );
      return (
        <ul>
          {/* {listItems} */}
          {numbers.map((number) =>
            <ListItem key={number.toString()}value={number} />
          )}
        </ul>
      );
    }

    // 8.2 
    function Blog(props) {
      const sidebar = (
        <ul>
          {props.posts.map((post) =>
            <li key={post.id}>
              {post.title}
            </li>
          )}
        </ul>
      );
      const content = props.posts.map((post) =>
        <div key={post.id}>
          <h3>{post.id}</h3>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      );
      return (
        <div>
          {sidebar}
          <hr />
          {content}
        </div>
      );
    }
    const posts = [
      {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
      {id: 2, title: 'Installation', content: 'You can install React from npm.'}
    ];

    // 9表单
    const FormEle = (
      <form>
        <label>
          名字:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="提交" />
      </form>
    );

    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('提交的名字: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              名字:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="提交" />
          </form>
        );
      }
    }

    // effectHook
    // 1
    class Example extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          count: 0
        };
      }
      // React 的 class 组件没有提供每次渲染之后都执行的生命周期钩子，所以很多情况下会在组件加载和更新时执行同样的操作
      componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
      }
      componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
      }
    
      render() {
        return (
          <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
              Click me
            </button>
          </div>
        );
      }
    }

    // function Example() {
    //   const [count, setCount] = useState(0);
    
    //   // useEffect Hook：可以看做React class 的 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
    //   // effect：传递给 useEffect 的函数在每次渲染后都会生成新的 effect，每个 effect “属于”一次特定的渲染
    //   // 异步：与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快；个别需要同步的情况有对应的api
    //   // 副作用: 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。在 React 组件中有两种常见副作用操作：需要清除的和不需要清除的
    //   useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    //   });
    
    //   return (
    //     <div>
    //       <p>You clicked {count} times</p>
    //       <button onClick={() => setCount(count + 1)}>
    //         Click me
    //       </button>
    //     </div>
    //   );
    // }

    // 2
    // class FriendStatus extends React.Component {
    //   constructor(props) {
    //     super(props);
    //     this.state = { isOnline: null };
    //     this.handleStatusChange = this.handleStatusChange.bind(this);
    //   }
    
    //   componentDidMount() { //还需要componentDidUpdate
    //     ChatAPI.subscribeToFriendStatus(
    //       this.props.friend.id,
    //       this.handleStatusChange
    //     );
    //   }
    //   componentWillUnmount() {
    //     ChatAPI.unsubscribeFromFriendStatus(
    //       this.props.friend.id,
    //       this.handleStatusChange
    //     );
    //   }
    //   handleStatusChange(status) {
    //     this.setState({
    //       isOnline: status.isOnline
    //     });
    //   }
    
    //   render() {
    //     if (this.state.isOnline === null) {
    //       return 'Loading...';
    //     }
    //     return this.state.isOnline ? 'Online' : 'Offline';
    //   }
    // }

    // function FriendStatus(props) {
    //   const [isOnline, setIsOnline] = useState(null);
    
    //   useEffect(() => {
    //     function handleStatusChange(status) {
    //       setIsOnline(status.isOnline);
    //     }
    //     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    //     // Specify how to clean up after this effect:
    // 返回函数是 effect 可选的清除机制，在每次渲染时、执行当前 effect 之前对上一个 effect 进行清除
    // 使用多个 Effect 实现关注点分离；React 将按照 effect 声明的顺序依次调用组件中的每一个 effect
    // 忘记正确地处理 componentDidUpdate 是 React 应用中常见的 bug 来源!!!!!每次更新的时候都会运行 Effect 可以解决这类问题
    //     return function cleanup() {
    //       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    //     };
    //   });
    
    //   if (isOnline === null) {
    //     return 'Loading...';
    //   }
    //   return isOnline ? 'Online' : 'Offline';
    // }

    // 跳过 Effect：在 class 组件中，可以通过在 componentDidUpdate中添加if (prevState.count !== this.state.count)判断是否执行；在Hook Api中只要传递数组作为 useEffect 的第二个可选参数，数组内容可以是变量或函数；若是变量，会比较渲染前后的值；若是函数，；若是空数组，effect 内部的 props 和 state 就会一直拥有其初始值，effect永远都不需要重复执行

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

        {/* <Greeting isLoggedIn={false} />, */}
        <LoginControl />,
        <Mailbox unreadMessages={messages} />
        <FalseEle />
        <Page />

        {/* <ul>{listItems}</ul> */}
        <NumberList numbers={numbers} />
        <Blog posts={posts} />

        {/* {FormEle} */}
        <NameForm />

        <Example />
        <FriendStatus />
      </div>
    );

    // JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。
    // React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。
    // Babel 会把 JSX 转译成 React.createElement() 函数调用, 生成“React 元素”对象，React 读取它们来构建 DOM 以及保持随时更新。
    // 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签
    // React 非常灵活，但它也有一个严格的规则：所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

    // useState的语法是解构赋值；State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组
  }
}
export default App;
