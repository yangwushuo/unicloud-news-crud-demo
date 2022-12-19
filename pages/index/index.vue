<template>
	<view class="home-wrapper">
		<scroll-view scroll-y class="news-wrapper" :lower-threshold="scrollConfig.lowerThreshold"
			:refresher-enabled="scrollConfig.refresherEnabled" :refersher-threshold="scrollConfig.refresherThreshold"
			:refersher-default-style="scrollConfig.refresherDefaultStyle"
			:refresher-triggered="scrollConfig.refresherTriggered"
			:refersher-background="scrollConfig.refresherBackground" @scrolltolower="getMoreNews"
			@refresherrefresh="getLatestNews">
			<view>
				<newsBox v-for="item in news" :key="item._id" :item="item" @goNewsDetail="goNewsDetail" @popPic="popPic"
					@del="confirmDelNews" @up="confirmUpNews">
				</newsBox>
				<view class="news-wrapper-hint">
					<van-loading v-if="newsHintStauts" size="30" color="#2529d8" />
					<text v-else>没有更多</text>
				</view>
			</view>
		</scroll-view>

		<view>
			<view class="home-control" @click="goAdd">
				<van-icon color="white" name="plus" />
			</view>
		</view>
		<van-overlay :show="overlayConfig.show" z-index="1000" @click="onClickHide">
			<view class="overlay-wrapper">
				<image :src="overlayConfig.imgSrc" mode="aspectFill"></image>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: [],
				num: 10,
				newsHintStauts: true,
				scrollConfig: {
					lowerThreshold: 50,
					refresherEnabled: true,
					refresherThreshold: 45,
					refresherDefaultStyle: 'white',
					refresherBackground: 'white',
					refresherTriggered: false
				},
				overlayConfig: {
					show: false,
					imgSrc: ''
				}
			}
		},
		onShow() {
			this.getNews();
		},
		methods: {
			getMoreNews() {
				console.log("开始触底刷新");
				this.getNews(this.news.length, 2);
			},
			getLatestNews() {
				console.log("开始刷新开启");
				if (this._freshing) {
					return;
				} else {
					this._freshing = true;
				}
				this.scrollConfig.refresherTriggered = true;
				this.getNews(0, 1);
			},
			getNews(start = 0, dir = 0) {
				//获取新闻
				uniCloud.callFunction({
					name: 'getArticle',
					data: {
						num: this.num,
						start
					}
				}).then((res) => {
					if (dir == 0) {
						this.news = res.result.data;
					} else if (dir == 1) {
						console.log(res.result.data);
						var latestNewsArr = res.result.data.map(item => {
							for (var i = 0; i < this.news.length; i++) {
								if (item._id == this.news[i]._id) {
									return;
								}
							}
							return item;
						})
						console.log(latestNewsArr);
						latestNewsArr = latestNewsArr.filter(item => {
							return item;
						})
						console.log(latestNewsArr);
						this.news.unshift(...latestNewsArr);
						this.scrollConfig.refresherTriggered = false;
						this._freshing = false;
						console.log("开始刷新结束");
					} else if (dir == 2) {
						if (res.result.data.length == 0) {
							this.newsHintStauts = false;
						} else {
							this.news.push(...res.result.data);
						}
					}
				})
			},
			goAdd() {
				uni.navigateTo({
					url: '/pages/add/add'
				})
			},
			goNewsDetail({
				id,
				title
			}) {
				uni.navigateTo({
					url: `/pages/newDetail/newDetail?id=${id}`
				})
			},
			popPic(imgUrl) {
				this.overlayConfig.show = true;
				this.overlayConfig.imgSrc = imgUrl;
			},
			onClickHide() {
				this.overlayConfig.show = false;
			},
			confirmDelNews(id) {
				// console.log("确认删除", id);
				uniCloud.callFunction({
					name: 'delArticle',
					data: {
						id
					}
				}).then((res) => {

					//删除新闻列表中id新闻
					for (var i = 0; i < this.news.length; i++) {
						if (this.news[i]._id == id) {
							this.news.splice(i, 1);
							break;
						}
					}
				})
			},
			confirmUpNews(id) {
				uni.navigateTo({
					url: `/pages/edit/edit?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-wrapper {
		.news-wrapper {
			height: 100vh;
			box-sizing: border-box;


			.news-wrapper-hint {
				margin: 10rpx;
				color: #848a8c;
				text-align: center;
			}
		}

		.home-control {
			width: 80rpx;
			height: 80rpx;
			background-color: #2529d8;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-content: center;
			position: fixed;
			right: 50rpx;
			bottom: 50rpx;
			z-index: 99;
			box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
		}

		.overlay-wrapper {
			height: 100vh;
			width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}

	}
</style>
