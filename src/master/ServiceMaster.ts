class ServiceMaster {
	//域名
	public static DOMAIN: string = 'https://newbox.0e3.cn/gball';
	//  public static DOMAIN: string = 'http://114.55.25.63:3000/mock/130';
	
	//请求方式
	public static METHOD_POST: string = 'POST';
	public static METHOD_GET: string = 'GET';
	//接口
	public static logins: string = '/user/logins';//登陆
	public static updateUser: string = '/user/updateUser';//更新用户昵称头像
	public static getGameList: string = '/other/getGameList';//获取更多游戏列表
	public static getConfig: string = '/other/getConfig';//获广告id和审核状态
    public static getScore: string = '/user/getScore';//提交分数
	public static rank_world: string = '/user/rank_world';//世界排行
	public static gameClick: string = '/other/gameClick';//推荐位统计
	public static getAssistanceList:string='/other/getAssistanceList';//获取助力列表
	public static receiveAssistance:string='/other/receiveAssistance';//领取助力奖励
	public static getEnergy:string='/other/getEnergy';//点击分享链接进入游戏是否可以领取能量果
	public static getEnergyDo:string='/other/getEnergyDo';//获取当前能量果可领数量&&领取能能量果
	public static getGameData:string='/user/getGameData';//获得游戏数据
	public static setGameData:string='/user/setGameData';//设置游戏数据

	//单例
	public static instance: ServiceMaster;
	public static getInstance() {
		if (!ServiceMaster.instance)
			ServiceMaster.instance = new ServiceMaster()
		return ServiceMaster.instance
	}
	//构造函数
	public constructor() {
	}
	/**
	 * 对obj的 属性名进行sort排序 
	 * 并返回属性名sort排序后的对象
	 * @param object param 需要进行排序的对象
	 * @return object newparam 排序完成的新对象
	 */
	public static objSort(param) {
		//(1)Object内置类的keys()方法获取要排序对象的属性名(Array)
		//(2)利用Array原型上的sort()方法对获取的属性名进行排序(Array)
		var newkeyArray = Object.keys(param).sort();
		var newParam = {};//创建一个新的对象，用于存放排好序的键值对(Object)
		//遍历newkeyArray数组   
		for (var i = 0; i < newkeyArray.length; i++) {
			newParam[newkeyArray[i]] = param[newkeyArray[i]];//向新创建的对象中按照排好的顺序依次增加键值对
		}
		return newParam;//返回排好序的新对象
	}

	/**
	 * 生成token值
	 * @param object param 进行远程请求的所有参数[没有token]
	 * @return string token  
	 */
	public static createToken(param) {
		//验证token属性是否存在
		if (typeof (param.token) != "undefined") {
			//如果存在token属性则进行删除
			delete param.token;
		}
		//对param进行sort排序
		var newParam = ServiceMaster.objSort(param);
		var tokenString = '';
		for (var i in newParam) {
			tokenString += tokenString ? '&' : '';
			tokenString += i + '=' + newParam[i];
		}
		tokenString += '!@#$%^&*';//添加混淆字符串

		return new md5().hex_md5(tokenString)
	}
	//发起请求
	public static request(api: string, method: string = 'POST', param: any = {}, complete: Function = null, error: Function = null, progress: Function = null) {
		let request = new egret.HttpRequest()
		request.responseType = egret.HttpResponseType.TEXT
		request.open(api, egret.HttpMethod[method])
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
		param.token = this.createToken(param)
		request.send(this.obj2str(param, true))
		request.addEventListener(egret.Event.COMPLETE, function () {
			if (complete)
				complete(JSON.parse(request.response))
		}, this)
		if (error)
			request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this)
		if (progress)
			request.addEventListener(egret.ProgressEvent.PROGRESS, progress, this)
	}
	//发起POST请求
	public static post(api: string, param: any = {}, complete: Function = null, error: Function = null, progress: Function = null) {
		ServiceMaster.request(
			ServiceMaster.DOMAIN + api,
			ServiceMaster.METHOD_POST,
			param,
			complete,
			error,
			progress
		)
	}
	//发起GET请求
	public static get(api: string, param: any = {}, complete: Function = null, error: Function = null, progress: Function = null) {
		ServiceMaster.request(
			ServiceMaster.DOMAIN + api,
			ServiceMaster.METHOD_GET,
			param,
			complete,
			error,
			progress
		)
	}
	/**
	 * 将请求参数转化字符串
	 */
	public static obj2str(param, change = false) {
		let str: string = ''
		for (let k in param) {
			if (change && (k == 'encryptedData' || k == 'iv')) {
				str += '&' + k + '=' + encodeURI(param[k]).replace(/\+/g, '%2B')
			} else {
				str += '&' + k + '=' + param[k]
			}


		}
		return str.substring(1)
	}
}
window['ServiceMaster'] = ServiceMaster