const install = (Vue, vm) => {

	// 登录验证
	const isLogin = () => {
		// 获取页面实例  跳转登录之前的那个页面
		const currentPage = getCurrentPages().pop()
		// 获取路径和参数
		const {
			route,
			options
		} = currentPage
		const keys = Object.keys(options);
		let params = ''
		if (keys.length > 0) {
			params += keys.reduce((pre, current) => {
				return `${pre}${current}=${options[current]}&`
			}, '?')
		}
		// 保存路径和参数
		uni.setStorageSync('back_url', `${route}${params.slice(0,-1)}`)

		// 获取token值
		const token = vm.$store.state.vuex_token
		// 判断token值
		if (!token) {
			// 提示需要登录
			vm.$u.toast('请先登录')
			// 1.5秒以后跳转到登录界面
			setTimeout(() => {
				vm.$u.route({
					type: 'reLaunch',
					url: '/pages/auth/login'
				})
			}, 1500)
			return false
		}
		return true
	}

	vm.$u.utils = {
		isLogin
	}

}

export default {
	install
}
