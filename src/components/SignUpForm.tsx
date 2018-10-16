import * as React from 'react';
import * as Interface from './ALLInterface'


interface IProps {
	formData: Interface.IformData,
	onSubmit: (e: any) => void;
	onChange: (e: any, key: string) => void;
}

export default class SignUpForm extends React.Component<IProps, {}> {
	constructor(props: any) {
		super(props)
		this.state = {
			selected: 'signUp'
		}

		//this.onChange = this.onChange.bind(this,)
	}

	// public onChange =  (key: string, e: any) =>{
	// 	this.props.onChange.bind(this,key)
	// }


	public render() {
		return (
			// 注册弹框
			<form className="signUp" onSubmit={this.props.onSubmit}> {/* 注册*/}
				<div className="row">
					<label>邮箱</label>
					<input type="text" value={this.props.formData.email}
						onChange={e => this.props.onChange(e, 'email')} />
				</div>
				<div className="row">
					<label>用户名</label>
					<input type="text" value={this.props.formData.username}
						onChange={e => this.props.onChange.bind(e, 'username')} />
				</div>
				<div className="row">
					<label>密码</label>
					<input type="password" value={this.props.formData.password}
						onChange={e => this.props.onChange.bind(e, 'password')} />
				</div>
				<div className="row actions">
					<button type="submit">注册</button>
				</div>
			</form>

		)
	}
}

