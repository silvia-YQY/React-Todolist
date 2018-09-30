import * as React from 'react';
import './Hello.css';

export interface IProps {
	name: string;
	enthusiasmLevel?: number;
}

export interface IState {
	date: string;
}

class Hello extends React.Component<IProps, IState> {
	public arr2 : string;
	constructor(props: any) {
		super(props)
		this.state = {
			date: 'ppp',
		};
		this.arr2 = '[2]' 
		
		// 譬如我承继了IProps，和IState，但是我还需要一个arr参数，
		// 那是否还需要在外面定义接口的形式在承继才能用??
	}
	public render() {
		const { name, enthusiasmLevel = 1 } = this.props;
		const { date } = this.state;

		console.log("state", this.state)  // 这里打印出来是有date：ppp 的。
		if (enthusiasmLevel <= 0) {
			throw new Error('You could be a little more enthusiastic. :D');
		}

		return (
			<div className="hello">
				<div className="greeting">
					Hello {name + getExclamationMarks(enthusiasmLevel) + date + this.arr2}
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