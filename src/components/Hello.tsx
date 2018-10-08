import * as React from 'react';
import './Hello.css';

export interface IProps {
	name: string;
	enthusiasmLevel?: number;
}

export interface IState {
	date: Date;
	count: number;
}

class Hello extends React.Component<IProps, IState> {
	public arr2: string;
	public num: number;
	constructor(props: any) {
		super(props)
		this.state = {
			date: new Date(),
			count: 0,
		};
		this.arr2 = '[2]'
		this.num = 1
		console.log('我已经在 constructor 里将 props 和 state 初始化好了')



		
	}
	public componentWillMount() {
		// setInterval(() => { // 搜索「JS 箭头函数 MDN」
		// 	this.incrementMultiple()
		// }, 5000)
		console.log('已经挂载到页面里了')
	}
	public componentDidMount(){
		console.log('挂载完成了')
	}
	public increment(state: any, props: any) {
		return { count: state.count + 1 };
	}
	public incrementMultiple() {
		
		this.setState({ count: this.state.count + 1 });
		this.setState({ count: this.state.count + 1 });
		this.setState({ count: this.state.count + 1 });
		// this.setState(this.increment);
		// this.setState(this.increment);
		// this.setState(this.increment);
		//this.setState({count: this.state.count + 1});
		console.log("setState", this.state.count)
	}
	public render() {
		const { name, enthusiasmLevel = 1 } = this.props;
		const { date, count } = this.state;
		console.log('嗯，这里是 render')
		if (enthusiasmLevel <= 0) {
			throw new Error('You could be a little more enthusiastic. :D');
		}

		return (
			<div className="hello">
				<div className="greeting">
					Hello {name + getExclamationMarks(enthusiasmLevel) + date + this.arr2 + count}
					{/* <h2>It is {date}.</h2> */}
				</div>
			</div>
		);
	}
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
	return Array(numChars + 1).join('!');
}