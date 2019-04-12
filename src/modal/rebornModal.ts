class rebornModal extends eui.Component implements eui.UIComponent {
	public rebornBtn: eui.Button;
	public ignoreBtn: eui.Label;


	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.ignoreBtn) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init(){
		let that=this;
			setTimeout(function () {
			that.ignoreBtn.visible = true;
		}, 5000);
		that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
	
	}
	public ignoreFun() {
		//


		sceneMaster.closeModal();
		sceneMaster.openModal(new gameOver());
	}

}