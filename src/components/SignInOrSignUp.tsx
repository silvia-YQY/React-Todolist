import * as React from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import * as Interface from './ALLInterface'



interface IProps {
	formData: Interface.IformData,
	onSignUp: (e: any) => void;
	onSignIn: (e: any) => void;
	onChange: (e: any) => void;
	onForgotPassword: (e: any) => void;
}

interface IState {
	selected: string
}



export default class SignInOrSignUp extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			selected: 'signUp'
		}
	}

	// 转换注册登录tab
	public switch = (e: any): void => {
		this.setState({
			selected: e.target.value
		})
	}

	public render() {
		return (
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
					{this.state.selected === 'signUp' ?
						<SignUpForm formData={this.props.formData}
							onSubmit={this.props.onSignUp}
							onChange={this.props.onChange}
						/>
						: null}
					{this.state.selected === 'signIn' ?
						<SignInForm formData={this.props.formData}
							onChange={this.props.onChange}
							onSubmit={this.props.onSignIn}
							onForgotPassword={this.props.onForgotPassword}
						/>
						: null}
				</div>
			</div>
		)
	}
}