
class runningScene extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public scoreText: eui.BitmapLabel;
	public amountText: eui.BitmapLabel;
	public amountPro: eui.Image;
	public hero: eui.Image;
	public rayGroup: eui.Group;


	public arcPro: egret.Shape = new egret.Shape();//弧形进度条

	public world: p2.World;
	public factor: number = 50;
	public bee: p2.Body;
	public currentTimer = egret.getTimer();
	public ceilArr = [];

	public adaptParams = {
		gridAreaTop: 186 + 9,//格子区域距离屏幕顶部距离
		gridAreaLeft: 30 + 9,//格子区域距离屏幕左侧距离
		itemWidth: 96//格子尺寸
	};
	public worldSpeed = 1000;//世界运行速度

	public ballSpeed = 1000;//物体的匀速

	public gridArr: Array<any> = [];//障碍物存放数组
	public beeArr: Array<beeCom> = [];//球球shuzu
	public shooting = false;//是否在射击进行中
	public levelInfo = { level: 1, amount: 20, existAmount: 0 };
	public amount: number = 0;//消灭的方块数量
	public score: number = 0;//分数
	public shootPoint = { bx: 375, by: 1034, ex: 0, ey: 0, floor: false, beeNum: 0, speedy: 3 };
	//发射起点/目标点坐标/ 每次发射后是否有球落地/目前屁屁球数量（还没掉落到地的也算）//在地面上上时的速度

	public constructor() {
		super();

	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		// if (this.scoreText) {
		this.init()
		// } else {
		// 	this.addEventListener(egret.Event.COMPLETE, this.init, this)
		// }
	}
	public init() {
		let that = this;
		this.amountText.text = this.amount + '/' + this.levelInfo.amount;
		this.bgImg.height = this.stage.stageHeight;

		//创建world
		this.world = new p2.World();
		this.world.sleepMode = p2.World.BODY_SLEEPING;//睡眠策略，提高性能
		this.world.gravity = [0, -10];
		this.world.defaultContactMaterial.restitution = 1;//全局弹性系数
		for (let i = 0; i < 5; i++) {
			let bee = new beeCom();
			bee.createBody(that);
			that.beeArr.push(bee);
			that.shootPoint.beeNum++;
		}
		that.updateBee()
		that.createCeil();
		for (let i = 1; i <= 3; i++) {
			that.createGrids(i)
		}
		that.addChild(that.arcPro);
		that.world.on("beginContact", this.onBeginContact, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		that.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchBeginFun, this)
		that.addEventListener(egret.TouchEvent.TOUCH_MOVE, that.touchMoveFun, this)
		that.addEventListener(egret.TouchEvent.TOUCH_END, that.touchEndFun, this);
	}
	public createCeil() {
		let arr = [
			{ x: 676.5, y: 489, width: 0.18, height: 20 },//右边
			{ x: -4.5, y: 489, width: 0.18, height: 20 },//左边
			{ x: 345, y: -4.5, width: 13.8, height: 0.18 },//上面
			{ x: 345, y: 940, width: 13.8, height: 0.2 }//下面   地面位置 935-945
		];
		for (let i = 0, len = arr.length; i < len; i++) {
			let item = arr[i];
			var planeBody: p2.Body = new p2.Body({ mass: 1, position: [this.getPosition(item.x, 2), this.getPosition(item.y)], type: p2.Body.STATIC });//创建墙壁
			var shape: p2.Shape = new p2.Box({ width: item.width, height: item.height });
			shape.collisionGroup = 6;
			shape.collisionMask = 1;
			planeBody.addShape(shape);//给这个刚体添加形状
			planeBody.displays = [];//与每个形状对应的显示对象
			this.world.addBody(planeBody);
			this.ceilArr.push(planeBody)
		}
	}
	public getPosition(k, type = 1) {
		//px坐标转化为world坐标  
		// type=1时 k为相对格子区域的y坐标
		//type=2时 k为相对格子区域的x坐标
		let adaptParams = this.adaptParams;
		let p = 0;
		if (type == 1) {
			p = (this.stage.stageHeight - (adaptParams.gridAreaTop + k)) / this.factor;
		} else {
			p = (adaptParams.gridAreaLeft + k) / this.factor;
		}
		return p;
	}
	public updateProccess(num = 0) {
		//更新关卡进度
		let that = this;
		if (num == 0) {
			//击掉方块
			that.amount++;
			that.amountText.text = that.amount + '/' + that.levelInfo.amount;
			that.amountPro.width = that.amount / that.levelInfo.amount * 100;
			if (that.amount >= that.levelInfo.amount) {
				//通关成功

				console.log('level up')
			}
		} else {
			//得分
			that.score += num;
			that.scoreText.text = that.score + '';
			let percent = that.score / 200;
			that.changeGraphics(percent)
		}
	}
	public createGrids(row = 1) {
		//每次生成一行 row--生成的位置为第几行（从上往下0行开始） 默认第一行
		let that = this;
		if (that.amount >= that.levelInfo.amount) {
			//通关~~~~
			let info = {
				gold: 0,
				score: that.score,
				level: 1
			}
			that.removeEventListener(egret.Event.ENTER_FRAME, that.onEnterFrame, that);
			that.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchBeginFun, that)
			that.removeEventListener(egret.TouchEvent.TOUCH_MOVE, that.touchMoveFun, that)
			that.removeEventListener(egret.TouchEvent.TOUCH_END, that.touchEndFun, that);
			sceneMaster.openModal(new levelUpModal(info))
		}
		if (that.levelInfo.existAmount >= that.levelInfo.amount) {
			//本关卡数量已足够
			return;
		}
		for (let col = 0; col < 7; col++) {
			let g;
			let ran = Math.random();
			if (ran > 0.4) {
				continue;
			}
			if (ran < 0.2 && (that.levelInfo.existAmount < that.levelInfo.amount)) {
				let num = Math.floor(1 + Math.random() * that.levelInfo.existAmount);
				g = new gridCom(num);
				that.levelInfo.existAmount++;
			} else if (ran < 0.3) {
				g = new ballCom();
			} else if (ran < 0.4) {
				g = new starCom();
			}
			let x = col * that.adaptParams.itemWidth + that.adaptParams.itemWidth / 2;
			let y = row * that.adaptParams.itemWidth + that.adaptParams.itemWidth / 2;
			that.world.addBody(g.createBody(that.getPosition(x, 2), that.getPosition(y), that));
			that.gridArr.push(g);
		}
	}
	public touchBeginFun(e: egret.TouchEvent) {
		if (this.shooting) {
			return;
		}
		if (0) {
			//发射状态
			this.touchMoveFun(e);
		} else {
			//使用道具
			let adaptParams = this.adaptParams;
			let x = (e.stageX - adaptParams.gridAreaLeft) / adaptParams.itemWidth;
			let y = (e.stageY - adaptParams.gridAreaTop) / adaptParams.itemWidth;
			if (x > 0 && x < 7 && y > 0 && y < 8) {
				for (let i = 0, len = this.gridArr.length; i < len; i++) {
					let img = this.gridArr[i].img;
					if (Math.abs(e.stageX - img.x) <= img.width / 2 && Math.abs(e.stageY - img.y) <= img.height / 2) {
						console.log('target', i)
						break;
					}
				}
				this.useTool()
			}
		}
	}
	public useTool() {

	}
	public touchMoveFun(e: egret.TouchEvent) {
		if (this.shooting) {
			return;
		}
		this.shootPoint.ex = e.stageX;
		this.shootPoint.ey = e.stageY;
		this.shootPoint.speedy = 1;
		this.testRay()
	}

	public touchEndFun(e: egret.TouchEvent) {
		let that = this;
		if (this.shooting) {
			return;
		}
		this.shootPoint.speedy = 3;
		this.shootPoint.ex = e.stageX;
		this.shootPoint.ey = e.stageY;
		let dx = that.shootPoint.ex - that.shootPoint.bx;
		let dy = that.shootPoint.ey - that.shootPoint.by;
		let startX = that.shootPoint.bx / that.factor;
		let startY = (that.stage.stageHeight - that.shootPoint.by) / that.factor;
		this.rayGroup.removeChildren();
		this.hero.rotation = 0;
		setTimeout(function () {
			that.shooting = true;
			console.log('shoot', that.shooting)
		}, 100);

		for (let i = 0; i < that.beeArr.length; i++) {
			let bee = that.beeArr[i].boxBody;
			setTimeout(function () {
				egret.Tween.removeTweens(bee.displays[0]);
				bee.position[0] = startX;
				bee.position[1] = startY;
				bee.velocity = [dx / that.factor, -dy / that.factor];
				bee.gravityScale = 0;
				that.updateSpeed(bee);
			}, 100 * i);
		}
	}
	public testRay() {
		let that = this;
		let bx = that.shootPoint.bx / that.factor;
		let by = (that.stage.stageHeight - that.shootPoint.by) / that.factor;
		let ex = that.shootPoint.ex / that.factor;
		let ey = (that.stage.stageHeight - that.shootPoint.ey) / that.factor;
		let dx = ex - bx;
		let dy = ey - by;//ey<by的
		var ray = new p2.Ray({
			from: [bx, by],
			to: [ex + (25 / dy * dx), ey + 25],
			mode: p2.Ray.CLOSEST,
			checkCollisionResponse: true,
			collisionGroup: 1,
			collisionMask: 4
		});
		that.hero.rotation = 350;
		var result = new p2.RaycastResult();
		that.world.raycast(result, ray);
		if (result && result.body) {
			that.createLine(result, ray)
		}
	}
	public createLine(result, ray) {
		let that = this;
		this.rayGroup.removeChildren();
		let bx = that.shootPoint.bx / that.factor;
		let by = (that.stage.stageHeight - that.shootPoint.by) / that.factor;
		let distance = result.getHitDistance(ray);

		let dx = ray.to[0] - ray.from[0];
		let dy = ray.to[1] - ray.from[1];
		for (let i = 0; i < distance - 1; i++) {
			let point = that.createBitmapByName('point');
			point.width = 10;
			point.height = 10;
			point.anchorOffsetX = point.width / 2;
			point.anchorOffsetY = point.height / 2;
			point.x = (ray.from[0] + dx / ray.length * i) * that.factor;
			point.y = that.stage.stageHeight - (ray.from[1] + dy / ray.length * i) * that.factor;
			this.rayGroup.addChild(point)
		}
		let point = that.createBitmapByName('arrow');
		point.width = 10;
		point.height = 10;
		point.anchorOffsetX = point.width / 2;
		point.anchorOffsetY = point.height / 2;
		point.x = (ray.from[0] + dx / ray.length * (distance - 0.5)) * that.factor;
		point.y = that.stage.stageHeight - (ray.from[1] + dy / ray.length * (distance - 0.5)) * that.factor;
		this.rayGroup.addChild(point);

	}
	public onBeginContact(event): void {
		let that = this;
		var bodyA: p2.Body = event.bodyA;
		var bodyB: p2.Body = event.bodyB;
		for (let i = 0; i < that.beeArr.length; i++) {
			let bee = that.beeArr[i].boxBody;
			if (bodyA.id == bee.id || bodyB.id == bee.id) {
				// console.log("on target sensor BeginContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);

				var hittedBody: p2.Body;//与playerBodyId碰撞的刚体
				if (bodyA.id == bee.id) {
					hittedBody = bodyB;
				} else if (bodyB.id == bee.id) {
					hittedBody = bodyA;
				}
				if (hittedBody.id == that.ceilArr[0].id || hittedBody.id == that.ceilArr[1].id || hittedBody.id == that.ceilArr[2].id) {
					//   是墙壁
					bee.angle = 0;
					return;
				}
				if (hittedBody.id == that.ceilArr[3].id) {
					//   是地面
					bee.angle = 0;
					bee.fixedRotation = true;//防止旋转
					bee.gravityScale = 1;
					bee.velocity = [0, -that.shootPoint.speedy];

					return;
				}
				for (let k = 0; k < that.gridArr.length; k++) {
					if (that.gridArr[k].boxBody.id == hittedBody.id) {
						if (that.gridArr[k].type == 3) {
							//是球
							if (!that.gridArr[k].isRemoved) {
								that.shootPoint.beeNum++;
								let nx = that.gridArr[k].boxBody.position[0];
								that.gridArr[k].updateText(that, () => {
									let b = new beeCom();
									b.createBody(that, nx);
									that.beeArr.push(b);
									console.log('hit')
								});
							}
						} else {
							if (that.gridArr[k].type == 4) {
								//是星星
								that.beeArr[i].powerUp(2);
								that.gridArr[k].updateText(that);
							} else if (!that.gridArr[k].isRemoved) {
								//是方块
								let num = that.beeArr[i].power > that.gridArr[k].num ? that.gridArr[k].num : that.beeArr[i].power;
								that.updateProccess(num);
								that.gridArr[k].updateText(that, that.beeArr[i].power, (res) => {
									//已被击碎  如果是炸弹，分数怎么算？？？ res的形式未定
									that.updateProccess();
								});
							}
						}
						break;
					}
				}
				// if (hittedBody.shapes[0].sensor == true) {//碰到了传感器，这里不需要计算爆炸位置，只作为传感器就好 
				// 	//碰撞到了传感器，不是普通dynamic刚体
				// 	console.log("碰撞到了传感器，不是普通dynamic刚体,id:" + hittedBody.id);
				// } else {
				// 	this.getPlayerContactPos();  //这里是计算和其他Body.type=dynamic的刚体碰撞的位置
				// }
				break;
			}
		}
	}
	// 获得player碰撞位置
	private getPlayerContactPos(): void {
		// for(var i = 0;i < this.world.narrowphase.contactEquations.length;i++) {
		//     var c: p2.ContactEquation = this.world.narrowphase.contactEquations;
		//     if(c.bodyA.id == this.bee.id || c.bodyB.id == this.bee.id) {

		//         var ptA: Array<number> = c.contactPointA;//pointA delta向量，上次使用contactPointB貌似没用对，用contactPointA就对了
		//         var contactPos: Array<number> = [c.bodyA.position[0] + ptA[0],c.bodyA.position[1] + ptA[1]];//在BodyA位置加上delta向量，这个就是碰撞发生的p2位置
		//         // var dispX: number = jbP2.P2Space.convertP2ValueToEgret(contactPos[0]);//转换到egret世界的位置
		//         // var dispY: number = jbP2.P2Space.convertP2Y_To_EgretY(contactPos[1]);//转换到egret世界的位置

		//         // //drawing the point to the graphics
		//         // this.contactDrawing.graphics.lineStyle(1,0);
		//         // this.contactDrawing.graphics.drawCircle(dispX,dispY,15);
		//         // this.contactDrawing.graphics.endFill();
		//     }
		// }
	}
	private onEndContact(event): void {
		var bodyA: p2.Body = event.bodyA;
		var bodyB: p2.Body = event.bodyB;

		if (bodyA.id == 5 || bodyB.id == 5) {
			// console.log("on target sensor EndContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
		}
	}
	private onEnterFrame() {
		let that = this;
		let dt = egret.getTimer() - this.currentTimer;
		if (dt < 10) {
			return;
		}
		if (dt > 1000) {
			return;
		}
		this.world.step(dt / this.worldSpeed);//使物理系统向前经过一定时间，也就是使世界运行
		this.currentTimer = egret.getTimer();
		var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//获取舞台高度？？？？
		var l = this.world.bodies.length;//所有body的长度
		for (var i: number = 0; i < l; i++) {
			var boxBody: p2.Body = this.world.bodies[i];
			var len = boxBody.displays.length;
			for (let j = 0; j < len; j++) {
				var box: egret.DisplayObject = boxBody.displays[j];
				if (box) {
					if (j == 0) {
						box.anchorOffsetX = boxBody.displays[0].width / 2;
					}
					box.x = boxBody.position[0] * this.factor;
					box.y = stageHeight - boxBody.position[1] * this.factor;//坐标系不一样，所以要转换
					// box.rotation = 360 - (boxBody.angle + boxBody.shapes[j].angle) * 180 / Math.PI;//旋转
					box.rotation = 360 - boxBody.angle * 180 / Math.PI;//旋转
				}
			}
		}
		let num = 0;
		for (let i = 0, len = this.beeArr.length; i < len; i++) {
			let bee = this.beeArr[i].boxBody;
			if (bee.position[1] <= that.getPosition(856)) {
				num++;
				if (bee.gravityScale == 0) {
					bee.velocity[0] = 0;
					bee.angle = 0;
					bee.displays[0].rotation = 0;
					bee.gravityScale = 1;
					this.beeArr[i].powerUp();
					if (!that.shootPoint.floor) {
						//第一个球落地时更新下次发射点
						that.shootPoint.floor = true;
						that.shootPoint.bx = bee.position[0] * that.factor;
						let nx = that.shootPoint.bx + that.hero.anchorOffsetX - that.hero.width / 2;
						let dt = Math.abs(that.hero.x - nx);
						egret.Tween.get(that.hero).to({ x: nx }, dt);
					}
				}
				//全部落地了
				if ((i == len - 1) && num == len && that.shooting && that.shootPoint.beeNum == len) {
					console.log('enter', that.shooting)
					that.shooting = false;
					that.shootPoint.floor = false;
					setTimeout(function () {
						that.updateGrids();
						that.updateBee()
					}, 100);
				}
			} else {
				if (bee.gravityScale == 0) {
					this.updateSpeed(bee);
				} else {
					bee.velocity[1] = -that.shootPoint.speedy;
					this.beeArr[i].powerUp();
				}
			}
		}
	}
	public updateBee() {
		//更新球的水平坐标
		let that = this;
		let bx = that.shootPoint.bx / that.factor;
		let direction = 0.8;
		let dx = that.hero.width / 2 / that.factor;
		if (bx > 7.5) {
			direction = -direction;
			dx = -dx;
		}
		for (let i = 0, len = that.beeArr.length; i < len; i++) {
			that.beeArr[i].boxBody.position[0] = i * direction + bx + dx;
			if ((that.beeArr[i].boxBody.position[0] > 14) || (that.beeArr[i].boxBody.position[0] < 1)) {
				that.beeArr[i].boxBody.position[0] = bx - dx - i * direction;
			}
		}
	}
	public updateGrids() {
		//更新方块的位置以及产生新方块
		let that = this;
		for (let len = that.gridArr.length, i = len - 1; i >= 0; i--) {
			if (that.gridArr[i].isRemoved) {
				if (that.gridArr[i].img.parent && that.gridArr[i].type == 4) {
					that.world.removeBody(that.gridArr[i].boxBody);
					that.gridArr[i].img.parent.removeChild(that.gridArr[i].img);
				}
				that.gridArr.splice(i, 1);
				continue;
			}
			let y = that.gridArr[i].boxBody.position[1];
			if (y <= that.getPosition(that.adaptParams.itemWidth * 6.5)) {
				//危险警告
				console.log('danger');
			}
			if (y <= that.getPosition(that.adaptParams.itemWidth * 7.5)) {
				//游戏结束
				console.log('gameOver');
				that.removeEventListener(egret.Event.ENTER_FRAME, that.onEnterFrame, that);
				that.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchBeginFun, that)
				that.removeEventListener(egret.TouchEvent.TOUCH_MOVE, that.touchMoveFun, that)
				that.removeEventListener(egret.TouchEvent.TOUCH_END, that.touchEndFun, that);
				sceneMaster.openModal(new rebornModal());
				return;
			}
			that.gridArr[i].boxBody.position[1] = y - that.adaptParams.itemWidth / that.factor;
		}
		that.createGrids();

	}
	public updateSpeed(bee) {
		//更新速度，保持匀速运动
		let velocity = bee.velocity;
		if (Math.abs(velocity[1]) < 0.5) {
			console.log('垂直速度为', velocity[1])
			velocity[1] = -0.5;
		}
		let k = Math.sqrt(this.ballSpeed / (velocity[0] * velocity[0] + velocity[1] * velocity[1]));
		bee.velocity = [k * velocity[0], k * velocity[1]];
		bee.angle = 0;
	}
	private createBitmapByName(name: string): egret.Bitmap {
		var result: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes(name + '_png');
		result.texture = texture;
		return result;

	}
	public changeGraphics(percent) {
		//percent 进度百分比
		let angle = percent * 2 * Math.PI * 3 / 4 + Math.PI / 2;
		this.arcPro.graphics.clear();
		this.arcPro.graphics.lineStyle(20, 0xffdf5e, 1);
		this.arcPro.graphics.drawArc(100, 100, 50, Math.PI / 2, angle, false);
		this.arcPro.graphics.endFill();
	}
}