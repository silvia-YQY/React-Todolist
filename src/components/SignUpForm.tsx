import * as React from 'react';
import * as Interface from './ALLInterface'


interface IProps {
	formData: Interface.IformData,
	onSubmit: (e: any) => void;
	onChange: (e: any) => void;
}

export default class SignUpForm extends React.Component<IProps, {}> {

	public render() {
		return (
			// 注册弹框
			<form className="signUp" onSubmit={this.props.onSubmit}> {/* 注册*/}
				<div className="row">
					<label>邮箱</label>
					<input type="text" value={this.props.formData.email}
						onChange={this.props.onChange.bind(this, 'email')} />
				</div>
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
					<button type="submit">注册</button>
				</div>
			</form>

		)
	}
}

