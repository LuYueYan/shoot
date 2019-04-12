/**
 * 小游戏广告管理类
 * 
 * Banner广告
 * 视频广告
 */

class AdMaster {
	//Banner广告列表
	public static banner: Array<string> = [];
	//是否有Banner广告
	public static hasBanner: boolean = false;
	//视频广告列表
	public static video: Array<string> = [];
	//是否有视频广告
	public static hasVideo: boolean = false;

	//当前缓存的视频广告
	public static cacheVideoAd = null;
	public static haveMoreVideo = true;//有更多视频广告
	//当前缓存的Banner广告
	public static cacheBannerAd = null;

	//是否初始化成功 0未初始，1开始初始化，2初始化成功，3初始化失败
	public static INIT_STATUS: number = 0;

	//视频播放结束的回调
	public static closeSuccess: Function = null;
	public static initClose: boolean = false;//是否初始化视频广告关闭函数
	public static noVideo: boolean = false;//是否有视频广告
	//实例化
	public static shared: AdMaster;
	public static getInstance() {
		if (!AdMaster.shared)
			AdMaster.shared = new AdMaster()
		return AdMaster.shared
	}
	//构造函数
	public constructor() {
	}
	//初始化
	public static async init() {
		let that = this;
		AdMaster.INIT_STATUS = 1;

		await this.list();

	}
	//获取流量主列表
	public static async list() {
		await ServiceMaster.post(ServiceMaster.getConfig, {}, function (res) {
			if (parseInt(res.code) === 1 && res.data) {

				// res.data.banner_id=['adunit-9770641ec26321d7'];
				// res.data.video_id=['adunit-d0c0bc599cd9d2b6'];

				if (res.data.edition_1 == 2) {
					//审核通过，允许分享
					CallbackMaster.hasChecked = true;
				}
				if (res.data.banner_id !== undefined && res.data.banner_id != null && res.data.banner_id.length > 0) {
					AdMaster.banner = res.data.banner_id
					AdMaster.hasBanner = true
					//[随机]缓存Banner广告
					AdMaster.randomCacheBannerAd()
				}
				if (res.data.video_id !== undefined && res.data.video_id != null && res.data.video_id.length > 0) {
					AdMaster.video = res.data.video_id
					AdMaster.hasVideo = true
					//[随机]缓存视频广告
					AdMaster.randomCacheVideoAd()
				}
				AdMaster.INIT_STATUS = 2;
			}
		}, function (err) {
			AdMaster.INIT_STATUS = 3
		})
	}
	//[随机]缓存视频广告
	public static randomCacheVideoAd() {
		if (AdMaster.video) {
			AdMaster.cacheVideoAd = platform.createRewardedVideoAd(AdMaster.video[Math.floor(Math.random() * AdMaster.video.length)])

			AdMaster.cacheVideoAd.onError(err => {
				console.log(1, err)
				AdMaster.noVideo = true;
			})
		}

	}
	//[随机]缓存Banner广告
	public static randomCacheBannerAd() {
		let that = this;
		if (AdMaster.banner) {
			AdMaster.cacheBannerAd = platform.createBannerAd(
				AdMaster.banner[Math.floor(Math.random() * AdMaster.banner.length)],
				// '55555555',
				{}
			);
			AdMaster.cacheBannerAd.onError(err => {
				console.log(err)
				// setTimeout(function() {
				// 	Main.bottom.addChild(new bottom());
				// }, 5000);
			})
		}
	}

	//开启视频广告
	public static openVideoAd(callback: Function = null, errBack: Function = null) {
		if (AdMaster.cacheVideoAd) {
			AdMaster.cacheVideoAd.show()
				.then(() => {

				})
				.catch((err) => {
					AdMaster.cacheVideoAd.load();
					errBack(err);
				})

			AdMaster.cacheVideoAd.onClose(callback);


		}
	}


	//设置Banner广告 (添加广告接口请求判断)
	public static openBannerAd(style: any = {}) {
		// console.log(style)
		//显示Banner广告
		let adTimer = setInterval(function () {
			if (AdMaster.INIT_STATUS > 1) {
				AdMaster._openBannerAd(style)
				clearInterval(adTimer)
			}
		}, 50)
	}
	//设置Banner广告
	public static _openBannerAd(style: any) {
		if (AdMaster.cacheBannerAd) {
			// console.log(style)
			AdMaster.cacheBannerAd.style.width = DeviceMaster.getX(style.width) || DeviceMaster.screenWidth
			AdMaster.cacheBannerAd.style.left = DeviceMaster.getX(style.left) || 0
			AdMaster.cacheBannerAd.style.top = DeviceMaster.getY(style.top) || 0
			if (style.height)
				AdMaster.cacheBannerAd.style.height = DeviceMaster.getY(style.height)
			AdMaster.cacheBannerAd.show();
			AdMaster.cacheBannerAd.onResize((res) => {
				let height = res.height * DeviceMaster.screenWidth / res.width;
				AdMaster.cacheBannerAd.style.width = DeviceMaster.screenWidth;
				AdMaster.cacheBannerAd.style.top = DeviceMaster.screenHeight - height;
				if (DeviceMaster.stageHeight > 1600) {
					AdMaster.cacheBannerAd.style.top -= 40;
				}

			})
		}
	}
	//隐藏广告
	public static closeBannerAd() {
		if (AdMaster.cacheBannerAd) {
			AdMaster.cacheBannerAd.hide()
			// AdMaster.randomCacheBannerAd()
		}
	}

	//广告调用
	public static useVideo(success: Function = null, fail: Function = null) {
		//分享/观看视频获取道具

		if (AdMaster.cacheVideoAd) {

			if (!AdMaster.noVideo) {
				let v = true;
				AdMaster.openVideoAd((res) => {
					if (res && res.isEnded || res === undefined) {
						// 正常播放结束，可以下发游戏奖励
						if (v) {
							success && success();
						}
					}
					success = null;
					v = false;
				})
			} else {
				platform.showModal({
					title: '温馨提示',
					content: "今日视频次数已经用完，请明日再来哦~"
				})
			}
		} else {

			fail && fail();
		}
	}
}
window['AdMaster'] = AdMaster