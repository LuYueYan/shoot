class moreScroller extends eui.Component implements eui.UIComponent {
	public moreScroller: eui.Scroller;
	public moreGroup: eui.Group;
	public moreGroup2: eui.Group;

	public dataGroup: eui.DataGroup;
	public sourceArr: eui.ArrayCollection;
	public scrTerval = null;//左侧滚动定时器
	public dataGroup2: eui.DataGroup;
	public loadTimes = 0;
	public constructor() {
		super();
	}
	public static shared: moreScroller;
	public static getInstance() {
		if (!moreScroller.shared) {
			moreScroller.shared = new moreScroller();
		}
		return moreScroller.shared;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}
	public init() {
		let that = this;
		
		if (userDataMaster.recommand && userDataMaster.recommand['1'] && userDataMaster.recommand['1'].games) {
			let list = userDataMaster.recommand['1'].games;
			that.sourceArr = new eui.ArrayCollection(list);
			that.dataGroup = new eui.DataGroup();
			that.dataGroup.dataProvider = that.sourceArr;
			that.dataGroup.useVirtualLayout = true;
			let layout = new eui.VerticalLayout();
			layout.gap = 20;
			that.dataGroup.layout = layout;
			that.dataGroup.itemRenderer = moreItem;

			that.dataGroup2 = new eui.DataGroup();
			that.dataGroup2.dataProvider = that.sourceArr;
			that.dataGroup2.useVirtualLayout = true;
			let layout2 = new eui.VerticalLayout();
			layout2.gap = 20;
			that.dataGroup2.layout = layout2;
			that.dataGroup2.itemRenderer = moreItem;

			that.moreGroup.height = list.length * 150;
			that.moreGroup2.height = list.length * 150;
			that.moreGroup.addChild(that.dataGroup);
			that.moreGroup2.addChild(that.dataGroup2);
			that.moreGroup2.y = that.moreGroup.height;
			that.moreScroller.scrollPolicyV = 'off';//禁止垂直滚动
			that.scrTerval = setInterval(() => {
				egret.Tween.get(that.moreGroup).to({ y: that.moreGroup.y - 450 }, 1000).wait(100).call(() => {
					if (that.moreGroup.y <= -that.moreGroup.height) {
						that.moreGroup.y = that.moreGroup2.y + that.moreGroup2.height;
					}
				});
				egret.Tween.get(that.moreGroup2).to({ y: that.moreGroup2.y - 450 }, 1000).wait(100).call(() => {
					if (that.moreGroup2.y <= -that.moreGroup.height) {
						that.moreGroup2.y = that.moreGroup.y + that.moreGroup.height;
					}
				});

			}, 3000);
		} else if (that.loadTimes < 5) {
			setTimeout(function () {
				that.loadTimes++;
				that.init();
			}, 300);
		}

	}

}
window['moreScroller'] = moreScroller