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
	id: number, title: string 
}

export interface IState {
	newTodo: string;
	todoList: IlistItem[];
}

class App extends React.Component<{}, IState> {
	constructor(props: any,state: any) {
		super(props,state)		
		this.state = {
			newTodo: 'test',
			todoList: [
				{id:1, title:'第一个待办'},
        {id:2, title:'第二个待办'},
			]
		}
	}
	public render() {
		const todos = this.state.todoList.map((item, index) => {
			return ( 
        <li key="item.id">
          <TodoItem todo={item} />
        </li>
      )
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
