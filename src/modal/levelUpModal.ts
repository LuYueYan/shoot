class levelUpModal extends eui.Component implements eui.UIComponent {
	public levelText: eui.Label;
	public scoreText: eui.Label;
	public goldText: eui.Label;
	public videoBtn: eui.Button;
	public getBtn: eui.Label;

	public info:any;
	public constructor(info:any) {
		super();
		this.info = info;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.videoBtn) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		this.scoreText.text=this.info.score+'';
		this.levelText.text='第'+this.info.level+'关';
		this.videoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.videoFun, this);
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);

	}
	public videoFun() {
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		let that = this;
		function suc() {
			sceneMaster.changeScene(new startScene());
			sceneMaster.openModal(new getSuccess(1, that.info.gold * 2));
		}
	}
	public getFun() {
		sceneMaster.changeScene(new startScene());
		sceneMaster.openModal(new getSuccess(1, this.info.gold));
	}
}