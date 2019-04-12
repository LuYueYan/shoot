var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var beeCom = (function () {
    function beeCom() {
        this.adaptation = 0; //适配长度
        this.power = 1; //每次的伤害值
        this.init();
    }
    beeCom.prototype.init = function () {
        this.img = this.createBitmapByName('img_bullet_a2');
        this.img.width = 58;
        this.img.height = 63;
        this.img.anchorOffsetX = this.img.width / 2;
        this.img.anchorOffsetY = this.img.height / 2;
    };
    beeCom.prototype.createBody = function (that, x) {
        if (x === void 0) { x = 7.5; }
        var boxShape = new p2.Box({ width: 1.16, height: 1.26 });
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
    };
    beeCom.prototype.powerUp = function (num) {
        if (num === void 0) { num = 1; }
        //伤害值改变
        this.power = num;
        if (num == 2) {
            this.img.texture = RES.getRes('img_elf_32_png');
        }
        else {
            this.img.texture = RES.getRes('img_bullet_a2_png');
        }
    };
    beeCom.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '_png');
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return beeCom;
}());
__reflect(beeCom.prototype, "beeCom");
