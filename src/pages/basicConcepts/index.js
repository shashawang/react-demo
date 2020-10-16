import React from 'react';

// 3
class BasicConcepts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
	render() {
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
		
		// JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。
		// React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。
		// Babel 会把 JSX 转译成 React.createElement() 函数调用, 生成“React 元素”对象，React 读取它们来构建 DOM 以及保持随时更新。
		// 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签
		// React 非常灵活，但它也有一个严格的规则：所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
		
		
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
		function formatDate() { }
		let author = {
			avatarUrl: '',
			name: '帅比'
		},
			date = new Date(),
			text = "玩会"

		// 5

		class Clock extends React.Component {
			constructor(props) {
				super(props);
				this.state = { date: new Date() };
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
				this.state = { isToggleOn: true };

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
				this.state = { isLoggedIn: false };
			}

			handleLoginClick() {
				this.setState({ isLoggedIn: true });
			}

			handleLogoutClick() {
				this.setState({ isLoggedIn: false });
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
				this.state = { showWarning: true };
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
						<ListItem key={number.toString()} value={number} />
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
			{ id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
			{ id: 2, title: 'Installation', content: 'You can install React from npm.' }
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
				this.state = { value: '' };

				this.handleChange = this.handleChange.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
			}

			handleChange(event) {
				this.setState({ value: event.target.value });
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
		// 10.状态提升
		function BoilingVerdict(props) {
			if (props.celsius >= 100) {
				return <p>The water would boil.</p>;
			}
			return <p>The water would not boil.</p>;
		}
		class Calculator extends React.Component {
			constructor(props) {
				super(props);
				this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
				this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
				this.state = { temperature: '', scale: 'c' };
			}

			handleCelsiusChange(temperature) {
				this.setState({ scale: 'c', temperature });
			}

			handleFahrenheitChange(temperature) {
				this.setState({ scale: 'f', temperature });
			}

			render() {
				const scale = this.state.scale;
				const temperature = this.state.temperature;
				const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
				const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

				return (
					<div>
						<TemperatureInput
							scale="c"
							temperature={celsius}
							// 调用 this.setState() 进而请求 React 重新渲染自己本身,React 调用 Calculator 组件的 render 方法得到组件的 UI 呈现。温度转换在这时进行;新 props 分别调用两个 TemperatureInput 子组件的 render 方法来获取子组件的 UI 呈现
							onTemperatureChange={this.handleCelsiusChange} />
						<TemperatureInput
							scale="f"
							temperature={fahrenheit}
							onTemperatureChange={this.handleFahrenheitChange} />
						<BoilingVerdict
							celsius={parseFloat(celsius)} />
					</div>
				);
			}
		}

		const scaleNames = {
			c: 'Celsius',
			f: 'Fahrenheit'
		};

		// class TemperatureInput extends React.Component {
		//   constructor(props) {
		//     super(props);
		//     // let {temperature} = props
		//     this.handleChange = this.handleChange.bind(this);
		//     // this.state = {temperature: props.temperature || undefined};
		//   }

		//   componentDidUpdate() {
		//     console.log('props.temperature', this.props.temperature);
		//     // this.setState({temperature: this.props.temperature});
		//   }

		//   handleChange(e) {
		//     // this.setState({temperature: e.target.value});
		//     this.props.changeTemper(e.target.value, this.props.scale)
		//   }

		//   render() {
		//     const temperature = this.props.temperature || ''; // ''避免首次修改值报错
		//     const scale = this.props.scale;
		//     return (
		//       <fieldset>
		//         <legend>Enter temperature in {scaleNames[scale]}:</legend>
		//         {/* 为啥不能用constructor里的值？？？？ */}
		//         <input value={temperature}
		//                onChange={this.handleChange} />
		//       </fieldset>
		//     );
		//   }
		// }
		// class Calculator extends React.Component {
		//   constructor(props) {
		//     super(props);
		//     this.state = {cTemperature: undefined, fTemperature: undefined};
		//     this.changeTemper = this.changeTemper.bind(this);
		//   }
		//   changeTemper(inputNum, scale) {
		//     scale === 'f' ? this.setState({fTemperature: inputNum}) : this.setState({cTemperature: inputNum})
		//     let convert = scale === 'f' ? this.toCelsius : this.toFahrenheit
		//     let temper = this.tryConvert(inputNum, convert)
		//     scale === 'f' ? this.setState({cTemperature: temper}) : this.setState({fTemperature: temper})
		//   }
		//   toCelsius(fahrenheit) {
		//     return (fahrenheit - 32) * 5 / 9;
		//   }
		//   toFahrenheit(celsius) {
		//     return (celsius * 9 / 5) + 32;
		//   }
		//   tryConvert(temperature, convert) {
		//     const input = parseFloat(temperature);
		//     if (Number.isNaN(input)) {
		//       return '';
		//     }
		//     const output = convert(input);
		//     const rounded = Math.round(output * 1000) / 1000;
		//     return rounded.toString();
		//   }
		//   render() {
		//     return (
		//       <div>
		//         <TemperatureInput scale="c" temperature={this.state.cTemperature} changeTemper={(temper, scale) => this.changeTemper(temper, scale)} />
		//         <TemperatureInput scale="f" temperature={this.state.fTemperature} changeTemper={(temper, scale) => this.changeTemper(temper, scale)} />
		//         <BoilingVerdict celsius={parseFloat(this.state.cTemperature)} />
		//       </div>
		//     );
		//   }
		// }
		function toCelsius(fahrenheit) {
			return (fahrenheit - 32) * 5 / 9;
		}

		function toFahrenheit(celsius) {
			return (celsius * 9 / 5) + 32;
		}
		function tryConvert(temperature, convert) {
			const input = parseFloat(temperature);
			if (Number.isNaN(input)) {
				return '';
			}
			const output = convert(input);
			const rounded = Math.round(output * 1000) / 1000;
			return rounded.toString();
		}
		class TemperatureInput extends React.Component {
			constructor(props) {
				super(props);
				this.handleChange = this.handleChange.bind(this);
				this.state = { temperature: '' };
			}

			handleChange(e) {
				// this.setState({temperature: e.target.value});
				this.props.onTemperatureChange(e.target.value);
			}

			render() {
				// const temperature = this.state.temperature;
				const temperature = this.props.temperature;
				const scale = this.props.scale;
				return (
					<fieldset>
						<legend>Enter temperature in {scaleNames[scale]}:</legend>
						<input value={temperature}
							onChange={this.handleChange} />
					</fieldset>
				);
			}
		}
		// class Calculator extends React.Component {
		//   render() {
		//     return (
		//       <div>
		//         <TemperatureInput scale="c" />
		//         <TemperatureInput scale="f" />
		//       </div>
		//     );
		//   }
		// }

		// 11组合和继承
		function FancyBorder(props) {
			return (
				<div className={'FancyBorder FancyBorder-' + props.color}>
					{props.children}
				</div>
			);
		}
		function WelcomeDialog() {
			return (
				<FancyBorder color="blue">
					<h1 className="Dialog-title">
						Welcome
          </h1>
					<p className="Dialog-message">
						Thank you for visiting our spacecraft!
          </p>
				</FancyBorder>
				// 写法相当于如下？
				// <FancyBorder color="blue"
				//   children = {<h1 className="Dialog-title">
				//     Welcome
				//   </h1>
				//   <p className="Dialog-message">
				//     Thank you for visiting our spacecraft!
				//   </p>} >
				// </FancyBorder>
			);
		}
		function SplitPane(props) {
			return (
				<div className="SplitPane">
					<div className="SplitPane-left">
						{props.left}
					</div>
					<div className="SplitPane-right">
						{props.right}
					</div>
				</div>
			);
		}

		// <Contacts /> 和 <Chat /> 之类的 React 元素本质就是对象（object），所以你可以把它们当作 props，像其他数据一样传递
		// 官方貌似是推荐（初学者）用组合而非继承避免很多问题，‘Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式’，‘如果你想要在组件间复用非 UI 的功能，建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们’
		function Ext() {
			return (
				<SplitPane
					left={
						<Contacts />
					}
					right={
						<Chat />
					} />
			);
		}
		function Contacts() {
			return <div>多联系</div>
		}
		function Chat() {
			return <div>多交流</div>
		}

		function Dialog(props) {
			return (
				<FancyBorder color="blue">
					<h1 className="Dialog-title">
						{props.title}
					</h1>
					<p className="Dialog-message">
						{props.message}
					</p>
				</FancyBorder>
			);
		}

		function WelcomeDialog2() {
			return (
				<Dialog
					title="Welcome"
					message="Thank you for visiting our spacecraft2!" />
			);
		}

		function Dialog2(props) {
			return (
				<FancyBorder color="blue">
					<h1 className="Dialog-title">
						{props.title}
					</h1>
					<p className="Dialog-message">
						{props.message}
					</p>
					{props.children}
				</FancyBorder>
			);
		}
		class SignUpDialog extends React.Component {
			constructor(props) {
				super(props);
				this.handleChange = this.handleChange.bind(this);
				this.handleSignUp = this.handleSignUp.bind(this);
				this.state = { login: '' };
			}

			render() {
				return (
					<Dialog2 title="Mars Exploration Program"
						message="How should we refer to you?">
						<input value={this.state.login}
							onChange={this.handleChange} />
						<button onClick={this.handleSignUp}>
							Sign Me Up!
            </button>
					</Dialog2>
				);
			}

			handleChange(e) {
				this.setState({ login: e.target.value });
			}

			handleSignUp() {
				alert(`Welcome aboard, ${this.state.login}!`);
			}
		}



		// 12. React 哲学
		// 1. 将设计好的 UI 划分为组件层级:一个组件原则上只能负责一个功能;数据模型-->UI-->组件
		// 2. 用 React 创建一个静态版本
		// 2.1 最好将渲染 UI 和添加交互这两个过程分开。这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码
		// 2.2 静态版本使用props，不要使用 state
		// 2.3 自上而下或者自下而上构建：
		// 3. 确定 state 的最小（且完整）表示：非props、可变数据、最小集合（其他数据均由它们计算产生）
		// 4. 确定 state 放置的位置
		// 5. 反向数据流

		return (
			<div>
				{/* <TodoList /> */}
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

				<WelcomeDialog />
				<WelcomeDialog2 />
				<Ext />
				<SignUpDialog />

				{element}
				{getGreeting(user)}
				{getGreeting()}
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


				<Calculator />
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
export default BasicConcepts;
