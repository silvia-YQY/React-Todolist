import * as React from 'react';

export interface IProps {
	todo: { id: number, title: string };
}

// export interface IState {
// 	// date: Date;
// 	// count: number;
// }

export default class TodoItem extends React.Component<IProps, {}> {
	constructor(props: any, state: any) {
		super(props, state)
	}
	public render() {
		return <div key="this.props.todo.title" >{this.props.todo.title}</div>
	}
}