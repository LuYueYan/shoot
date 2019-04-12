class rankModal extends eui.Component implements  eui.UIComponent {
	public bgImg: eui.Image;
	public friendGroup: eui.Group;
	public worldGroup: eui.Group;
	public friend: eui.Image;
	public world: eui.Image;
	public lastPage: eui.Image;
	public nextPage: eui.Image;
	public pageText: eui.Label;
	public goHome: eui.Button;


	public dataGroup: eui.DataGroup = new eui.DataGroup();
	public sourceArr: eui.ArrayCollection = new eui.ArrayCollection([]);
	public currentType = 'friend';
	public worldPage = 1;//当前页码
	public endPage = 1;//总页数
	public pageSize = 6;//每页数量
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
		this.bgImg.height=this.stage.stageHeight;
		platform.openDataContext.postMessage({
			type: "rank",
			width: 600,
			height: 780
		});
		let rank = platform.openDataContext.createDisplayObject()
		this.friendGroup.addChild(rank);
		this.dataGroup.dataProvider = this.sourceArr;
		this.dataGroup.itemRenderer = rankItem;
		let layout = new eui.VerticalLayout();
		layout.gap = 14;
		this.dataGroup.layout = layout;
		this.worldGroup.addChild(this.dataGroup);
		this.getWorld();
		this.lastPage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.changePage('-1') }, this);
		this.nextPage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.changePage('+1') }, this);
		this.goHome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goHomeFun, this);
		this.friend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendFun, this);
		this.world.addEventListener(egret.TouchEvent.TOUCH_TAP, this.worldFun, this);
	
	}
	public changePage(type) {
		if (this.currentType == 'friend') {
			this.getMore(type);
		} else {
			if (type == '-1') {
				this.worldPage > 1 ? this.worldPage-- : 1;
			} else {
				this.worldPage < this.endPage ? this.worldPage++ : '';
			}
			this.getWorld();
		}
	}
	public getWorld() {
		let that = this;
		let params = {
			uid: userDataMaster.getMyInfo.uid,
			page: that.worldPage,
			size: that.pageSize
		}
		ServiceMaster.post(ServiceMaster.rank_world, params, (res) => {
			if (res.code == 1 && res.data) {
				let data = res.data.rank_world;
				that.endPage = res.data.page_num;
				that.sourceArr.removeAll();
				this.pageText.text = that.worldPage + ' / ' + that.endPage;
				for (let i = 0; i < data.length; i++) {
				
					that.sourceArr.addItem(data[i]);
				}
			}
		})
	}
	public friendFun() {
		this.pageText.visible = false;
		this.friend.texture = RES.getRes('img_tittle_a1_png');
		this.world.texture = RES.getRes('img_tittle_b2_png');
		this.friendGroup.visible = true;
		this.worldGroup.visible = false;
		this.currentType = 'friend';
	}
	public worldFun() {
		this.pageText.visible = true;
		this.friend.texture = RES.getRes('img_tittle_a2_png');
		this.world.texture = RES.getRes('img_tittle_b1_png');
		this.friendGroup.visible = false;
		this.worldGroup.visible = true;
		this.currentType = 'world';
	}
	public getMore(type) {
		platform.openDataContext.postMessage({
			type: "rank",
			page: type,
			width: 600,
			height: 780
		});
	}
	public goHomeFun() {
		sceneMaster.closeModal()
	}
}