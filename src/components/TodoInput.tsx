import * as React from 'react';
import './TodoInput.css'

export interface IProps {
	content: string;
	onSubmit: (e: any) => void
	onChange: (e: any) => void
}

// export interface IState {
// 	date: Date;
// 	count: number;
// }

export default class TodoInput extends React.Component<IProps, {}> {
	constructor(props: any, state: any) {
		super(props, state)
	}
	public submit = (e: any): void => {
		if (e.key === 'Enter') {
			this.props.onSubmit(e)
		}
	}
	public changeTitle = (e: any): void => {
		this.props.onChange(e)
	}
	public render() {
		return <input type="text"
			className="TodoInput"
			value={this.props.content}
			onChange={this.changeTitle}
			onKeyPress={this.submit} />
	}
}
