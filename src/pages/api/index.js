
import React, { useState, useEffect } from 'react'

// 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。
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