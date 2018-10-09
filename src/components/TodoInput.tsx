import * as React from 'react';

export interface IProps {
	content: string;
	onSubmit: (e: any) => void
}

// export interface IState {
// 	date: Date;
// 	count: number;
// }

export default class TodoInput extends React.Component<IProps, {}> {
	constructor(props: any, state: any) {
		super(props, state)
	}
	public submit = (e: any): void =>  {
		if (e.key === 'Enter') {
			this.props.onSubmit(e)
		}
	}
	public render() {
		return <input type="text" defaultValue={this.props.content}
			onKeyPress={this.submit} />
	}
}
