/**
 * 小游戏广告管理类
 *
 * Banner广告
 * 视频广告
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var AdMaster = (function () {
    //构造函数
    function AdMaster() {
    }
    AdMaster.getInstance = function () {
        if (!AdMaster.shared)
            AdMaster.shared = new AdMaster();
        return AdMaster.shared;
    };
    //初始化
    AdMaster.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        AdMaster.INIT_STATUS = 1;
                        return [4 /*yield*/, this.list()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //获取流量主列表
    AdMaster.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ServiceMaster.post(ServiceMaster.getConfig, {}, function (res) {
                            if (parseInt(res.code) === 1 && res.data) {
                                // res.data.banner_id=['adunit-9770641ec26321d7'];
                                // res.data.video_id=['adunit-d0c0bc599cd9d2b6'];
                                if (res.data.edition_1 == 2) {
                                    //审核通过，允许分享
                                    CallbackMaster.hasChecked = true;
                                }
                                if (res.data.banner_id !== undefined && res.data.banner_id != null && res.data.banner_id.length > 0) {
                                    AdMaster.banner = res.data.banner_id;
                                    AdMaster.hasBanner = true;
                                    //[随机]缓存Banner广告
                                    AdMaster.randomCacheBannerAd();
                                }
                                if (res.data.video_id !== undefined && res.data.video_id != null && res.data.video_id.length > 0) {
                                    AdMaster.video = res.data.video_id;
                                    AdMaster.hasVideo = true;
                                    //[随机]缓存视频广告
                                    AdMaster.randomCacheVideoAd();
                                }
                                AdMaster.INIT_STATUS = 2;
                            }
                        }, function (err) {
                            AdMaster.INIT_STATUS = 3;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //[随机]缓存视频广告
    AdMaster.randomCacheVideoAd = function () {
        if (AdMaster.video) {
            AdMaster.cacheVideoAd = platform.createRewardedVideoAd(AdMaster.video[Math.floor(Math.random() * AdMaster.video.length)]);
            AdMaster.cacheVideoAd.onError(function (err) {
                console.log(1, err);
                AdMaster.noVideo = true;
            });
        }
    };
    //[随机]缓存Banner广告
    AdMaster.randomCacheBannerAd = function () {
        var that = this;
        if (AdMaster.banner) {
            AdMaster.cacheBannerAd = platform.createBannerAd(AdMaster.banner[Math.floor(Math.random() * AdMaster.banner.length)], 
            // '55555555',
            {});
            AdMaster.cacheBannerAd.onError(function (err) {
                console.log(err);
                // setTimeout(function() {
                // 	Main.bottom.addChild(new bottom());
                // }, 5000);
            });
        }
    };
    //开启视频广告
    AdMaster.openVideoAd = function (callback, errBack) {
        if (callback === void 0) { callback = null; }
        if (errBack === void 0) { errBack = null; }
        if (AdMaster.cacheVideoAd) {
            AdMaster.cacheVideoAd.show()
                .then(function () {
            })
                .catch(function (err) {
                AdMaster.cacheVideoAd.load();
                errBack(err);
            });
            AdMaster.cacheVideoAd.onClose(callback);
        }
    };
    //设置Banner广告 (添加广告接口请求判断)
    AdMaster.openBannerAd = function (style) {
        if (style === void 0) { style = {}; }
        // console.log(style)
        //显示Banner广告
        var adTimer = setInterval(function () {
            if (AdMaster.INIT_STATUS > 1) {
                AdMaster._openBannerAd(style);
                clearInterval(adTimer);
            }
        }, 50);
    };
    //设置Banner广告
    AdMaster._openBannerAd = function (style) {
        if (AdMaster.cacheBannerAd) {
            // console.log(style)
            AdMaster.cacheBannerAd.style.width = DeviceMaster.getX(style.width) || DeviceMaster.screenWidth;
            AdMaster.cacheBannerAd.style.left = DeviceMaster.getX(style.left) || 0;
            AdMaster.cacheBannerAd.style.top = DeviceMaster.getY(style.top) || 0;
            if (style.height)
                AdMaster.cacheBannerAd.style.height = DeviceMaster.getY(style.height);
            AdMaster.cacheBannerAd.show();
            AdMaster.cacheBannerAd.onResize(function (res) {
                var height = res.height * DeviceMaster.screenWidth / res.width;
                AdMaster.cacheBannerAd.style.width = DeviceMaster.screenWidth;
                AdMaster.cacheBannerAd.style.top = DeviceMaster.screenHeight - height;
                if (DeviceMaster.stageHeight > 1600) {
                    AdMaster.cacheBannerAd.style.top -= 40;
                }
            });
        }
    };
    //隐藏广告
    AdMaster.closeBannerAd = function () {
        if (AdMaster.cacheBannerAd) {
            AdMaster.cacheBannerAd.hide();
            // AdMaster.randomCacheBannerAd()
        }
    };
    //广告调用
    AdMaster.useVideo = function (success, fail) {
        //分享/观看视频获取道具
        if (success === void 0) { success = null; }
        if (fail === void 0) { fail = null; }
        if (AdMaster.cacheVideoAd) {
            if (!AdMaster.noVideo) {
                var v_1 = true;
                AdMaster.openVideoAd(function (res) {
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        if (v_1) {
                            success && success();
                        }
                    }
                    success = null;
                    v_1 = false;
                });
            }
            else {
                platform.showModal({
                    title: '温馨提示',
                    content: "今日视频次数已经用完，请明日再来哦~"
                });
            }
        }
        else {
            fail && fail();
        }
    };
    //Banner广告列表
    AdMaster.banner = [];
    //是否有Banner广告
    AdMaster.hasBanner = false;
    //视频广告列表
    AdMaster.video = [];
    //是否有视频广告
    AdMaster.hasVideo = false;
    //当前缓存的视频广告
    AdMaster.cacheVideoAd = null;
    AdMaster.haveMoreVideo = true; //有更多视频广告
    //当前缓存的Banner广告
    AdMaster.cacheBannerAd = null;
    //是否初始化成功 0未初始，1开始初始化，2初始化成功，3初始化失败
    AdMaster.INIT_STATUS = 0;
    //视频播放结束的回调
    AdMaster.closeSuccess = null;
    AdMaster.initClose = false; //是否初始化视频广告关闭函数
    AdMaster.noVideo = false; //是否有视频广告
    return AdMaster;
}());
__reflect(AdMaster.prototype, "AdMaster");
window['AdMaster'] = AdMaster;
