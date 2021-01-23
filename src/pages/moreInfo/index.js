
import React, { useState, useEffect } from 'react'
// 高阶组件
// reden props
// context
class ManyProps extends React.Component {
	render() {
			return <Toolbar theme="dark" />;
	}
}

function Toolbar(props) {
	// Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
	// 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
	// 因为必须将这个值层层传递所有组件。
	return (
		<div>
		<ThemedButton theme={props.theme} />
		</div>
	);
}
class ThemedButton extends React.Component {
	render() {
			return <button theme={this.props.theme} >{this.props.theme}</button>;
	}
}

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class WithContext extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
			<div>
				<ThemeContext.Provider value="light">
					<Toolbar2 />
				</ThemeContext.Provider>
				{/* <ThemeContext.Consumer > */}
					{/* <div>{this.context}</div> */}
					{/* {value => <div>{this.context}</div> } */}
				{/* </ThemeContext.Consumer> */}
			</div>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar2() {
  return (
    <div>
      <ThemedButton2 />
    </div>
  );
}

class ThemedButton2 extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext; // 实验性的 public class fields 语法
  render() {
    return <button theme={this.context} >{this.context}</button>;
  }
}
// class 上的 contextType 属性可以被赋值为一个由 React.createContext() 创建的 Context 对象，调用 this.context 可以获取其值，任何生命周期包括 render 中都可以访问到它
// MyClass.contextType = MyContext;

// 3
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext3 = React.createContext(
  themes.dark // 默认值
);
class ThemedButton3 extends React.Component {
  render() {
    let props = this.props;
		let theme = this.context;
		console.log('theme: ', theme); //Provider里的value被改变之后，子组件没被重新渲染？？？？
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton3.contextType = ThemeContext3;

// 一个使用 ThemedButton3 的中间组件
function Toolbar3(props) {
  return (
    <ThemedButton3 onClick={props.changeTheme}>
      Change Theme
    </ThemedButton3>
  );
}

class Context3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }),() => {
				console.log('this.state.theme', this.state.theme);
			});
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton3 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar3 changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <ThemedButton3 />
      </div>
    );
  }
}

// 4
const ThemeContext4 = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext4.Consumer>
      {({theme, toggleTheme}) => (
        <button          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>

          Toggle Theme
        </button>
      )}
    </ThemeContext4.Consumer>
  );
}
class Context4 extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <ThemeContext4.Provider value={this.state}>
        <Content />
      </ThemeContext4.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

//HOC: highordercomponent
// 注意：
// 不要在 render 方法中使用 HOC： React diff算法通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树，在reder中使用，每次返回的都是新子树，不仅仅是性能问题，状态都会丢失
// 务必复制静态方法：包装后return出去的组件用不了原来的静态属性（为啥？？），可以通过hoistNonReactStatic(组件, WrappedComponent)绑定静态属性到return出去的组件，或者直接导出属性，在使用的地方导入
// refs和key一样不会自动被传递，解决方法在refs转发那节
// 约定：
// 不要改变原始组件。使用组合：不要改prototype，在返回的HOC的生命周期里处理
// 将不相关的 props 传递给被包裹的组件？？？？是传还是不传，貌似应该不传；const injectedProp = someStateOrInstanceMethod;找找用例
// 返回的单参数 HOC 具有签名 Component => Component的属性，可以最大化可组合性，因为返回值可以作为其他HOC的参数；也可以用来作装饰器？
// 包装组件名称会方便调试：return之前设置Component.displayName = HOCName(WrappedComponent.displayName || WrappedComponent.name || component)

// render prop
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="./cat.gif" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '5vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          我们可以在这里换掉 <p> 的 <Cat>   ......
          但是接着我们需要创建一个单独的 <MouseWithSomethingElse>
          每次我们需要使用它时，<MouseWithCat> 是不是真的可以重复使用.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <MouseWithCat />
      </div>
    );
  }
}

// ref
// React 会在组件挂载时componentDidMount给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值， componentDidUpdate 生命周期钩子触发前更新。
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
    console.log('this.textInput.current: ', this.textInput.current);
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}

export default function MoreInfo() {
	return (
		<div>
			<ManyProps />
			<WithContext />
			<Context3 />
			<Context4 />

			<MouseTracker />

      <CustomTextInput />
      <AutoFocusTextInput />
		</div>
	)
}