import * as React from 'react';
import * as Interface from './ALLInterface'


interface IProps {
	formData: Interface.IformData,
	onSubmit: (e: any) => void;
	onChange: (e: any, key: string) => void;
}



// 类组件  -- 带状态
// export default class SignUpForm extends React.Component<IProps, {}> {
// 	constructor(props: any) {
// 		super(props)
// 		this.state = {
// 			selected: 'signUp'
// 		}

// 	}

// 	public render() {
// 		return (
// 			// 注册弹框
// 			<form className="signUp" onSubmit={this.props.onSubmit}> {/* 注册*/}
// 				<div className="row">
// 					<label>邮箱</label>
// 					<input type="text" value={this.props.formData.email}
// 						onChange={e => this.props.onChange(e, 'email')} />
// 				</div>
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
// 					<button type="submit">注册</button>
// 				</div>
// 			</form>

// 		)
// 	}
// }




// 函数组件  -- 不太状态
export default function (props:IProps) {
  return (
    <form className="signUp" onSubmit={props.onSubmit}> {/* 注册*/}
      <div className="row">
        <label>邮箱</label>
        <input type="text" value={props.formData.email}
          onChange={e => props.onChange(e, 'email')}/>
      </div>
      <div className="row">
        <label>用户名</label>
        <input type="text" value={props.formData.username}
          onChange={e => props.onChange(e, 'username')}/>
        {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
      </div>
      <div className="row">
        <label>密码</label>
        <input type="password" value={props.formData.password}
          onChange={e => props.onChange(e, 'password')}/>
      </div>
      <div className="row actions">
        <button type="submit">注册</button>
      </div>
    </form>
  )
}

