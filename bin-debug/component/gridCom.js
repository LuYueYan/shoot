var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gridCom = (function () {
    function gridCom(num) {
        if (num === void 0) { num = 1; }
        this.itemW = 94; //格子大小
        this.num = 1; //需要击打的数量
        this.type = 1; //类型 1--方形 2--三角型 5--炸弹
        this.isRemoved = false; //是否已经被移除
        this.num = num;
        var ran = Math.random();
        if (ran < 0.4) {
            this.type = 2;
        }
        else if (ran < 0.6) {
            this.type = 5;
        }
        this.init();
    }
    gridCom.prototype.onLoadComplete = function (font) {
    };
    gridCom.prototype.init = function () {
        if (this.type == 1) {
            this.img = this.createBitmapByName('img_diamonds_a1');
        }
        else if (this.type == 2) {
            this.img = this.createBitmapByName('img_diamonds_b1');
        }
        else {
            this.img = this.createBitmapByName('img_diamonds_c1');
        }
        this.txt = new egret.BitmapText();
        var font = RES.getRes('stripe_text_fnt');
        this.txt.font = font;
        this.txt.text = this.num + '';
        this.txt.anchorOffsetX = this.img.width / 5;
        this.txt.anchorOffsetY = this.img.height / 1.8;
    };
    gridCom.prototype.createBody = function (x, y, that) {
        var boxShape;
        if (this.type == 2) {
            var vertices = [[1, -1], [1, 1], [-1, 1]]; //必须是逆时针方向的数组
            boxShape = new p2.Convex({ vertices: vertices });
        }
        else {
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
    };
    gridCom.prototype.updateText = function (that, n, callback) {
        if (n === void 0) { n = 1; }
        if (callback === void 0) { callback = null; }
        //n--击打次数
        var hitText = new egret.BitmapText();
        var font = RES.getRes('stripe_text_fnt');
        hitText.font = font;
        var t = n > this.num ? this.num + '' : n + '';
        hitText.text = n > this.num ? this.num + '' : n + '';
        hitText.x = this.img.x + 20;
        hitText.y = this.img.y - 80;
        that.addChild(hitText);
        egret.Tween.get(hitText).to({ scaleX: 1.5, scaleY: 1.5, x: hitText.x + 30 * Math.random(), y: hitText.y - 100 }, 500).to({ alpha: 0.5 }, 200).call(function () {
            hitText.parent && hitText.parent.removeChild(hitText);
        });
        if (this.num > n) {
            this.num -= n;
            this.txt.text = this.num + '';
        }
        else {
            this.isRemoved = true;
            that.world.removeBody(this.boxBody);
            //销毁
            this.img.parent && this.img.parent.removeChild(this.img);
            this.txt.parent && this.txt.parent.removeChild(this.txt);
            //播放销毁的动画
            var res = {}; //被销毁的对象，分数之类的信息
            if (this.type == 5) {
                //是炸弹 判断被炸毁的区域
                var d = that.adaptParams.itemWidth / that.factor;
                var _loop_1 = function (i, len) {
                    var item = that.gridArr[i];
                    var dx = Math.floor(Math.abs(item.boxBody.position[0] - this_1.boxBody.position[0]) * 100) / 100;
                    var dy = Math.floor(Math.abs(item.boxBody.position[1] - this_1.boxBody.position[1]) * 100) / 100;
                    if (item.boxBody.id != this_1.boxBody.id && (dx <= d && dy <= d)) {
                        console.log('boom', item.type);
                        if (item.type == 3) {
                            //精灵
                            if (!item.isRemoved) {
                                that.shootPoint.beeNum++;
                                var nx_1 = item.boxBody.position[0];
                                item.updateText(that, function () {
                                    var b = new beeCom();
                                    b.createBody(that, nx_1);
                                    that.beeArr.push(b);
                                });
                            }
                        }
                        else if (item.type == 4) {
                            //星星
                        }
                        else if (!item.isRemoved) {
                            console.log(55555);
                            item.updateText(that, item.num, callback);
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0, len = that.gridArr.length; i < len; i++) {
                    _loop_1(i, len);
                }
            }
            else {
            }
            callback && callback(res);
        }
    };
    gridCom.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '_png');
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return gridCom;
}());
__reflect(gridCom.prototype, "gridCom");
window['gridCom'] = gridCom;
