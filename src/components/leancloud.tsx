import * as AV from 'leancloud-storage'

const APP_ID = 'ir3TIhFQBxF8cAtld7O0PsHG-gzGzoHsz';
const APP_KEY = 'hxW1GTLXAanOHxwQrSYlJLwk';

AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

export default AV

export function signUp(username: string, password: string, successFn: (user: string) => void, errorFn: any) {
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

function getUserFromAVUser(AVUser: any) {
	return {
		id: AVUser.id,
		...AVUser.attributes
	}
}