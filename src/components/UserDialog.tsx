import * as React from 'react';
import './UserDialog.css'
import { signUp, signIn, sendPasswordResetEmail } from './leancloud'
import deepClone from './deepClone'

export interface IProps {
	onSignUp: (e: any) => void;
	onSignIn: (e: any) => void;
}

export interface IState {
	selected: string;
	selectedTab: string,
	formData: {
		email: string,
		username: string,
		password: string,
	}
}


export default class UserDialog extends React.Component<IProps, IState>{
	constructor(props: any) {
		super(props)
		this.state = {
			selected: 'signUp', // 'signIn'
			selectedTab: 'signInOrSignUp', // 'forgotPassword'
			formData: {
				email: '',
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
		const { email, username, password } = this.state.formData
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
		signUp(email, username, password, successFn, errorFn)   // leancloud 注册
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

	// 忘记密码
	public showForgotPassword = (): void => {
		const stateCopy = deepClone(this.state)
		stateCopy.selectedTab = 'forgotPassword'
		this.setState(stateCopy)
	}

	// 重置密码
	public resetPassword = (e: any): void => {
		e.preventDefault()
		sendPasswordResetEmail(this.state.formData.email)
	}

	// 返回
	public returnToSignIn = () => {
		const stateCopy = deepClone(this.state)
		stateCopy.selectedTab = 'signInOrSignUp'
		this.setState(stateCopy)
	}

	public render() {
		// 注册弹框
		const signUpForm = (
			<form className="signUp" onSubmit={this.signUp}> {/* 注册*/}
				<div className="row">
					<label>邮箱</label>
					<input type="text" value={this.state.formData.email}
						onChange={this.changeFormData.bind(this, 'email')} />
				</div>
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

		// 登录弹框
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
					<a href="#" onClick={this.showForgotPassword}>忘记密码了？</a>
				</div>
			</form>
		)

		// 注册或者登录弹框
		const signInOrSignUp = (
			<div className="signInOrSignUp">
				<nav>
					<label>
						<input type="radio" value="signUp"
							checked={this.state.selected === 'signUp'}
							onChange={this.switch}
						/> 注册</label>
					<label>
						<input type="radio" value="signIn"
							checked={this.state.selected === 'signIn'}
							onChange={this.switch}
						/> 登录</label>
				</nav>
				<div className="panes">
					{this.state.selected === 'signUp' ? signUpForm : null}
					{this.state.selected === 'signIn' ? signInForm : null}
				</div>
			</div>
		)

		// 忘记密码弹框
		const forgotPassword = (
			<div className="forgotPassword">
				<h3>
					重置密码
        </h3>
				<form className="forgotPassword" onSubmit={this.resetPassword}> {/* 登录*/}
					<div className="row">
						<label>邮箱</label>
						<input type="text" value={this.state.formData.email}
							onChange={this.changeFormData.bind(this, 'email')} />
					</div>
					<div className="row actions">
						<button type="submit">发送重置邮件</button>
						<a href="#" onClick={this.returnToSignIn}>返回登录</a>
					</div>
				</form>
			</div>
		)
		return (

			<div className="UserDialog-Wrapper">
				<div className="UserDialog">
					{/* <nav>
						<label><input type="radio" value="signUp" onChange={this.switch} checked={this.state.selected === 'signUp'} /> 注册</label>
						<label><input type="radio" value="signIn" onChange={this.switch} checked={this.state.selected === 'signIn'} /> 登录</label>
					</nav> */}
					<div className="panes">
						{this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
						{/* {this.state.selected === 'signIn' ? signInForm : null} */}
					</div>
				</div>
			</div>
		)
	}
}