class gridCom {
	public img: egret.Bitmap;//图片
	public txt: egret.BitmapText;//文字
	public itemW: number = 94;//格子大小
	public num: number = 1;//需要击打的数量
	public boxBody: p2.Body;
	public type: number = 1;//类型 1--方形 2--三角型 5--炸弹
	public hitText: egret.Bitmap;//被击中时显示的数字
	public destroyGif;//被销毁时的动画
	public isRemoved = false;//是否已经被移除
	public constructor(num = 1) {
		this.num = num;
		let ran = Math.random();
		if (ran < 0.4) {
			this.type = 2;
		} else if (ran < 0.6) {
			this.type = 5;
		}
		this.init();
	}
	private onLoadComplete(font: egret.BitmapFont): void {

	}
	public init() {
		if (this.type == 1) {
			this.img = this.createBitmapByName('img_diamonds_a1');
		} else if (this.type == 2) {
			this.img = this.createBitmapByName('img_diamonds_b1');
		} else {
			this.img = this.createBitmapByName('img_diamonds_c1');
		}
		this.txt = new egret.BitmapText();
		let font: egret.BitmapFont = RES.getRes('stripe_text_fnt');
		this.txt.font = font;
		this.txt.text = this.num + '';

		this.txt.anchorOffsetX = this.img.width / 5;
		this.txt.anchorOffsetY = this.img.height / 1.8;
	}
	public createBody(x, y, that) {
		var boxShape: p2.Shape;
		if (this.type == 2) {
			var vertices = [[1, -1], [1, 1], [-1, 1]];//必须是逆时针方向的数组
			boxShape = new p2.Convex({ vertices: vertices });
		} else {
			boxShape = new p2.Box({ width: 2, height: 2 });
		}
		boxShape.collisionGroup = 6;
		boxShape.collisionMask = 7;
		this.boxBody = new p2.Body({ mass: 100, position: [x, y], type: p2.Body.STATIC });
		this.boxBody.addShape(boxShape);
		this.boxBody.fixedRotation = false;
		this.boxBody.displays = [this.img, this.txt];
		that.addChild(this.img);
		that.addChild(this.txt);
		return this.boxBody;
	}
	public updateText(that, n = 1, callback: Function = null) {
		//n--击打次数
		let hitText = new egret.BitmapText();
		let font: egret.BitmapFont = RES.getRes('stripe_text_fnt');
		hitText.font = font;

		let t = n > this.num ? this.num + '' : n + '';
		hitText.text = n > this.num ? this.num + '' : n + '';
		hitText.x = this.img.x + 20;
		hitText.y = this.img.y - 80;
		that.addChild(hitText);
		egret.Tween.get(hitText).to({ scaleX: 1.5, scaleY: 1.5, x: hitText.x + 30 * Math.random(), y: hitText.y - 100 }, 500).to({ alpha: 0.5 }, 200).call(() => {
			hitText.parent && hitText.parent.removeChild(hitText);
		});
		if (this.num > n) {
			this.num -= n;
			this.txt.text = this.num + '';
		} else {
			this.isRemoved = true;
			that.world.removeBody(this.boxBody);
			//销毁
			this.img.parent && this.img.parent.removeChild(this.img);
			this.txt.parent && this.txt.parent.removeChild(this.txt);
			//播放销毁的动画
			let res = {};//被销毁的对象，分数之类的信息
			if (this.type == 5) {
				//是炸弹 判断被炸毁的区域
				let d = that.adaptParams.itemWidth / that.factor;
				for (let i = 0, len = that.gridArr.length; i < len; i++) {
					let item = that.gridArr[i];
					let dx = Math.floor(Math.abs(item.boxBody.position[0] - this.boxBody.position[0])*100)/100;
					let dy = Math.floor(Math.abs(item.boxBody.position[1] - this.boxBody.position[1])*100)/100;
					if (item.boxBody.id != this.boxBody.id && (dx <= d && dy <= d)) {
						console.log('boom',item.type)
						if (item.type == 3) {
							//精灵
							if (!item.isRemoved){
								that.shootPoint.beeNum++;
								let nx = item.boxBody.position[0];
								item.updateText(that, () => {
									let b = new beeCom();
									b.createBody(that, nx);
									that.beeArr.push(b);
								});
							}

						} else if (item.type == 4) {
							//星星
						} else if (!item.isRemoved) {
							console.log(55555)
							item.updateText(that, item.num, callback);
						}

					}
				}
			} else {

			}

			callback && callback(res);

		}
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
window['gridCom'] = gridCom