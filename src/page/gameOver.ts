class gameOver extends eui.Component implements eui.UIComponent {
	public levelText: eui.Label;
	public levelProccess: eui.Label;
	public playBtn: eui.Button;
	public shareBtn: eui.Button;
	public homeBtn: eui.Button;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.homeBtn) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
		this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playFun, this);

	}
	public shareFun() {
		CallbackMaster.openShare(null, false);
	}
	public homeFun() {
		sceneMaster.changeScene(new startScene());
	}
	public playFun() {
		sceneMaster.changeScene(new runningScene());
	}

}