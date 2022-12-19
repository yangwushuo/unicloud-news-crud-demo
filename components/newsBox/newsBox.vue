<template>
	<view class="main" @touchend="ontouchend">
		<van-swipe-cell async-close="true" name="a" right-width="150" @close="swipeClose">
			<view class="wrapper">
				<view class="ninfo-wrapper" @click="goNewsDetail">
					<view class="ninfo-title" :style="{color: (titleClicked == true ? '#a5a9ab':'')}">{{item.title}}
					</view>
					<view class="ninfo-summary">
						<view>编辑:{{item.author}}</view>
						<view>时间:
							<uni-dateformat :date="item.posttime" format="MM/dd" :threshold="[60000, 86400000]">
							</uni-dateformat>
						</view>
					</view>
				</view>
				<view class="pic-wrapper" v-if="item.imgPath">
					<image :src="item.imgPath" mode="aspectFill" @click="popPic"></image>
				</view>
			</view>
			<view slot="right" class="swipe-right-select">
				<view v-if="swipeConfig.up.show" class="select-up"
					:style="{marginRight: swipeConfig.up.confirm? '0rpx':'13rpx'}" @click="up(item._id)">
					<text>{{swipeConfig.up.confirm? '确认修改':'修改'}}</text>
				</view>
				<view v-if="swipeConfig.del.show" class="select-del" @click="del(item._id)">
					<text>{{swipeConfig.del.confirm? '确认删除': '删除'}}</text>
				</view>
			</view>
		</van-swipe-cell>
	</view>
</template>

<script>
	export default {
		name: "newsBox",
		props: {
			item: {
				type: Object,
				default () {
					return {
						title: "新闻标题",
						imgPath: "/static/img/nopic.png",
						posttime: "2000-1-1 00:00:00",
						author: "盘古",
					}
				}
			}
		},
		data() {
			return {
				titleClicked: false,
				swipeSelect: null,
				totalWidth: 0,
				swipeConfig: {
					up: {
						show: true,
						confirm: false
					},
					del: {
						show: true,
						confirm: false
					}
				}
			}
		},
		mounted() {
			this.swipeSelect = uni.createSelectorQuery()
				.in(this)
				.select('.swipe-right-select');
			this.totalWidth = uni.getWindowInfo().windowWidth;
		},
		methods: {
			popPic() {
				this.$emit('popPic', this.item.imgPath);
			},
			goNewsDetail() {

				//修改标题为灰色
				this.titleClicked = true;

				this.$emit('goNewsDetail', {
					id: this.item._id,
					title: this.item.title
				});
			},
			up(id) {

				if (this.swipeConfig.up.confirm) {
					//最终修改
					this.$emit('up', id);

					//修改完
					this.swipeConfig.up.confirm = false;
					this.swipeConfig.del.show = true;
				} else {
					//初次修改
					this.swipeConfig.del.show = false;
					this.swipeConfig.up.confirm = true;
				}

			},
			del(id) {
				if (this.swipeConfig.del.confirm) {
					//最终删除
					this.$emit('del', id);

					//删除完
					this.swipeConfig.del.confirm = false;
					this.swipeConfig.up.show = true;
				} else {
					//初次删除
					this.swipeConfig.up.show = false;
					this.swipeConfig.del.confirm = true;
				}
			},
			ontouchend() {
				this.swipeSelect.boundingClientRect((res) => {
					if (res.left == this.totalWidth) {
						this.swipeConfig.del.confirm = false;
						this.swipeConfig.up.show = true;
						this.swipeConfig.up.confirm = false;
						this.swipeConfig.del.show = true;
					}
				}).exec();
			},
			swipeClose(e) {
				if (!(this.swipeConfig.del.confirm || this.swipeConfig.up.confirm)) {
					//关闭滑动窗口
					e.detail.instance.close();
				}
			}
		},
		watch: {

		}
	}
</script>

<style lang="scss" scoped>
	.main {

		.wrapper {
			display: flex;
			box-sizing: border-box;
			padding: 13rpx 13rpx 0px 13rpx;

			.pic-wrapper {
				image {
					width: 200rpx;
					height: 200rpx;
					vertical-align: bottom; //解决图片底部留白
					border-radius: 10rpx;
				}
			}

			.ninfo-wrapper {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-around;
				padding: 0rpx 15rpx 0rpx 15rpx;

				.ninfo-title {
					font-size: 38rpx;
					overflow: hidden;
					display: -webkit-box; //使用自适应布局
					-webkit-line-clamp: 2; //设置超出行数，要设置超出几行显示省略号就把这里改成几
					-webkit-box-orient: vertical;
				}

				.ninfo-summary {
					font-size: 25rpx;
					color: #6d6e70;
					display: flex;
					flex-direction: row;
					justify-content: flex-end;

					view {
						margin-right: 10rpx;
					}
				}
			}
		}

		.swipe-right-select {
			width: 150px;
			height: 100%;
			display: flex;
			flex-direction: row;
			box-sizing: border-box;
			padding: 13rpx 13rpx 0 0;
			color: #f3f4f7;

			.select-up {
				flex: auto;
				background-color: #2529d8;
				// margin-right: 13rpx;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: all 0.6;
			}

			.select-del {
				flex: auto;
				background-color: #ed1b2e;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: all 0.6;
			}

			.select-confirm {
				flex: auto;
				right: 0;
				left: auto;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
