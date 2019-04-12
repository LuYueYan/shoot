class ballCom {
	public img: egret.Bitmap;//图片
	public boxBody: p2.Body;
	public type = 3;//精灵
	public isRemoved = false;//是否已经被移除
	public constructor() {
		this.init()
	}
	public init() {
		this.img = this.createBitmapByName('img_bullet_a1');
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
		//销毁
		let self = this;

		self.boxBody.shapes[0].collisionMask = 0;
		self.isRemoved = true;
		setTimeout(() => {
			self.boxBody.type = p2.Body.DYNAMIC;
			self.boxBody.gravityScale = 0;
			self.boxBody.velocity = [0, -10];
			self.boxBody.angularVelocity = 1;

			//计算掉落到地面销毁时间
			let t=(self.boxBody.position[1]-that.getPosition(935))/10;
			console.log(t)
			setTimeout(function () {
				//销毁
				that.world.removeBody(self.boxBody);
				self.img.parent && self.img.parent.removeChild(self.img);
				callback && callback();
		}, t*1000);


		}, 1000);

		//播放销毁的动画
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
window['ballCom'] = ballCom