import * as React from 'react';
import './App.css';
import TodoInput from "./components/TodoInput"

// export interface IProps {
// 	// name: string;
// 	// enthusiasmLevel?: number;
// }

export interface IState {
	newTodo: string;
	todoList:  [
		{ id: number, title: string }
	];
}

class App extends React.Component<{}, IState> {
	constructor(props: any,state: any) {
		super(props,state)		
		this.state = {
			newTodo: 'test',
			todoList: [
				{ id: 1, title: '第一个待办' }
			]
		}
	}
	public render() {
		const todos = this.state.todoList.map((item, index) => {
			// console.log("item",item)
			return <li key="item.id" >{item.title}</li>
		})
		return (
			<div className="App">
				<h1>我的待办</h1>
				<div className="inputWrapper">
					<TodoInput content={this.state.newTodo} />
				</div>
				<ol>
					{todos}
				</ol>
			</div>

		);
	}
}

export default App;
