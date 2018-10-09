import * as React from 'react';

export interface IProps {
	content: string;
}

export interface IState {
	date: Date;
	count: number;
}

export default class TodoInput extends React.Component<IProps, IState> {
	constructor(props: any,state: any) {
		super(props,state)
	}
	public render() {
		return <input type="text" defaultValue={this.props.content} />
	}
}
