/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    //登录
    login(): Promise<any>
    //获取用户信息
    getUserInfo(): Promise<any>;
    //微信小游戏转发功能
    onShareAppMessage(object: Object): Promise<any>;
    //微信小游戏分享功能
    shareAppMessage(object: Object): Promise<any>;
    //创建用户信息按钮
    createUserInfoButton(object: Object): Promise<any>;
    //使手机发生较短时间的振动（15 ms）
    vibrateShort(object: Object): Promise<any>;
    //使手机发生较长时间的振动（400 ms)
    vibrateLong(object: Object): Promise<any>;
    //打开同一公众号下关联的另一个小程序（注：必须是同一公众号下，而非同个 open 账号下）。要求在用户发生过至少一次 touch 事件后才能调用
    navigateToMiniProgram(object: Object): Promise<any>;
    //对用户托管数据进行写数据操作，允许同时写多组 KV 数据
    setUserCloudStorage(object: Object): Promise<any>;
    //获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
    getUserCloudStorage(object: Object): Promise<any>;
    //创建激励视频广告
    createRewardedVideoAd(adUnitId: string): Promise<any>;
    //创建Banner广告
    createBannerAd(adUnitId: string, style: Object): Promise<any>;
    //获取设置信息
    getSystemInfoSync(): Promise<any>;
    //设置本地存储
    setStorage(object: Object): Promise<any>;
    //获取本地存储
    getStorage(object: Object): Promise<any>;
    //清除指定缓存
    removeStorage(object: Object): Promise<any>;
    //监听小游戏回到前台的事件
    onShow(callback: Function): Promise<any>;
    offShow(callback: Function): Promise<any>;
    //监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件
    onHide(callback: Function): Promise<any>;
    offHide(callback: Function): Promise<any>;
    previewImage(url: string, callback: Function): Promise<any>;//预览图片
    exitMiniProgram(object: Object): Promise<any>;
    showModal(object: Object): Promise<any>//模态弹框
    //设置系统剪贴板的内容
    setClipboardData(object: Object): Promise<any>
    getLaunchOptionsSync()
    //打开共享域
    openDataContext;
}

class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {
        return { code: "" }
    }
    async onShareAppMessage(object: Object) { }
    async shareAppMessage(object: Object) { }
    async createUserInfoButton(object: Object) { }
    async vibrateShort(object: Object) { }
    async vibrateLong(object: Object) { }
    async navigateToMiniProgram(object: Object) { }
    async setUserCloudStorage(object: Object) { }
    async getUserCloudStorage(object: Object) { }
    async createRewardedVideoAd(adUnitId: string) { }
    async createBannerAd(adUnitId: string, style: Object) { }
    async getSystemInfoSync() { return { screenWidth: 750, screenHeight: 1334 } }
    async setStorage(object: Object) { };
    async getStorage(object: Object) { };
    async removeStorage(object: Object) { };
    async onShow(callback: Function) {
        let res = {
            scene: '',
            query: {},
            shareTicket: '',
            referrerInfo: {
                appId: '',
                extraData: {
                    type: 'openMiniApp',
                    openMiniAppId: '',
                }
            }
        }
        if (callback) callback(res)
    }
    async offShow(callback: Function) { }
    async onHide(callback: Function) { }
    async offHide(callback: Function) { }
    async previewImage(url: string, callback: Function) { }
    async exitMiniProgram(object: Object) { }
    async showModal(object: Object) { }
    async setClipboardData(object: Object) { }
    async getLaunchOptionsSync(){}
    openDataContext = {
        createDisplayObject: function (type, width, height) { },
        postMessage: function (data) { }
    }
}

if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}

