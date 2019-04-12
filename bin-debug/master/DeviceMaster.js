var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DeviceMaster = (function () {
    function DeviceMaster() {
    }
    //初始化
    DeviceMaster.init = function (stageWidth, stageHeight) {
        if (stageWidth === void 0) { stageWidth = 750; }
        if (stageHeight === void 0) { stageHeight = 1334; }
        DeviceMaster.stageWidth = stageWidth;
        DeviceMaster.stageHeight = stageHeight;
        //获取系统信息
        DeviceMaster.SYSTEM_INFO = platform.getSystemInfoSync();
        DeviceMaster.model = DeviceMaster.SYSTEM_INFO.model;
        DeviceMaster.system = DeviceMaster.SYSTEM_INFO.system;
        DeviceMaster.screenWidth = DeviceMaster.SYSTEM_INFO.screenWidth;
        DeviceMaster.screenHeight = DeviceMaster.SYSTEM_INFO.screenHeight;
        DeviceMaster.scaleWidth = DeviceMaster.screenWidth / DeviceMaster.stageWidth;
        DeviceMaster.scaleHeight = DeviceMaster.screenHeight / DeviceMaster.stageHeight;
        DeviceMaster.windowWidth = DeviceMaster.SYSTEM_INFO.windowWidth * 2;
        DeviceMaster.windowHeight = DeviceMaster.SYSTEM_INFO.windowHeight * 2;
    };
    //获取设备对应比例的宽度值
    DeviceMaster.getX = function (num) {
        if (num === void 0) { num = 0; }
        return num * DeviceMaster.scaleWidth;
    };
    //获取设备对应比例的高度值
    DeviceMaster.getY = function (num) {
        if (num === void 0) { num = 0; }
        return num * DeviceMaster.scaleHeight;
    };
    //设备宽度
    DeviceMaster.screenWidth = 750;
    //设备高度
    DeviceMaster.screenHeight = 1334;
    //设备可用宽度
    DeviceMaster.windowWidth = 750;
    //设备可用高度
    DeviceMaster.windowHeight = 1334;
    //场景宽度
    DeviceMaster.stageWidth = 750;
    //场景高度
    DeviceMaster.stageHeight = 1334;
    //设备与场景 宽度比率 screenWidth/stageWidth
    DeviceMaster.scaleWidth = 1;
    //设备与场景 高度比率 screenHeight/stageHeight
    DeviceMaster.scaleHeight = 1;
    return DeviceMaster;
}());
__reflect(DeviceMaster.prototype, "DeviceMaster");
window['DeviceMaster'] = DeviceMaster;
