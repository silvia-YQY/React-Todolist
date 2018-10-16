import * as React from 'react';
import * as Interface from './ALLInterface'
import './UserDialog.css'
import { signUp, signIn, sendPasswordResetEmail } from './leancloud'
import deepClone from './deepClone'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgotPasswordForm'

interface IProps {
	onSignUp: (e: any) => void;
	onSignIn: (e: any) => void;
}

interface IState {
	// selected: string;
	selectedTab: string,
	formData: Interface.IformData
}


export default class UserDialog extends React.Component<IProps, IState>{
	constructor(props: any) {
		super(props)
		this.state = {
			// selected: 'signUp', // 'signIn'
			selectedTab: 'signInOrSignUp', // 'forgotPassword'
			formData: {
				email: '',
				username: '',
				password: '',
			}
		}
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

	
	// 改变表单内容时保存
	public changeFormData = ( e: any , key: string): void => {
		// e.persist();
		const stateCopy = deepClone(this.state)  
		console.log(e);
		console.log(key);

		stateCopy.formData[key] = e.target.value
		this.setState(stateCopy)
	}


	public render() {

		return (

			<div className="UserDialog-Wrapper">
				<div className="UserDialog">
					<div className="panes">
						{this.state.selectedTab === 'signInOrSignUp' ?
							<SignInOrSignUp
								formData={this.state.formData}
								onSignIn={this.signIn}
								onSignUp={this.signUp}
								onChange={this.changeFormData.bind(this,'')}
								onForgotPassword={this.showForgotPassword}
							/> :
							<ForgotPasswordForm
								formData={this.state.formData}
								onSubmit={this.resetPassword}
								onChange={this.changeFormData.bind(this, '')}
								onSignIn={this.returnToSignIn}
							/>
						}
					</div>
				</div>
			</div>
		)
	}
}