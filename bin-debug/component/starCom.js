var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var starCom = (function () {
    function starCom() {
        this.type = 4; //星星
        this.isRemoved = false; //是否已经被移除
        this.init();
    }
    starCom.prototype.init = function () {
        this.img = this.createBitmapByName('star');
    };
    starCom.prototype.createBody = function (x, y, that) {
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
    starCom.prototype.updateText = function (that, callback) {
        if (callback === void 0) { callback = null; }
        //碰撞后做出反应
        var self = this;
        self.isRemoved = true;
        egret.Tween.removeTweens(self.img);
        egret.Tween.get(self.img).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        callback && callback();
    };
    starCom.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '_png');
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return starCom;
}());
__reflect(starCom.prototype, "starCom");
window['starCom'] = starCom;
