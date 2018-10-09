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
	constructor(props: any, state: object) {
		super(props, state)
		this.state = {
			newTodo: 'pleace input something',
			todoList: []
		}
	}

	// 监听回车键，添加待办事项到list
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

	// 监听输入框改变
	public changeTitle = (event: any): void => {
		this.setState({
			newTodo: event.target.value,
			todoList: this.state.todoList
		})
	}

	// 标记是否完成
	public toggle = (e: any, todo: any): void => {
		todo.status = todo.status === 'completed' ? '' : 'completed'
		this.setState(this.state)
	}

	public delete = (event: any, todo: any): void => {
		todo.deleted = true
		this.setState(this.state)
	}

	public render() {
		const todos = 
		this.state.todoList
				.filter((item)=> !item.deleted)
				.map((item, index) => {
			return (
				<li key={item.id}>
					<TodoItem todo={item} 
					onToggle={this.toggle}
					onDelete={this.delete} 
					/>
				</li>
			)
		})
		return (
			<div className="App">
				<h1>我的待办</h1>
				<div className="inputWrapper">
					<TodoInput content={this.state.newTodo}
						onChange={this.changeTitle}
						onSubmit={this.addTodo}
						
					/>
				</div>
				<ol>
					{todos}
				</ol>
			</div>

		);
	}
}

export default App;


// id制造器
let id = 0
function idMaker() {
	id += 1
	return id
}
