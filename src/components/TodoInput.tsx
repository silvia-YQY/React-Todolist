import * as React from 'react';
import './TodoInput.css'

interface IProps {
	content: string;
	onSubmit: (e: any) => void
	onChange: (e: any) => void
}

// export interface IState {
// 	date: Date;
// 	count: number;
// }

// export default class TodoInput extends React.Component<IProps, {}> {
// 	constructor(props: any, state: any) {
// 		super(props, state)
// 	}
// 	public submit = (e: any): void => {
// 		if (e.key === 'Enter') {
// 			this.props.onSubmit(e)
// 		}
// 	}
// 	public changeTitle = (e: any): void => {
// 		this.props.onChange(e)
// 	}
// 	public render() {
// 		return <input type="text"
// 			className="TodoInput"
// 			value={this.props.content}
// 			onChange={this.changeTitle}
// 			onKeyPress={this.submit} />
// 	}
// }


function submit(props: IProps, e: any) {
	if (e.key === 'Enter') {
		props.onSubmit(e)
	}
}
function changeTitle(props: IProps, e: any) {
	props.onChange(e)
}
// 搞不清楚 bind 用法的同学，请看完 MDN
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// 尤其是示例要看懂
export default function (props: IProps) {
	return <input type="text" value={props.content}
		className="TodoInput"
		onChange={changeTitle.bind(null, props)}
		onKeyPress={submit.bind(null, props)} />
}