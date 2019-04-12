class beeCom {
	public img: egret.Bitmap;//图片
	public boxBody: p2.Body;
	public adaptation = 0;//适配长度
	public power:number=1;//每次的伤害值
	public constructor() {
		this.init()
	}
	public init() {
		this.img = this.createBitmapByName('img_bullet_a2');
		this.img.width = 58;
		this.img.height = 63;
		this.img.anchorOffsetX = this.img.width / 2;
		this.img.anchorOffsetY = this.img.height / 2;
	}
	public createBody(that,x=7.5) {
		var boxShape: p2.Shape = new p2.Box({ width: 1.16, height: 1.26 });
		//不碰撞同类
		boxShape.collisionGroup = 1;
		boxShape.collisionMask = 2;
		this.boxBody = new p2.Body({ mass: 100, position: [x, that.getPosition(900)] });
		this.boxBody.gravityScale = 0;
		this.boxBody.addShape(boxShape);
		that.world.addBody(this.boxBody);
		this.boxBody.displays = [this.img];
		that.addChild(this.img);
		return this.boxBody;
	}
	public powerUp(num=1){
		//伤害值改变
		this.power=num;
		if(num==2){
           this.img.texture=RES.getRes('img_elf_32_png');
		}else{
           this.img.texture=RES.getRes('img_bullet_a2_png');
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