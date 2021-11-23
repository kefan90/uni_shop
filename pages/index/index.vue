<template>
	<view>
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>
		<view class="u-text-center u-m-t-30">
			<u-tabs :list="sortList" :current="currentSort" @change="changeSort" bar-width="100" item-width="160">
			</u-tabs>
		</view>
		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="(goods, index) in goodsList.length !== 0 ? goodsList : [{}, {}, {}, {}]"
				:key="index">
				<goods-card :goods="goods"></goods-card>
			</u-col>
		</u-row>
		<!-- 骨架屏 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [{
					name: '默认'
				}, {
					name: '销量'
				}, {
					name: '推荐'
				}, {
					name: '最新'
				}],
				// 骨架屏的属性
				loading: false,
				// 默认显示第一个标签 记录筛选条件
				currentSort: 0,
				// 轮播图
				slides: [],
				// 商品
				goodsList: [],
				// 当前的页码
				page: 1,
			}
		},
		onLoad() {
			this.getIndex()
		},
		methods: {
			// 切换标签栏的事件
			changeSort(index) {
				// console.log(index)
				this.currentSort = index
				// 获取数据之前  先将商品信息和分页信息置空
				this.goodsList = []
				this.page = 1
				// 判断筛选条件 重新请求数据
				this.getIndex()
			},
			// 获取首页数据
			async getIndex() {
				this.loading = true
				const params = {
					page: this.page,
				}
				if (this.currentSort == 1) params.sales = 1
				if (this.currentSort == 2) params.recommend = 1
				if (this.currentSort == 3) params.new = 1
				const res = await this.$u.api.index(params)
				// console.log(res)
				// 隐藏骨架屏
				this.loading = false
				this.goodsList = [...this.goodsList, ...res.goods.data]
				this.slides = res.slides
			}
		},
		onReachBottom() {
			// console.log(11)
			// 到达页面底部时  继续请求数据 带上分页的参数
			this.page = this.page + 1
			this.getIndex()
		}
	}
</script>

<style lang="scss" scoped>
</style>
