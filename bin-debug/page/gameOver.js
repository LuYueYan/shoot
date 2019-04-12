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
var gameOver = (function (_super) {
    __extends(gameOver, _super);
    function gameOver() {
        return _super.call(this) || this;
    }
    gameOver.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    gameOver.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.homeBtn) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    gameOver.prototype.init = function () {
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playFun, this);
    };
    gameOver.prototype.shareFun = function () {
        CallbackMaster.openShare(null, false);
    };
    gameOver.prototype.homeFun = function () {
        sceneMaster.changeScene(new startScene());
    };
    gameOver.prototype.playFun = function () {
        sceneMaster.changeScene(new runningScene());
    };
    return gameOver;
}(eui.Component));
__reflect(gameOver.prototype, "gameOver", ["eui.UIComponent", "egret.DisplayObject"]);
