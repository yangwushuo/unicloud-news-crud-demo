<template>
	<view class="news-detail-wrapper">
		<view v-if="!news._id" class="loading-wrapper">
			<van-loading size="30" color="#2529d8" />
		</view>
		<view v-else class="news">
			<view class="title-wrapper">
				<text>{{news.title}}</text>
			</view>
			<view class="info-wrapper">
				<text>编辑:{{news.author}}</text>
				<view>时间:
					<uni-dateformat :date="news.posttime" format="yyyy/MM/dd hh:mm:ss" :threshold="[0, 0]">
					</uni-dateformat>
				</view>
			</view>
			<view class="cover-wrapper">
				<image class="cover" :src="news.imgPath" mode="aspectFill"></image>
			</view>
			<view class="content-wrapper">
				<text>{{news.content}}</text>
			</view>
			<view class="note-wrapper">
				<text>声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（513894357@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				news: {}
			};
		},
		onLoad({
			id
		}) {
			this.getNewsDetail(id);
		},
		methods: {
			getNewsDetail(id) {
				uniCloud.callFunction({
					name: 'getArticleDetail',
					data: {
						id
					}
				}).then((res) => {
					this.news = res.result.data[0];
					console.log(this.news);
					uni.setNavigationBarTitle({
						title: this.news.title,
					})
				}).catch((err) => {

				})
			}
		}
	}
</script>

<style lang="scss">
	.news-detail-wrapper {
		box-sizing: border-box;
		padding: 15rpx;
		min-height: 100vh;

		.loading-wrapper {
			text-align: center;
			margin: 10rpx auto;
		}

		.news {
			.title-wrapper {
				font-size: 42rpx;
				color: black;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
			}

			.info-wrapper {
				background-color: rgba(206, 206, 206, .4);
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-content: center;
				box-sizing: border-box;
				padding: 5rpx;
				margin: 20rpx 0;
				font-size: 30rpx;
				border-radius: 10rpx;
				color: #666;
			}

			.cover-wrapper {
				width: 100%;
				display: flex;
				justify-content: center;

				.cover {
					border-radius: 15rpx;
				}
			}

			.content-wrapper {
				box-sizing: border-box;
				padding: 15rpx;
				font-size: 36rpx;
				margin: 15rpx 0;
				border-radius: 15rpx;
			}

			.note-wrapper {
				box-sizing: border-box;
				padding: 15rpx;
				background-color: rgba(224, 70, 70, .4);
				color: white;
				border-radius: 15rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
