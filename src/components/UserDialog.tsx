import * as React from 'react';
import './UserDialog.css'

// export interface IProps {
// 	name: string;
// 	enthusiasmLevel?: number;
// }


export interface IState {
	selected: string;

}


export default class UserDialog extends React.Component<{}, IState>{
	constructor(props: any) {
		super(props)
		this.state = {
			selected: 'signUp'
		}
	}
	public switch = (e: any) => {
		this.setState({
			selected: e.target.value
		})
	}
	public render() {
		const signUpForm = (
			<form className="signUp"> {/* 注册*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" />
				</div>
				<div className="row actions">
					<button type="submit">注册</button>
				</div>
			</form>
		)
		const signInForm = (
			<form className="signIn"> {/* 登录*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" />
				</div>
				<div className="row actions">
					<button type="submit">登录</button>
				</div>
			</form>
		)
		return (

			<div className="UserDialog-Wrapper">
				<div className="UserDialog">
					<nav>
						<label><input type="radio" value="signUp" onChange={this.switch} checked={this.state.selected === 'signUp'} /> 注册</label>
						<label><input type="radio" value="signIn" onChange={this.switch} checked={this.state.selected === 'signIn'} /> 登录</label>
					</nav>
					<div className="panes">						
						{this.state.selected === 'signUp' ? signUpForm : null}
            {this.state.selected === 'signIn' ? signInForm : null}
					</div>
				</div>
			</div>
		)
	}
}