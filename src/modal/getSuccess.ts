class getSuccess extends eui.Component implements eui.UIComponent {
	public light: eui.Image;
	public img: eui.Image;
	public txt: eui.Label;
	public knowBtn: eui.Button;
	public ifShare: eui.Group;
	public shareImg: eui.Image;

	public type: number = 1;//类型 1--钻石 2--体力
	public num: number = 0;//数量
	public shareType = true;//是否分享 默认分享
	public constructor(type = 1, num = 0) {
		super();
		this.type = type;
		this.num = num;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.knowBtn) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		if (this.type == 2) {
			this.img.texture = RES.getRes('img_bullet_a2_png');
		}
		this.txt.text='x'+this.num;
		egret.Tween.get(this.light, { loop: true }).to({ rotation: 360 }, 5000);
		this.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.knowFun, this);
		this.ifShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ifShareFun, this);

	}
	public knowFun() {
		egret.Tween.removeTweens(this.light);
		if (this.shareType) {
			CallbackMaster.openShare(null, false);
		}
		sceneMaster.closeModal();
	}
	public ifShareFun() {
		this.shareType = !this.shareType;
	}

}