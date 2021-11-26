<template>
	<view>
		<h1>个人中心</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		async onLoad() {
			// 访问此页面如果没有token 将跳转到登录页面
			// if (!this.$u.utils.isLogin()) return
			this.$u.api.userInfo()
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>

</style>
