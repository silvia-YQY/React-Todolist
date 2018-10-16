import * as React from 'react';
import * as Interface from './ALLInterface'

interface IProps {
	formData: Interface.IformData,
	onSubmit: (e: any) => void;
	onChange: (e: any,key:string) => void;
	onSignIn: (e: any) => void;
}


interface IState {
	selected: string
}



export default class ForgotPasswordForm extends React.Component<IProps, IState> {
	public render() {
		return (
			<div className="forgotPassword">
				<h3>
					重置密码
        </h3>
				<form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录*/}
					<div className="row">
						<label>邮箱</label>
						<input type="text" value={this.props.formData.email}
							onChange={ e => this.props.onChange.bind(e, 'email')} />
					</div>
					<div className="row actions">
						<button type="submit">发送重置邮件</button>
						<a href="#" onClick={this.props.onSignIn}>返回登录</a>
					</div>
				</form>
			</div>
		)
	}
}