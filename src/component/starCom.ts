class starCom {
	public img: egret.Bitmap;//图片
	public boxBody: p2.Body;
	public type = 4;//星星
	public isRemoved = false;//是否已经被移除
	public constructor() {
		this.init()
	}
	public init() {
		this.img = this.createBitmapByName('star');
	}
	public createBody(x, y, that) {
		var boxShape: p2.Shape = new p2.Box({ width: 2, height: 2 });
		boxShape.collisionGroup = 2;
		boxShape.collisionMask = 1;
		boxShape.sensor = true;//作为传感器，被穿透
		this.boxBody = new p2.Body({ mass: 100, position: [x, y], type: p2.Body.STATIC });
		this.boxBody.addShape(boxShape);
		this.boxBody.displays = [this.img];
		that.addChild(this.img);
		return this.boxBody;
	}
	public updateText(that, callback: Function = null) {
		//碰撞后做出反应
		let self = this;
		self.isRemoved = true;
		egret.Tween.removeTweens(self.img);
		egret.Tween.get(self.img).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
		callback && callback();
	}
	private createBitmapByName(name: string): egret.Bitmap {
		var result: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes(name + '_png');
		result.texture = texture;
		result.anchorOffsetX = result.width / 2;
		result.anchorOffsetY = result.height / 2;
		return result;
	}
}
window['starCom'] = starCom