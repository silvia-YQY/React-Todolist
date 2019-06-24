import * as AV from 'leancloud-storage'
import * as Interface from '../utils/ALLInterface'


const APP_ID = 'ir3TIhFQBxF8cAtld7O0PsHG-gzGzoHsz';
const APP_KEY = 'hxW1GTLXAanOHxwQrSYlJLwk';

AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

export default AV

// 所有跟 Todo 相关的 LeanCloud 操作都放到这里
export const TodoModel = {
	getByUser(user: any, successFn?: (todos: Interface.IlistItem) => void, errorFn?: (error: any) => void) {
		// 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
		const query = new AV.Query('Todo')
		query.find().then((response:any) => {
			const array = response.map((t:any) => {
				console.log('attributes', t);
				// return {id: t.id, ...t.attributes	}
			})
			if (successFn) {
				successFn.call(null, array)
			}
		}, (error:any) => {
			if (errorFn) {
				errorFn.call(null, error)
			}
		})
	},
	create(obj: Interface.IlistItem, successFn?: (id: string) => void, errorFn?: (error: any) => void) {
		const Todo = AV.Object.extend('Todo')
		const todo = new Todo()
		todo.set('title', obj.title)
		todo.set('status', obj.status)
		todo.set('deleted', obj.deleted)

		// 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
		// 这样做就可以让这个 Todo 只被当前用户看到
		const acl = new AV.ACL()
		acl.setPublicReadAccess(false) // 注意这里是 false
		acl.setWriteAccess(AV.User.current(), true)
		acl.setReadAccess(AV.User.current(), true)
		todo.setACL(acl);


		todo.save().then((response: any) => {
			if (successFn) {
				successFn.call(null, response.id)
			}
		}, (error: any) => {
			if (errorFn) {
				errorFn.call(null, error)
			}
		});
	},
	update(obj: Interface.IlistItem, successFn?: () => void, errorFn?: (error: any) => void) {
		// 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
		const todo = AV.Object.createWithoutData('Todo', obj.id)

		if (obj.title !== undefined) {
			todo.set('title', obj.title)
		}

		if (obj.status !== undefined) {
			todo.set('status', obj.status)
		}

		if (obj.deleted !== undefined) {
			todo.set('deleted', obj.deleted)
		}

		// obj.status !== undefined && todo.set('status', obj.status)
		// obj.deleted !== undefined && todo.set('deleted', obj.deleted)
		// 为什么我要像上面那样写代码？
		// 考虑如下场景
		// update({id:1, title:'hi'})
		// 调用 update 时，很有可能没有传 status 和 deleted
		// 也就是说，用户只想「局部更新」
		// 所以我们只 set 该 set 的
		// 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
		// 考虑如下场景
		// update({id:1, title: '', status: null}}
		// 用户想将 title 和 status 置空，我们要满足
		todo.save().then((response) => {
			if (successFn) {
				successFn.call(null)
			}
		}, (error) => {
			if (errorFn) {
				errorFn.call(null, error)
			}
		})
	},
	destroy(obj: Interface.IlistItem, successFn?: () => void, errorFn?: () => void) {
		// 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#删除对象
		// 我们不应该删除数据，而是将数据标记为 deleted
		obj.deleted = true
		TodoModel.update(obj, successFn, errorFn)
	}
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
