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
var userDataMaster = (function () {
    function userDataMaster() {
    }
    userDataMaster.getInstance = function () {
        if (!userDataMaster.shared) {
            userDataMaster.shared = new userDataMaster();
        }
        return userDataMaster.shared;
    };
    userDataMaster.init = function () {
        var that = this;
        var sourceArr = [
            userDataMaster.gold,
            userDataMaster.cats,
            userDataMaster.travels,
            userDataMaster.runCat
        ];
        //用 ArrayCollection 包装
        userDataMaster.myCollection = new eui.ArrayCollection(sourceArr);
        userDataMaster.login();
        userDataMaster.getRecommand();
        userDataMaster.getGameData();
    };
    userDataMaster.getGameData = function () {
        var that = this;
        var uid = userDataMaster.myInfo.uid;
        userDataMaster.requestTimes++;
        if (uid != 0) {
            ServiceMaster.post(ServiceMaster.getGameData, { uid: uid }, function (res) {
                if (res.code == 1 && res.data) {
                    var data = res.data;
                    if (data.energy > 0) {
                        userDataMaster.myGold = data.energy;
                    }
                    if (data.high_score) {
                        userDataMaster.bestScore = data.high_score;
                    }
                    if (data.spirit_data.length > 0) {
                        userDataMaster.MyCats = JSON.parse(data.spirit_data);
                    }
                    if (data.mark_data.length > 0) {
                        userDataMaster.myTravels = JSON.parse(data.mark_data);
                    }
                    if (data.info.length > 0) {
                        var info = JSON.parse(data.info);
                        if (info.runCat >= 0) {
                            userDataMaster.myRunCat = info.runCat;
                        }
                        if (info.dayEnergy) {
                            userDataMaster.dayEnergy = info.dayEnergy;
                        }
                        if (info.dayTry) {
                            userDataMaster.dayTry = info.dayTry;
                        }
                        if (info.travelList) {
                            userDataMaster.travelList = info.travelList;
                        }
                        if (info.dayVideoEnergy) {
                            userDataMaster.dayVideoEnergy = info.dayVideoEnergy;
                        }
                        if (info.degree) {
                            userDataMaster.degree = info.degree;
                        }
                    }
                }
            });
        }
        else {
            if (userDataMaster.requestTimes < 5) {
                setTimeout(function () {
                    userDataMaster.getGameData();
                }, 1000);
            }
        }
    };
    userDataMaster.getRecommand = function () {
        //获取推荐位
        ServiceMaster.post(ServiceMaster.getGameList, {}, function (res) {
            if (res.code == 1 && res.data) {
                userDataMaster.recommand = res.data;
            }
        });
    };
    Object.defineProperty(userDataMaster, "myGold", {
        get: function () {
            //获取能量果总数
            return userDataMaster.gold;
        },
        set: function (gold) {
            //更新能量果总数
            userDataMaster.gold = gold;
            userDataMaster.myCollection.replaceItemAt(gold, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(userDataMaster, "MyCats", {
        get: function () {
            // 获取宠物列表数据
            return userDataMaster.cats;
        },
        set: function (cats) {
            // 更新宠物列表数据
            userDataMaster.cats = cats;
            userDataMaster.myCollection.replaceItemAt(cats, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(userDataMaster, "myRunCat", {
        set: function (index) {
            //更新当前出行球球
            userDataMaster.runCat = index;
            userDataMaster.myCollection.replaceItemAt(index, 3);
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.setCat = function (index, cat) {
        //更新单个宠物数据 index--索引 cat--数据
        userDataMaster.cats[index] = cat;
        userDataMaster.myCollection.replaceItemAt(userDataMaster.cats, 1);
    };
    Object.defineProperty(userDataMaster, "myTravels", {
        get: function () {
            //旅行印记获取
            return userDataMaster.travels;
        },
        set: function (travels) {
            //修改旅行印记
            userDataMaster.travels = travels;
            userDataMaster.myCollection.replaceItemAt(travels, 2);
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.setTravel = function (index, travel) {
        //更新某项旅行印记数据
        userDataMaster.travels[index] = travel;
        userDataMaster.myCollection.replaceItemAt(userDataMaster.travels, 2);
    };
    Object.defineProperty(userDataMaster, "getMyInfo", {
        get: function () {
            return userDataMaster.myInfo;
        },
        set: function (data) {
            userDataMaster.myInfo = data;
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.getUserInfo = function (uid) {
        //获取用户道具信息
    };
    Object.defineProperty(userDataMaster, "todayEnergy", {
        get: function () {
            //获取今日可领取能量状态
            if (userDataMaster.dayEnergy.day == userDataMaster.getToday()) {
                return userDataMaster.dayEnergy.num;
            }
            userDataMaster.dayEnergy = { day: userDataMaster.getToday(), num: 0 };
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(userDataMaster, "todayTry", {
        get: function () {
            //获取今日试玩状态
            if (userDataMaster.dayTry == userDataMaster.getToday()) {
                //今日已试玩
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.updateTodayTry = function () {
        //更改今日试玩状态
        userDataMaster.dayTry = userDataMaster.getToday();
    };
    Object.defineProperty(userDataMaster, "todayVideoEnergy", {
        get: function () {
            //    获取今天看视频或者分享获得能量状态
            if (userDataMaster.dayVideoEnergy.day == userDataMaster.getToday()) {
                return userDataMaster.dayVideoEnergy.num;
            }
            userDataMaster.dayVideoEnergy = { day: userDataMaster.getToday(), num: 0 };
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.createLoginBtn = function (left, top, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var that, scale, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        that = this;
                        scale = DeviceMaster.screenWidth / 750;
                        left *= scale, top *= scale, width *= scale, height *= scale;
                        _a = userDataMaster;
                        return [4 /*yield*/, platform.createUserInfoButton({
                                type: 'image',
                                // type: 'text',
                                // text: '获取用户信息',
                                image: '../../resource/assets/imgData/img_yxbj.png',
                                style: {
                                    left: left,
                                    top: top,
                                    width: width,
                                    height: height,
                                    lineHeight: 40,
                                    backgroundColor: '#ff0000',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    fontSize: 16,
                                    borderRadius: 4
                                }
                            })];
                    case 1:
                        _a.userInfoBtn = _b.sent();
                        userDataMaster.userInfoBtn.onTap(function (res) {
                            userDataMaster.updateUser(res);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    userDataMaster.updateUser = function (res) {
        if (res === void 0) { res = null; }
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, params;
            return __generator(this, function (_a) {
                userInfo = res.userInfo;
                userDataMaster.myInfo.nickName = userInfo.nickName;
                userDataMaster.myInfo.avatarUrl = userInfo.avatarUrl;
                params = {
                    uid: userDataMaster.getMyInfo.uid,
                    nickName: userInfo.nickName,
                    gender: userInfo.gender,
                    avatarUrl: userInfo.avatarUrl
                };
                ServiceMaster.post(ServiceMaster.updateUser, params, function (suc) {
                    if (parseInt(suc.code) === 1 && suc.data) {
                        //修改用户信息成功
                        userDataMaster.userInfoBtn && userDataMaster.userInfoBtn.destroy();
                        userDataMaster.loginCallback && userDataMaster.loginCallback();
                        userDataMaster.loginCallback = null;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    userDataMaster.login = function (res) {
        if (res === void 0) { res = null; }
        return __awaiter(this, void 0, void 0, function () {
            var login, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.login()];
                    case 1:
                        login = _a.sent();
                        params = {
                            code: login.code
                        };
                        // if (res != null) {
                        // 	params.encryptedData = res.encryptedData;
                        // 	params.iv = res.iv
                        // }
                        if (userDataMaster.shareUid > 0) {
                            params.pid = userDataMaster.shareUid;
                        }
                        ServiceMaster.post(ServiceMaster.logins, params, function (suc) {
                            if (parseInt(suc.code) === 1 && suc.data) {
                                //登录成功
                                userDataMaster.getMyInfo = suc.data;
                                //测试测试………………
                                // userDataMaster.myInfo.is_new_user = true;
                                // userDataMaster.userInfoBtn && userDataMaster.userInfoBtn.destroy();
                                //初始化用户openid
                                platform.openDataContext.postMessage({
                                    type: "openid",
                                    openid: suc.data.openId
                                });
                                userDataMaster.getUserInfo(suc.data.uid);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    userDataMaster.getToday = function () {
        //获取格式化的当前日期
        var date = new Date();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
        var day = date.getDate() > 9 ? (date.getDate()) + '' : '0' + date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    };
    userDataMaster.myInfo = { uid: 0, openId: '', is_new_user: true, nickName: '', avatarUrl: '' }; //用户信息
    userDataMaster.gold = 0; //能量果
    userDataMaster.cats = [
        { id: 1, name: '白白球', state: true, process: 1000, target: 1000, belong: [0, 1, 2], des: '第一只拥有的精灵，洁白无一物', music: '《水晶》' },
        { id: 2, name: '摇滚球', state: false, process: 0, target: 20000, belong: [3, 5, 6], des: '浑身散发魔性，带来的音乐也是酷酷风', music: '《幽默》' },
        { id: 3, name: '水灵球', state: false, process: 0, target: 15000, belong: [7, 8, 10], des: '蜻蜓点水般的灵动，似风入海洋', music: '《沙滩》' },
        { id: 4, name: '跑酷球', state: false, process: 0, target: 10000, belong: [11, 12, 13], des: '天生顽皮，似乎喂养了很多能量果', music: '《超越》' },
        { id: 5, name: '火火球', state: false, process: 0, target: 0, belong: [15, 16, 17], des: '别看它小小的身体，却有大大的能量', music: '《希望》' },
        { id: 6, name: '黑洞球', state: false, process: 0, target: 8000, belong: [18, 20, 21], des: '想法经常出乎意料，常常让你冒冷', music: '《迷宫》' },
        { id: 7, name: '爆破球', state: false, process: 0, target: 6000, belong: [22, 23, 25], des: '拥有一秒燃爆森林的力量', music: '《时空》' },
        { id: 8, name: '旋风球', state: false, process: 0, target: 5000, belong: [26, 27, 28], des: '可以带着风飞舞，跑遍世界角落', music: '《海洋》' },
        { id: 9, name: '懒懒球', state: false, process: 0, target: 3000, belong: [30, 31, 32], des: '找不出第二只比懒懒球还懒的精灵了', music: '《星辰》' }
    ];
    userDataMaster.travels = [
        { index: 0, id: 0, name: '月之桥', state: 0 },
        { index: 1, id: 1, name: '白玉盘', state: 0 },
        { index: 2, id: 2, name: '瑶台镜', state: 0 },
        { index: 3, id: 3, name: '青云端', state: 0 },
        { index: 4, id: -1, name: '', state: 0 },
        { index: 5, id: 4, name: '仙人足', state: 0 },
        { index: 6, id: 5, name: '树团团', state: 0 },
        { index: 7, id: 6, name: '白兔岛', state: 0 },
        { index: 8, id: 7, name: '蚀圆影', state: 0 },
        { index: 9, id: -1, name: '', state: 0 },
        { index: 10, id: 8, name: '明夜残', state: 0 },
        { index: 11, id: 9, name: '落九乌', state: 0 },
        { index: 12, id: 10, name: '升日月', state: 0 },
        { index: 13, id: 11, name: '花落肩', state: 0 },
        { index: 14, id: -1, name: '', state: 0 },
        { index: 15, id: 12, name: '三生烟', state: 0 },
        { index: 16, id: 13, name: '清晨迷', state: 0 },
        { index: 17, id: 14, name: '尘滴落', state: 0 },
        { index: 18, id: 15, name: '四木湖', state: 0 },
        { index: 19, id: -1, name: '', state: 0 },
        { index: 20, id: 16, name: '蔷薇轮', state: 0 },
        { index: 21, id: 17, name: '嫩绿生', state: 0 },
        { index: 22, id: 18, name: '清脆盘', state: 0 },
        { index: 23, id: 19, name: '四季空', state: 0 },
        { index: 24, id: -1, name: '', state: 0 },
        { index: 25, id: 20, name: '木偶屋', state: 0 },
        { index: 26, id: 21, name: '镜之藤', state: 0 },
        { index: 27, id: 22, name: '缠上月', state: 0 },
        { index: 28, id: 23, name: '莲渔舟', state: 0 },
        { index: 29, id: -1, name: '', state: 0 },
        { index: 30, id: 24, name: '光懒懒', state: 0 },
        { index: 31, id: 25, name: '万颗紫', state: 0 },
        { index: 32, id: 26, name: '七彩云', state: 0 },
        { index: 33, id: -1, name: '', state: 0 }
    ]; //state-当前状态 0--未获得 1--已获得 2--新获得尚未查看
    userDataMaster.travelList = []; //我拥有的印记
    userDataMaster.dayEnergy = { day: '', num: 0 }; //上次领取每日能量的日期
    userDataMaster.shareUid = 0; //分享人id
    userDataMaster.sourceEnergy = { uid: 0, day: '' }; //能量分享的原始id,日期
    userDataMaster.bestScore = 0; //历史最高分
    userDataMaster.haveNickName = false; //是否有用户昵称头像
    userDataMaster.runCat = 0; //当前旅行的是哪个球
    userDataMaster.requestTimes = 0; //请求游戏数据的次数
    userDataMaster.dayTry = ''; //上次试玩的日期
    userDataMaster.dayVideoEnergy = { day: '', num: 0 }; //每日通过看视频/分享获得能量
    userDataMaster.loginCallback = null; //弹窗登录成功的回调
    userDataMaster.degree = 0; //当前难度阶段默认0
    return userDataMaster;
}());
__reflect(userDataMaster.prototype, "userDataMaster");
window['userDataMaster'] = userDataMaster;
