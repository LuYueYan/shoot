class startScene extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public lifeGroup: eui.Group;
	public liftText: eui.BitmapLabel;
	public goldGroup: eui.Group;
	public goldText: eui.BitmapLabel;
	public openStart: eui.Button;
	public openLife: eui.Button;
	public openShare: eui.Button;
	public openBullet: eui.Button;
	public openShop: eui.Button;
	public openRank: eui.Button;
	public targetArr = [
		'lifeGroup',
		'goldGroup',
		'openLife',
		'openShare',
		'openBullet',
		'openShop',
		'openRank',
		'openGift',
		'openStart'
	];
	public moreCom: moreScroller;
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.bgImg) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		let that = this;
		that.bgImg.height = that.stage.stageHeight;
		that.moreCom = new moreScroller();
		that.moreCom.y = 300;
		that.addChild(that.moreCom);
		that.addEventListener(egret.TouchEvent.TOUCH_TAP, that.judgeFun, that)
	}
	public judgeFun(e: egret.TouchEvent) {
		let that = this;
		for (let item of that.targetArr) {
			let t = that[item];
			let x = e.stageX - (t.x - t.anchorOffsetX);
			let y = e.stageY - (t.y - t.anchorOffsetY);
			if (x > 0 && x < t.width && y > 0 && y < t.height) {
				that[item + 'Fun'] && that[item + 'Fun']();
				return;
			}
		}
	}
	public lifeGroupFun() {
		let that = this;
	}
	public goldGroupFun() {
		let that = this;
	}
	public openLifeFun() {
		let that = this;
		sceneMaster.openModal(new getLifeModal())
	}
	public openShareFun() {
		let that = this;
		CallbackMaster.openShare(null, false);
	}
	public openBulletFun() {
		let that = this;
	}
	public openShopFun() {
		let that = this;
	}
	public openRankFun() {
		let that = this;
		sceneMaster.openModal(new rankModal(), false)
	}
	public openGiftFun() {
		let that = this;

	}
	public openStartFun() {
		let that = this;
		clearInterval(moreScroller.getInstance().scrTerval);
		sceneMaster.changeScene(new runningScene());
	}

}