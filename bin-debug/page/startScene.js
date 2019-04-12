var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var startScene = (function (_super) {
    __extends(startScene, _super);
    function startScene() {
        var _this = _super.call(this) || this;
        _this.targetArr = [
            'lifeGroup',
            'goldGroup',
            'openLife',
            'openShare',
            'openBullet',
            'openShop',
            'openRank',
            'openGift',
            'openStart'
        ];
        return _this;
    }
    startScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    startScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.bgImg) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    startScene.prototype.init = function () {
        var that = this;
        that.bgImg.height = that.stage.stageHeight;
        that.moreCom = new moreScroller();
        that.moreCom.y = 300;
        that.addChild(that.moreCom);
        that.addEventListener(egret.TouchEvent.TOUCH_TAP, that.judgeFun, that);
    };
    startScene.prototype.judgeFun = function (e) {
        var that = this;
        for (var _i = 0, _a = that.targetArr; _i < _a.length; _i++) {
            var item = _a[_i];
            var t = that[item];
            var x = e.stageX - (t.x - t.anchorOffsetX);
            var y = e.stageY - (t.y - t.anchorOffsetY);
            if (x > 0 && x < t.width && y > 0 && y < t.height) {
                that[item + 'Fun'] && that[item + 'Fun']();
                return;
            }
        }
    };
    startScene.prototype.lifeGroupFun = function () {
        var that = this;
    };
    startScene.prototype.goldGroupFun = function () {
        var that = this;
    };
    startScene.prototype.openLifeFun = function () {
        var that = this;
        sceneMaster.openModal(new getLifeModal());
    };
    startScene.prototype.openShareFun = function () {
        var that = this;
        CallbackMaster.openShare(null, false);
    };
    startScene.prototype.openBulletFun = function () {
        var that = this;
    };
    startScene.prototype.openShopFun = function () {
        var that = this;
    };
    startScene.prototype.openRankFun = function () {
        var that = this;
        sceneMaster.openModal(new rankModal(), false);
    };
    startScene.prototype.openGiftFun = function () {
        var that = this;
    };
    startScene.prototype.openStartFun = function () {
        var that = this;
        clearInterval(moreScroller.getInstance().scrTerval);
        sceneMaster.changeScene(new runningScene());
    };
    return startScene;
}(eui.Component));
__reflect(startScene.prototype, "startScene", ["eui.UIComponent", "egret.DisplayObject"]);
