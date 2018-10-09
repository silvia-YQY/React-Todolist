import * as React from 'react';
import './App.css';
import TodoInput from "./components/TodoInput"
import TodoItem from './components/TodoItem'
import 'normalize.css'
import './reset.css'

// export interface IProps {
// 	// name: string;
// 	// enthusiasmLevel?: number;
// }

interface IlistItem {
	id: number,
	title: string,
	status: null,
	deleted: boolean
}

export interface IState {
	newTodo: string;
	todoList: IlistItem[];
}

class App extends React.Component<{}, IState> {
	constructor(props: any, state: any) {
		super(props, state)
		this.state = {
			newTodo: 'pleace input something',
			todoList: [
				// {id:1, title:'第一个待办'},
				// {id:2, title:'第二个待办'},
			]
		}
	}
	public addTodo = (event: any): void => {
		this.state.todoList.push({
			id: idMaker(),
			title: event.target.value,
			status: null,
			deleted: false
		})
		this.setState({
			newTodo: '',
			todoList: this.state.todoList
		})

	}
	public changeTitle = (event:any): void => {
		this.setState({
			newTodo: event.target.value,
			todoList: this.state.todoList
		})
	}
	public render() {
		const todos = this.state.todoList.map((item, index) => {
			return (
				<li key={item.id}>
					<TodoItem todo={item} />
				</li>
			)
		})
		return (
			<div className="App">
				<h1>我的待办</h1>
				<div className="inputWrapper">
					<TodoInput content={this.state.newTodo}
						onChange={this.changeTitle}
						onSubmit={this.addTodo} />
				</div>
				<ol>
					{todos}
				</ol>
			</div>

		);
	}
}

export default App;

let id = 0
function idMaker() {
	id += 1
	return id
}
