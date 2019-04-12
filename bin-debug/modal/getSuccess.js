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
var getSuccess = (function (_super) {
    __extends(getSuccess, _super);
    function getSuccess(type, num) {
        if (type === void 0) { type = 1; }
        if (num === void 0) { num = 0; }
        var _this = _super.call(this) || this;
        _this.type = 1; //类型 1--钻石 2--体力
        _this.num = 0; //数量
        _this.shareType = true; //是否分享 默认分享
        _this.type = type;
        _this.num = num;
        return _this;
    }
    getSuccess.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    getSuccess.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.knowBtn) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    getSuccess.prototype.init = function () {
        if (this.type == 2) {
            this.img.texture = RES.getRes('img_bullet_a2_png');
        }
        this.txt.text = 'x' + this.num;
        egret.Tween.get(this.light, { loop: true }).to({ rotation: 360 }, 5000);
        this.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.knowFun, this);
        this.ifShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ifShareFun, this);
    };
    getSuccess.prototype.knowFun = function () {
        egret.Tween.removeTweens(this.light);
        if (this.shareType) {
            CallbackMaster.openShare(null, false);
        }
        sceneMaster.closeModal();
    };
    getSuccess.prototype.ifShareFun = function () {
        this.shareType = !this.shareType;
    };
    return getSuccess;
}(eui.Component));
__reflect(getSuccess.prototype, "getSuccess", ["eui.UIComponent", "egret.DisplayObject"]);
