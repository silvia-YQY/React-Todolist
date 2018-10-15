import * as React from 'react';
import * as Interface from './ALLInterface'


interface IProps {
	formData: Interface.IformData,
	onSubmit: (e: any) => void;
	onChange: (e: any) => void;
	onForgotPassword: (e: any) => void;
}

export default class SignInForm extends React.Component<IProps, {}> {

	public render() {
		return (
			// 登录弹框
			<form className="signIn" onSubmit={this.props.onSubmit}> {/* 登录*/}
				<div className="row">
					<label>用户名</label>
					<input type="text" value={this.props.formData.username}
						onChange={this.props.onChange.bind(this, 'username')} />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" value={this.props.formData.password}
						onChange={this.props.onChange.bind(this, 'password')} />
				</div>
				<div className="row actions">
					<button type="submit">登录</button>
					<a href="#" onClick={this.props.onForgotPassword}>忘记密码了？</a>
				</div>
			</form>
		)
	}
}

