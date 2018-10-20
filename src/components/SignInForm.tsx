import * as React from 'react';
import * as Interface from '../utils/ALLInterface'


interface IProps {
	formData: Interface.IformData,
	onSubmit: (e: any) => void;
	onChange: (e: any, key: string) => void;
	onForgotPassword: (e: any) => void;
}

// export default class SignInForm extends React.Component<IProps, {}> {

// 	public render() {
// 		return (
// 			// 登录弹框
// 			<form className="signIn" onSubmit={this.props.onSubmit}> {/* 登录*/}
// 				<div className="row">
// 					<label>用户名</label>
// 					<input type="text" value={this.props.formData.username}
// 						onChange={e => this.props.onChange(e, 'username')} />
// 				</div>
// 				<div className="row">
// 					<label>密码</label>
// 					<input type="password" value={this.props.formData.password}
// 						onChange={e => this.props.onChange(e, 'password')} />
// 				</div>
// 				<div className="row actions">
// 					<button type="submit">登录</button>
// 					<a href="#" onClick={this.props.onForgotPassword}>忘记密码了？</a>
// 				</div>
// 			</form>
// 		)
// 	}
// }

export default function (props:IProps) {
  return (
    <form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
      <div className="row">
        <label>用户名</label>
        <input type="text" value={props.formData.username}
          onChange={e => props.onChange(e, 'username')}/>
      </div>
      <div className="row">
        <label>密码</label>
        <input type="password" value={props.formData.password}
          onChange={e => props.onChange(e, 'password')}/>
      </div>
      <div className="row actions">
        <button type="submit">登录</button>
        <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
      </div>
    </form>
  )
}
