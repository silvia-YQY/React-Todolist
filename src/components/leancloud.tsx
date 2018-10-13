import * as AV from 'leancloud-storage'

const APP_ID = 'ir3TIhFQBxF8cAtld7O0PsHG-gzGzoHsz';
const APP_KEY = 'hxW1GTLXAanOHxwQrSYlJLwk';

AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

export default AV


// 注册
export function signUp(username: string, password: string, successFn: (user: object) => void, errorFn: (error: any) => void) {
	// 新建 AVUser 对象实例
	const user = new AV.User()
	// 设置用户名
	user.setUsername(username)
	// 设置密码
	user.setPassword(password)
	// 设置邮箱
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
