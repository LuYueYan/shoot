var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CallbackMaster = (function () {
    function CallbackMaster() {
    }
    CallbackMaster.init = function () {
        //右上角分享
        var obj = {
            query: 'type=newUser&uid=' + userDataMaster.getMyInfo.uid
        };
        platform.onShareAppMessage(obj);
        platform.onShow(function (option) {
            //是否分享链接打开的
            if (option && option.query && option.query.uid) {
                userDataMaster.shareUid = option.query.uid;
                if (option.query.type && option.query.type == 'energy') {
                    //能量分享
                    userDataMaster.sourceEnergy.uid = option.query.suid || option.query.uid;
                    userDataMaster.sourceEnergy.day = option.query.day;
                    // if (Main.scene && Main.scene.getChildAt(0)) {
                    // 	Main.scene.getChildAt(0).addChild(new getEnergyModal(userDataMaster.sourceEnergy.uid, userDataMaster.sourceEnergy.day));
                    // }
                }
            }
            if (new Date().getTime() - CallbackMaster.shareTime > 3000) {
                //超过三秒，算分享成功
                CallbackMaster.shareSuc && CallbackMaster.shareSuc();
                CallbackMaster.saveShareSuc = null;
                CallbackMaster.shareFailText = '分享到不同的群才能获得奖励哦~';
            }
            else {
                CallbackMaster.saveShareSuc = CallbackMaster.shareSuc;
                //分享失败弹窗
                var obj_1 = {
                    title: '温馨提示',
                    content: CallbackMaster.shareFailText,
                    confirmText: '再试一次',
                    success: function (res) {
                        if (res.confirm) {
                            CallbackMaster.openShare(CallbackMaster.saveShareSuc);
                        }
                        else {
                            CallbackMaster.shareFailText = '分享到不同的群才能获得奖励哦~';
                        }
                    }
                };
                platform.showModal(obj_1);
            }
            CallbackMaster.shareSuc = null;
        });
        platform.onHide(function () {
            soundMaster.soundChannel && soundMaster.soundChannel.stop();
            //存储数据
            CallbackMaster.onHideFun && CallbackMaster.onHideFun();
            //存储游戏数据
            var spirit_data = JSON.stringify(userDataMaster.MyCats);
            var mark_data = JSON.stringify(userDataMaster.myTravels);
            var info = {
                runCat: userDataMaster.runCat,
                dayEnergy: userDataMaster.dayEnergy,
                dayTry: userDataMaster.dayTry,
                travelList: userDataMaster.travelList,
                dayVideoEnergy: userDataMaster.dayVideoEnergy,
                degree: userDataMaster.degree
            };
            var params = {
                uid: userDataMaster.getMyInfo.uid,
                energy: userDataMaster.myGold,
                spirit_data: spirit_data,
                mark_data: mark_data,
                info: JSON.stringify(info)
            };
            ServiceMaster.post(ServiceMaster.setGameData, params, function (res) {
                if (res.code == 1 && res.data) {
                }
            });
        });
    };
    CallbackMaster.openShare = function (Callback, judge, query, shareType) {
        if (Callback === void 0) { Callback = null; }
        if (judge === void 0) { judge = true; }
        if (query === void 0) { query = ''; }
        if (shareType === void 0) { shareType = 0; }
        //参数1---回调函数 参数2---是否判断分享成功，默认判断 参数3----附加的参数  4--分享类型
        // 好友助力
        if (CallbackMaster.hasChecked) {
            //如果审核通过了
            var s = CallbackMaster.shareInfo[0];
            if (shareType == 0) {
                //默认随机分享
                s = CallbackMaster.shareInfo[Math.floor(Math.random() * 2)];
            }
            else {
                s.imageUrl = CallbackMaster.shareInfo[2].imageUrl;
                s.title = (userDataMaster.myInfo.nickName || '') + CallbackMaster.shareInfo[2].title;
            }
            var obj = {
                title: s.title,
                imageUrl: s.imageUrl,
                query: 'uid=' + userDataMaster.getMyInfo.uid + query
            };
            platform.shareAppMessage(obj);
            CallbackMaster.shareTime = judge ? new Date().getTime() : 0;
            CallbackMaster.shareSuc = Callback;
        }
    };
    CallbackMaster.openHide = function (Callback) {
        if (Callback === void 0) { Callback = null; }
        CallbackMaster.onHideFun = Callback;
    };
    CallbackMaster.recommandClick = function (type, item) {
        if (type === void 0) { type = 1; }
        //推荐位点击统计
        var uid = userDataMaster.getMyInfo.uid;
        var params = {
            id: item.id,
            uid: uid,
            appid: item.appid,
            type: type,
            module_id: item.module_id,
            module_ext_id: item.module_ext_id
        };
        ServiceMaster.post(ServiceMaster.gameClick, params, function (suc) {
            if (suc.code == 1 && suc.data) {
            }
        });
    };
    CallbackMaster.glowFilter = function (color, alpha, blurX, blurY) {
        if (color === void 0) { color = 0x6d3ec5; }
        if (alpha === void 0) { alpha = 0.8; }
        if (blurX === void 0) { blurX = 35; }
        if (blurY === void 0) { blurY = 35; }
        //发光滤镜
        // var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        // var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        // var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        // var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        return glowFilter;
    };
    CallbackMaster.shareSuc = null; //分享成功回调
    CallbackMaster.shareTime = 0; //分享的时间
    CallbackMaster.onHideFun = null; //页面进入后台回调
    //审核是否通过
    CallbackMaster.hasChecked = false;
    CallbackMaster.saveShareSuc = null; //保存上次分享的回调
    CallbackMaster.shareFailText = '分享到不同的群才能获得奖励哦~'; //分享失败的弹窗文案
    CallbackMaster.shareInfo = [
        {
            imageUrl: 'https://lixi.h5.app81.com/minigame/game_lixi/share_img/share_1.jpg',
            title: '球球精灵要饿坏了，快点来喂养吧~'
        },
        {
            imageUrl: 'https://lixi.h5.app81.com/minigame/game_lixi/share_img/share_2.jpg',
            title: '快来测试一下你的手速是几阶吧？听说单身10年的人手速才达到5阶'
        },
        {
            imageUrl: 'https://lixi.h5.app81.com/minigame/game_lixi/share_img/share_3.jpg?t=1',
            title: '给你采集了一大袋能量果，快来领一份吧~'
        },
    ];
    return CallbackMaster;
}());
__reflect(CallbackMaster.prototype, "CallbackMaster");
