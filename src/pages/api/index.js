
import React, { useState, useEffect } from 'react'
// React.Component 
// render():class 组件中唯一必须实现的方法
// render() 函数应该为纯函数;如需与浏览器进行交互，请在 componentDidMount() 或其他生命周期方法中执行你的操作。shouldComponentUpdate() 返回 false，则不会调用 render()，也不会调用componentDidUpdate()、不推荐使用的componentWillUpdate()
// constructor():
// 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
// 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。
// React.PureComponent：
// 通过浅对比实现shouldComponentUpdate，在传入相同的props或state时跳过渲染，适用于纯组件避免跳过子组件更新，深层数据结构变化时需要调用forceUpdate()
class LifeCycle extends React.Component {
  constructor(props) {
    super(props)
    // 通过给 this.state 赋值对象来初始化内部 state；为事件处理函数绑定实例
    // tip：在构造函数中只能直接为 this.state 赋值，避免在构造函数中引入任何副作用；在其他方法中赋只能使用 this.setState() 替代
    // tip：避免将 props 的值复制给 state，直接使用props,否则props 变动不会改变 state
    // tip：state依赖props时，查看此处链接经验总结
    console.log('props: ', props);
  }
  componentDidMount() {
    // 会在组件挂载后（插入 DOM 树中）、render前执行。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据（依赖dom？？）、依赖dom节点大小或位置的，调用setState会触发额外渲染，但会在之前的之前的渲染完成前完成，避免用户看到中间状态
  } 
  componentDidUpdate(prevProps, prevState, snapshot) {
    // snapshot:getSnapshotBeforeUpdate() 生命周期（不常用）的返回值 || undefined
    // 典型用法（不要忘记比较 props）：
    if (this.props.userID !== prevProps.userID) {
      // this.fetchData(this.props.userID);
      // this.setState() // 必须在条件语句里，否则会死循环
    }
  }
  componentWillUnmount() {
    // 会在组件卸载及销毁之前直接调用，不应调用 setState()，因为组件实例卸载后，将不会再挂载和渲染它。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
  } 
  shouldComponentUpdate(nextProps, nextState) {
    // props/state变化时，根据比较值true/false，决定是否重新渲染
    // 深层比较损害性能，可以比较 this.props 与 nextProps 以及 this.state 与nextState，但不会影响子组件重新渲染，后续版本里可能false也不影响组件渲染
    // 不要用它阻止渲染，考虑内置的PureComponent组件
  }

  // 其他api

}

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {/* {props.children} */}
    {ref.current}
  </button>
));
const ref = React.createRef();

export default function MoreInfo() {
  useEffect(() => {
    console.log('ref.current', ref.current);
  })
	return (
		<div>
      <h1>Api</h1>
			<FancyButton ref={ref}>Click me!</FancyButton>;
		</div>
	)
}