<template>
	<view class="add-news-wrapper">
		<form>
			<view class="news-info">
				<van-field label="标题" :value="title" title-width="80rpx" class="label-class"
					custom-style="border-radius: 20rpx;" clearable="true" placeholder="请输入文章标题" @input="inputTitle"
					@clear="clearTitle">
					<image slot="left-icon" class="icon" src="../../static/icon/svg/title.svg"></image>
				</van-field>
				<van-field label="作者" :value="author" class="label-class" title-width="80rpx" clearable="true"
					custom-style="border-radius: 20rpx;margin-bottom:2rpx" placeholder="请输入文章标题" @input="inputAuthor"
					@clear="clearAuthor">
					<image slot="left-icon" class="icon" src="../../static/icon/svg/user.svg"></image>
				</van-field>
				<van-field label="封面" class="label-class" title-width="80rpx"
					custom-style="height:100px;border-radius: 20rpx;margin-bottom:2rpx">
					<van-uploader slot="input" style="margin: auto 0;" :preview-image="true" max-count="1"
						@delete="deleteNewsImg" @afterRead="addNewsImgAfter" :file-list="newsImg">
					</van-uploader>
					<image slot="left-icon" class="icon-news-img" src="../../static/icon/svg/newsImg.svg"></image>
				</van-field>
			</view>
			<view class="news-content">
				<van-field placeholder="内容" :value="content" show-word-limit maxlength="2000" clearable="true"
					custom-style="border-radius:20rpx;box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 2px;"
					:autosize="{minHeight:'280rpx'}" type="textarea" @input="inputContent" @clear="clearContent">
				</van-field>
			</view>
			<view class="news-control">
				<view class="news-control-but">
					<van-button color="#2529d8" icon="add" :loading="loading" :loading-text="loadingText" round
						@click="sumbit">
						发布
					</van-button>
					<van-button color="#ff4e00" icon="replay" round @click="reset">
						重置
					</van-button>
				</view>
			</view>
		</form>
		<van-popup round :show="popUpConfig.show" @close="popUpClose" overlay-style="background-color:transparent;"
			position="top" :custom-style="popUpConfig.status? popUpConfig.succStyle: popUpConfig.wrongStyle">
			<view class="popUp">
				<van-icon v-if="popUpConfig.status" name="passed" />
				<van-icon v-else name="close" />
				<text>{{popUpConfig.content}}</text>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog.js';
	import {
		getUuid
	} from '../../utils/id.js';
	export default {
		data() {
			return {
				title: '',
				author: '',
				content: '',
				newsImg: [],
				loading: false,
				loadingText: '发布中',
				popUpConfig: {
					show: false,
					content: '',
					status: true,
					succStyle: 'box-shadow: rgba(142,192,108) 0px 0px 0px 1px;',
					wrongStyle: 'box-shadow: rgba(237,27,46) 0px 0px 0px 1px;'
				}
			};
		},
		methods: {
			sumbit() {

				if (!this.addArticleStatus()) {
					this.hint("不能为空", false);
					return;
				}

				this.loading = true;
				if (!this.newsImg.length) {
					this.addArticle();
				} else {
					uniCloud.uploadFile({
						filePath: this.newsImg[0].url,
						cloudPath: getUuid(),
						fileType: 'image',
						onUploadProgress(e) {
							console.log(e);
						}
					}).then((res) => {
						console.log(res);
						if (res.success) {
							this.addArticle(res.fileID);
						} else {
							this.loading = false;
							//提示发布失败
							console.log("发布失败");
							this.hint("发布失败", false);
						}
					})
				}

			},
			addArticle(imgPath = "") {
				uniCloud.callFunction({
					name: 'addArticle',
					data: {
						title: this.title,
						author: this.author,
						content: this.content,
						imgPath: imgPath,
						posttime: Date.now(),
					}
				}).then((res) => {
					console.log(res);
					if (res.result.id) {
						this.loading = false;
						//提示发布成功
						console.log("发布成功");
						this.hint("发布成功");

						//清空
						uni.navigateBack({
							delta: 9
						})
					} else {
						//提示发布失败
						console.log("发布失败");
						this.hint("发布失败", false);
					}
				});
			},
			inputTitle({
				detail
			}) {
				this.title = detail;
			},
			inputAuthor({
				detail
			}) {
				this.author = detail;
			},
			inputContent({
				detail
			}) {
				this.content = detail;
			},
			clearTitle() {
				this.title = '';
			},
			clearAuthor() {
				this.author = '';
			},
			clearContent() {
				this.content = '';
			},
			deleteNewsImg(e) {
				this.newsImg.splice(e.detail.index, 1);
			},
			addNewsImgAfter(e) {
				this.newsImg.push({
					url: e.detail.file.url,
					size: e.detail.file.size,
					isImage: true
				});
			},
			hint(message = "xxxx", suc = true) {
				this.popUpConfig.status = suc;
				this.popUpConfig.content = message;
				this.popUpConfig.show = true;

				var timer = setTimeout(() => {
					this.popUpConfig.show = false;
					this.popUpConfig.content = '';
				}, 3000);

			},
			popUpClose() {
				this.popUpConfig.show = false;
			},
			addArticleStatus() {
				return this.title.length > 0 && this.author.length > 0 && this.content.length > 0;
			},
			reset() {
				this.title = '';
				this.author = '';
				this.content = '';
				this.newsImg = [];
				this.loading = false;
			}
		},
		computed: {

		}
	}
</script>

<style lang="scss">
	.add-news-wrapper {
		box-sizing: border-box;
		height: 100vh;
		padding: 15rpx;
		display: flex;
		flex-direction: column;

		.news-info {
			border-radius: 20rpx;
			box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 2px;
			margin-bottom: 20rpx;

			.label-class {
				text-align: center;
			}

			// box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
			.icon {
				width: 42rpx;
				height: auto;
			}

			.icon-news-img {
				width: 42rpx;
				height: 42rpx;
			}

		}

		.news-content {}

		.news-control {
			height: 100rpx;
			display: flex;
			justify-content: center;

			.news-control-but {
				van-button {
					line-height: 100rpx;
					margin: 0rpx 15rpx;
				}
			}

		}

		.popUp {
			display: flex;
			flex-direction: row;
			justify-content: center;
			width: 100%;
			height: auto;

			text {
				line-height: 100rpx;
			}
		}
	}
</style>
