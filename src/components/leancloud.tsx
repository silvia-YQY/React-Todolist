import * as AV from 'leancloud-storage'
import * as Interface from './ALLInterface'


const APP_ID = 'ir3TIhFQBxF8cAtld7O0PsHG-gzGzoHsz';
const APP_KEY = 'hxW1GTLXAanOHxwQrSYlJLwk';

AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

export default AV

// interface obj {
// 	status: string,
// 	title: string,
// 	deleted: boolean
// }

// 所有跟 Todo 相关的 LeanCloud 操作都放到这里
export const TodoModel = {
	getByUser(user:any, successFn:(todos:Interface.IlistItem) => void, errorFn: (error:any) => void){
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    const query = new AV.Query('Todo')
    query.find().then((response) => {
      const array = response.map((t) => {
				console.log(t);
				
        // return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, (error) => {
      // errorFn && errorFn.call(null, error)
    })
  },
	create(obj: Interface.InewTodoobj, successFn: (id:number) => void, errorFn: (error:any) => void) {
		const Todo = AV.Object.extend('Todo') 
		const todo = new Todo()
		todo.set('title', obj.title)
		todo.set('status', obj.status)
		todo.set('deleted', obj.deleted)
		todo.save().then((response: any) => {
			successFn.call(null, response.id)
		}, (error: any) => {
			// errorFn && errorFn.call('null', error)
		});
	},
	// update() {
	// },
	// destroy() {
	// }
}

// 注册
export function signUp(email: string, username: string, password: string, successFn: (user: object) => void, errorFn: (error: any) => void) {
	// 新建 AVUser 对象实例
	const user = new AV.User()
	// 设置用户名
	user.setUsername(username)
	// 设置密码
	user.setPassword(password)
	// 设置邮箱
	user.setEmail(email)

	user.signUp().then((loginedUser) => {
		const users = getUserFromAVUser(loginedUser)
		successFn.call(null, users)
	}, (error) => {
		errorFn.call(null, error)
	})
	return undefined
}


// 登入
export function signIn(username: string, password: string, successFn: (user: object) => void, errorFn: (error: any) => void) {
	AV.User.logIn(username, password).then((loginedUser) => {
		const user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	}, (error) => {
		errorFn.call(null, error)
	})
}


// 获取当前用户信息
export function getCurrentUser() {
	const user = AV.User.current()
	if (user) {
		return getUserFromAVUser(user)
	} else {
		return null
	}
}

// 重置邮箱
export function sendPasswordResetEmail(email: string, successFn?: () => void, errorFn?: () => void) {
	AV.User.requestPasswordReset(email).then((success: any) => {
		// successFn && successFn.call(null)
	}, (error) => {
		// errorFn && errorFn.call(null, error)
	})
}

// 获取用户信息
function getUserFromAVUser(AVUser: any) {
	return {
		id: AVUser.id,
		...AVUser.attributes
	}
}

// 登出
export function signOut() {
	AV.User.logOut()
	return undefined
}
