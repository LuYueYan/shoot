class getLifeModal extends eui.Component implements eui.UIComponent {
	public closeBtn: eui.Button;
	public videoBtn: eui.Button;
	public shareBtn: eui.Button;
	public shareTimes: eui.Label;

	public constructor() {
		super();
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
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
		this.videoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.videoFun, this);
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
	}
	public closeFun() {
		sceneMaster.closeModal();
	}
	public videoFun() {
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		function suc() {
   
		}
	}
	public shareFun() {
		CallbackMaster.openShare(() => {

		})
	}
}