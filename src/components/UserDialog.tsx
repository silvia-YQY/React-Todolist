import * as React from 'react';
import './UserDialog.css'
import { signUp, signIn } from './leancloud'
import deepClone from './deepClone'

export interface IProps {
	onSignUp: (e: any) => void;
	onSignIn: (e: any) => void;
}

export interface IState {
	selected: string;
	formData: {
		username: string,
		password: string,
	}
}


export default class UserDialog extends React.Component<IProps, IState>{
	constructor(props: any) {
		super(props)
		this.state = {
			selected: 'signUp',
			formData: {
				username: '',
				password: '',
			}
		}
	}

	// 转换注册登录tab
	public switch = (e: any): void => {
		this.setState({
			selected: e.target.value
		})
	}

	// 注册
	public signUp = (e: any): void => {
		e.preventDefault()
		const { username, password } = this.state.formData
		const successFn = (user: object): void => {
			console.log('user', user)
			this.props.onSignUp.call(null, user)
		}
		const errorFn = (error: any) => {
			switch (error.code) {
				case 201:
					alert('没有提供密码，或者密码为空')
					break
				case 202:
					alert('用户名已被占用')
					break
				default:
					alert(error)
					break
			}

		}
		signUp(username, password, successFn, errorFn)   // leancloud 注册
	}

	// 登录
	public signIn = (e: any): void => {
		e.preventDefault()
		const { username, password } = this.state.formData
		const successFn = (user: object) => {
			this.props.onSignIn.call(null, user)
		}
		const errorFn = (error: any) => {
			switch (error.code) {
				case 210:
					alert('用户名与密码不匹配')
					break
				case 211:
					alert('找不到用户')
					break
				case 217:
					alert('无效的用户名，不允许空白用户名')
					break
				case 218:
					alert('无效的密码，不允许空白密码')
					break
				case 219:
					alert('失败登录超过6次，请15分钟后重新尝试')
					break
				default:
					alert(error)
					break
			}
		}
		signIn(username, password, successFn, errorFn)  // leancloud 登录
	}

	// 改变表单内容是保存
	public changeFormData = (key: string, e: any): void => {
		// e.persist();
		const stateCopy = deepClone(this.state)  // 用 JSON 深拷贝
		stateCopy.formData[key] = e.target.value
		this.setState(stateCopy)
	}

	public render() {
		const signUpForm = (
			<form className="signUp" onSubmit={this.signUp}> {/* 注册*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" value={this.state.formData.username}
						onChange={this.changeFormData.bind(this, 'username')} />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" value={this.state.formData.password}
						onChange={this.changeFormData.bind(this, 'password')} />
				</div>
				<div className="row actions">
					<button type="submit">注册</button>
				</div>
			</form>
		)
		const signInForm = (
			<form className="signIn" onSubmit={this.signIn}> {/* 登录*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" value={this.state.formData.username}
						onChange={this.changeFormData.bind(this, 'username')} />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" value={this.state.formData.password}
						onChange={this.changeFormData.bind(this, 'password')} />
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
						{this.state.selected === 'signUp' ? signUpForm : signInForm}
						{/* {this.state.selected === 'signIn' ? signInForm : null} */}
					</div>
				</div>
			</div>
		)
	}
}