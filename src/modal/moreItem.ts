class moreItem extends eui.ItemRenderer implements eui.UIComponent {
	public image: eui.Image;
	public imgMask: eui.Rect;
	public title: eui.Label;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		let that = this;
		// this.image.mask = this.imgMask;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			CallbackMaster.recommandClick(1, that.data);
			let type = 2;
			platform.navigateToMiniProgram({
				appId: that.data.appid,
				path: that.data.path,
				extraData: {},
				success(suc) {

				}, fail(err) {
					type = 3;
				},
				complete() {
					CallbackMaster.recommandClick(type, that.data)
				}
			})

		}, this)
	}
	protected dataChanged(): void {
		this.title.text = this.data.name;
		this.image.source = this.data.image || '';
		// this.image.mask = this.imgMask;
		// this.title.textColor = this.data.color || 0xFBF6E3;
	}

}
window['moreItem'] = moreItem