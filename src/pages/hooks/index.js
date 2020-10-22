import React, { useState, useEffect, useReducer, useRef, useImperativeHandle, forwardRef } from 'react';

// useState的语法是解构赋值；State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组
//  useState 更新变量是通过替换而不是合并，可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。
//  setState(prevState => {
//    也可以使用 Object.assign
//    return {...prevState, ...updatedValues};
//  });
// 将函数传递给 setState返回的函数：用于新的 state 需要通过使用先前的 state 计算得出。该函数将接收先前的 state，并返回一个更新后的值。
// 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
// 更新渲染：给State Hook 的更新函数传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（使用 Object.is 比较算法 来比较 state。）可能仍需要渲染当前组件，但不会对组件树的“深层”节点，Reducer Hook同理
// effectHook
// 1
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        count: 0
        };
		}
		// why hook
    // React 的 class 组件没有提供每次渲染之后都执行的生命周期钩子，所以很多情况下会在组件加载和更新的生命周期钩子里执行同样的操作
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

// useEffect Hook：可以看做React class 的 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
// effect：传递给 useEffect 的函数在每次渲染后都会生成新的 effect，每个 effect “属于”一次特定的渲染
// 异步：与 componentDidMount 或 componentDidUpdate 不同，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，不应在函数中执行阻塞浏览器更新屏幕的操作，这让你的应用看起来响应更快；DOM 变更就必须同步执行时使用 useLayoutEffect（虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行）
// 副作用: 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。在 React 组件中有两种常见副作用操作：需要清除的和不需要清除的
// 返回函数是 effect 可选的清除机制，在每次渲染时、执行当前 effect 之前对上一个 effect 进行清除
// 使用多个 Effect 实现关注点分离；React 将按照 effect 声明的顺序依次调用组件中的每一个 effect
// 忘记正确地处理 componentDidUpdate 是 React 应用中常见的 bug 来源!!!!!每次更新的时候都会运行 Effect 可以解决这类问题
// 跳 Effect：在 class 组件中，可以通过在 componentDidUpdate中添加if (prevState.count !== this.state.count)判断是否执行；在Hook Api中只要传递数组作为 useEffect 的第二个可选参数，数组内容可以是变量或函数；若是变量，会比较渲染前后的值；若是函数，；若是空数组，effect 内部的 props 和 state 就会一直拥有其初始值，effect永远都不需要重复执行（有更好的方法）
// 目前，依赖项数组不会作为参数传给 effect 函数， eslint-plugin-react-hooks 中的 exhaustive-deps 规则会在添加错误依赖时发出警告并给出修复建议
// 使用非受控组件:需要为数据变化的每种方式都编写事件处理函数，并通过一个 React 组件传递所有的输入 state
// Formik:包含验证、追踪访问字段以及处理表单提交的完整解决方案过
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
//     return function cleanup() {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     };
//   });

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }

class FlavorForm extends React.Component {
constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState({value: event.target.value});
}

handleSubmit(event) {
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
}

render() {
    return (
    <form onSubmit={this.handleSubmit}>
        <label>
        选择你喜欢的风味:
        <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
        </select>
        </label>
        <input type="submit" value="提交" />
    </form>
    );
}
}

class Reservation extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    isGoing: true,
    numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
}

handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
    [name]: value
    });
}

render() {
    return (
    <form>
        <label>
        参与:
        <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
        来宾人数:
        <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <label>
        测试:
        <input
            name="aa"
            value={undefined} />
        </label>
    </form>
    );
}
}

// 自定义规则：1. 在组件顶层使用，react是根据顺序调用的 2.在函数组件或自定义hook内调用
// 自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。
// 自定义 Hook 必须以 “use” 用于判断某个函数是否包含对 Hook 的调用，React 以自动检查你的 Hook 是否违反规则
// 每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    // return () => {
    //   ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    // };
  });

  return isOnline;
}
function FriendStatus(props) {
	const isOnline = useFriendStatus(props.friend.id);

	if (isOnline === null) {
		return 'Loading...';
	}
	return isOnline ? 'Online' : 'Offline';
}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
		
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      {/* <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button> */}
    </>
  );
}

// useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>


function Counter2() {
  const initialState = {count: 0};
  
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}


function Counter3({initialCount}) {
  function init(initialCount) {
    return {count: initialCount};
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      case 'reset':
        return init(action.payload);
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
// 传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo
// 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值

// useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值
// 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} type="text" />;
}
FancyInput = forwardRef(FancyInput);

export default function Hooks() {
  return (
		<div>
			<Example />
			{/* <FriendStatus friend={{id:10}} />
			<FriendListItem friend={{id:20}} /> */}
			{/* <select>
			<option value="grapefruit">葡萄柚</option>
			<option value="lime">酸橙</option>
			<option selected value="coconut">椰子</option>
			<option value="mango">芒果</option>
			</select> */}
			<FlavorForm />
			<Reservation />
			
			<Counter initialCount="1" />
      <br />
			<Counter2 />
      <br />
			<Counter3 initialCount={6} />

      <TextInputWithFocusButton />
      <FancyInput />
		</div>
	)
}