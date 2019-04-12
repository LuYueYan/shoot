class userDataMaster {
	public static myInfo: any = { uid: 0, openId: '', is_new_user: true, nickName: '', avatarUrl: '' };//用户信息
	public static gold = 0;//能量果
	public static cats = [
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
	public static travels = [
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
	];//state-当前状态 0--未获得 1--已获得 2--新获得尚未查看
	public static travelList = [];//我拥有的印记
	public static dayEnergy = { day: '', num: 0 };//上次领取每日能量的日期
	public static myCollection: eui.ArrayCollection;
	public static shareUid = 0;//分享人id
	public static sourceEnergy = { uid: 0, day: '' };//能量分享的原始id,日期
	public static bestScore = 0;//历史最高分
	public static userInfoBtn;
	public static haveNickName = false;//是否有用户昵称头像
	public static runCat = 0;//当前旅行的是哪个球
	public static recommand: any;//推荐位列表
	public static requestTimes = 0;//请求游戏数据的次数
	public static dayTry = '';//上次试玩的日期
	public static dayVideoEnergy = { day: '', num: 0 };//每日通过看视频/分享获得能量
	public static loginCallback = null;//弹窗登录成功的回调
	public static degree =0;//当前难度阶段默认0
	public constructor() {
	}
	public static shared: userDataMaster;
	public static getInstance() {
		if (!userDataMaster.shared) {
			userDataMaster.shared = new userDataMaster();
		}
		return userDataMaster.shared;
	}
	public static init() {
		let that = this;
		var sourceArr: any[] = [
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
	}
	public static getGameData() {
		let that = this;
		let uid = userDataMaster.myInfo.uid;
		userDataMaster.requestTimes++;
		if (uid != 0) {
			ServiceMaster.post(ServiceMaster.getGameData, { uid }, (res) => {
				if (res.code == 1 && res.data) {
					let data = res.data;
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

						let info = JSON.parse(data.info);
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
			})
		} else {
			if (userDataMaster.requestTimes < 5) {
				setTimeout(function () {
					userDataMaster.getGameData();
				}, 1000);
			}
		}
	}
	public static getRecommand() {
		//获取推荐位
		ServiceMaster.post(ServiceMaster.getGameList, {}, (res) => {
			if (res.code == 1 && res.data) {
				userDataMaster.recommand = res.data;
			}
		})
	}
	public static get myGold() {
		//获取能量果总数
		return userDataMaster.gold;
	}
	public static set myGold(gold) {
		//更新能量果总数
		userDataMaster.gold = gold;
		userDataMaster.myCollection.replaceItemAt(gold, 0);
	}
	public static get MyCats() {
		// 获取宠物列表数据
		return userDataMaster.cats;
	}
	public static set myRunCat(index) {
		//更新当前出行球球
		userDataMaster.runCat = index;
		userDataMaster.myCollection.replaceItemAt(index, 3);
	}
	public static setCat(index, cat) {
		//更新单个宠物数据 index--索引 cat--数据
		userDataMaster.cats[index] = cat;
		userDataMaster.myCollection.replaceItemAt(userDataMaster.cats, 1);
	}
	public static set MyCats(cats) {
		// 更新宠物列表数据
		userDataMaster.cats = cats;
		userDataMaster.myCollection.replaceItemAt(cats, 1);
	}
	public static get myTravels() {
		//旅行印记获取
		return userDataMaster.travels;
	}
	public static set myTravels(travels) {
		//修改旅行印记
		userDataMaster.travels = travels;
		userDataMaster.myCollection.replaceItemAt(travels, 2);
	}
	public static setTravel(index, travel) {
		//更新某项旅行印记数据
		userDataMaster.travels[index] = travel;
		userDataMaster.myCollection.replaceItemAt(userDataMaster.travels, 2)
	}
	public static set getMyInfo(data) {
		userDataMaster.myInfo = data;
	}
	public static get getMyInfo() {
		return userDataMaster.myInfo;
	}
	public static getUserInfo(uid) {
		//获取用户道具信息

	}
	public static get todayEnergy() {
		//获取今日可领取能量状态
		if (userDataMaster.dayEnergy.day == userDataMaster.getToday()) {
			return userDataMaster.dayEnergy.num;
		}
		userDataMaster.dayEnergy = { day: userDataMaster.getToday(), num: 0 }
		return 0;
	}
	public static get todayTry() {
		//获取今日试玩状态
		if (userDataMaster.dayTry == userDataMaster.getToday()) {
			//今日已试玩
			return false;
		}
		return true;
	}
	public static updateTodayTry() {
		//更改今日试玩状态
		userDataMaster.dayTry = userDataMaster.getToday();
	}
	public static get todayVideoEnergy() {
		//    获取今天看视频或者分享获得能量状态
		if (userDataMaster.dayVideoEnergy.day == userDataMaster.getToday()) {
			return userDataMaster.dayVideoEnergy.num;
		}
		userDataMaster.dayVideoEnergy = { day: userDataMaster.getToday(), num: 0 };
		return 0;
	}
	public static async createLoginBtn(left, top, width, height) {
		let that = this;
		let scale = DeviceMaster.screenWidth / 750;
		left *= scale, top *= scale, width *= scale, height *= scale;
		userDataMaster.userInfoBtn = await platform.createUserInfoButton({
			type: 'image',
			// type: 'text',
			// text: '获取用户信息',
			image: '../../resource/assets/imgData/img_yxbj.png',
			style: {
				left,
				top,
				width,
				height,
				lineHeight: 40,
				backgroundColor: '#ff0000',
				color: '#ffffff',
				textAlign: 'center',
				fontSize: 16,
				borderRadius: 4
			}
		})

		userDataMaster.userInfoBtn.onTap((res) => {
			userDataMaster.updateUser(res)
		})
	}
	public static async updateUser(res: any = null) {
		let userInfo = res.userInfo;
		userDataMaster.myInfo.nickName = userInfo.nickName;
		userDataMaster.myInfo.avatarUrl = userInfo.avatarUrl;
		let params: any = {
			uid: userDataMaster.getMyInfo.uid,
			nickName: userInfo.nickName,
			gender: userInfo.gender,
			avatarUrl: userInfo.avatarUrl
		};

		ServiceMaster.post(
			ServiceMaster.updateUser,
			params,
			function (suc) {
				if (parseInt(suc.code) === 1 && suc.data) {
					//修改用户信息成功
					userDataMaster.userInfoBtn && userDataMaster.userInfoBtn.destroy();
					userDataMaster.loginCallback && userDataMaster.loginCallback();
					userDataMaster.loginCallback = null;
				}
			}
		);

	}
	public static async login(res: any = null) {
		let login = await platform.login();
		let params: any = {
			code: login.code
		};
		// if (res != null) {
		// 	params.encryptedData = res.encryptedData;
		// 	params.iv = res.iv
		// }
		if (userDataMaster.shareUid > 0) {
			params.pid = userDataMaster.shareUid;
		}
		ServiceMaster.post(
			ServiceMaster.logins,
			params,
			function (suc) {
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
					userDataMaster.getUserInfo(suc.data.uid)
				}
			}
		);
	}
	public static getToday() {
		//获取格式化的当前日期
		let date = new Date();
		let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
		let day = date.getDate() > 9 ? (date.getDate()) + '' : '0' + date.getDate();
		return date.getFullYear() + '-' + month + '-' + day;
	}

}
window['userDataMaster'] = userDataMaster