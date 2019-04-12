class DeviceMaster {
	public static SYSTEM_INFO: any;
	//设备宽度
	public static screenWidth: number = 750;
	//设备高度
	public static screenHeight: number = 1334;
	//设备可用宽度
	public static windowWidth: number = 750;
	//设备可用高度
	public static windowHeight: number = 1334;
	//场景宽度
	public static stageWidth: number = 750;
	//场景高度
	public static stageHeight: number = 1334;
	//设备与场景 宽度比率 screenWidth/stageWidth
	public static scaleWidth: number = 1;
	//设备与场景 高度比率 screenHeight/stageHeight
	public static scaleHeight: number = 1;
	public static model: string;
	public static system: string;//操作系统
	public constructor() {
	}
	//初始化
	public static init(stageWidth: number = 750, stageHeight: number = 1334) {
		DeviceMaster.stageWidth = stageWidth
		DeviceMaster.stageHeight = stageHeight
		//获取系统信息
		DeviceMaster.SYSTEM_INFO = platform.getSystemInfoSync()
		DeviceMaster.model = DeviceMaster.SYSTEM_INFO.model;
		DeviceMaster.system = DeviceMaster.SYSTEM_INFO.system;
		
		DeviceMaster.screenWidth = DeviceMaster.SYSTEM_INFO.screenWidth
		DeviceMaster.screenHeight = DeviceMaster.SYSTEM_INFO.screenHeight

		DeviceMaster.scaleWidth = DeviceMaster.screenWidth / DeviceMaster.stageWidth
		DeviceMaster.scaleHeight = DeviceMaster.screenHeight / DeviceMaster.stageHeight
		DeviceMaster.windowWidth = DeviceMaster.SYSTEM_INFO.windowWidth * 2;
		DeviceMaster.windowHeight = DeviceMaster.SYSTEM_INFO.windowHeight * 2;

	}

	//获取设备对应比例的宽度值
	public static getX(num: number = 0) {
		return num * DeviceMaster.scaleWidth
	}
	//获取设备对应比例的高度值
	public static getY(num: number = 0) {
		return num * DeviceMaster.scaleHeight
	}
}

window['DeviceMaster'] = DeviceMaster