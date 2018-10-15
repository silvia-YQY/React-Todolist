import * as React from 'react';
import './TodoItem.css'

interface IProps {
	todo: {
		id: number,
		title: string,
		status: null,
		deleted: boolean
	};
	onToggle: (e: any, todo: any) => void,
	onDelete: (e: any, todo: any) => void
}

// export interface IState {
// 	// date: Date;
// 	// count: number;
// }

export default class TodoItem extends React.Component<IProps, {}> {
	constructor(props: any, state: any) {
		super(props, state)
	}

	public toggle = (e: any): void => {
		this.props.onToggle(e, this.props.todo)
	}

	public delete = (e: any): void => {
		this.props.onDelete(e, this.props.todo)
	}
	public render() {
		return <div key={this.props.todo.id} className="TodoItem" >
			<input type="checkbox" checked={this.props.todo.status === 'completed'}
				onChange={this.toggle} />
			{this.props.todo.title}
			<button onClick={this.delete}>删除</button>
		</div>
	}
}