var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ballCom = (function () {
    function ballCom() {
        this.type = 3; //精灵
        this.isRemoved = false; //是否已经被移除
        this.init();
    }
    ballCom.prototype.init = function () {
        this.img = this.createBitmapByName('img_bullet_a1');
    };
    ballCom.prototype.createBody = function (x, y, that) {
        var boxShape = new p2.Box({ width: 2, height: 2 });
        boxShape.collisionGroup = 2;
        boxShape.collisionMask = 1;
        boxShape.sensor = true; //作为传感器，被穿透
        this.boxBody = new p2.Body({ mass: 100, position: [x, y], type: p2.Body.STATIC });
        this.boxBody.addShape(boxShape);
        this.boxBody.displays = [this.img];
        that.addChild(this.img);
        return this.boxBody;
    };
    ballCom.prototype.updateText = function (that, callback) {
        if (callback === void 0) { callback = null; }
        //销毁
        var self = this;
        self.boxBody.shapes[0].collisionMask = 0;
        self.isRemoved = true;
        setTimeout(function () {
            self.boxBody.type = p2.Body.DYNAMIC;
            self.boxBody.gravityScale = 0;
            self.boxBody.velocity = [0, -10];
            self.boxBody.angularVelocity = 1;
            //计算掉落到地面销毁时间
            var t = (self.boxBody.position[1] - that.getPosition(935)) / 10;
            console.log(t);
            setTimeout(function () {
                //销毁
                that.world.removeBody(self.boxBody);
                self.img.parent && self.img.parent.removeChild(self.img);
                callback && callback();
            }, t * 1000);
        }, 1000);
        //播放销毁的动画
    };
    ballCom.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '_png');
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return ballCom;
}());
__reflect(ballCom.prototype, "ballCom");
window['ballCom'] = ballCom;
