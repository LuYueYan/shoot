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
var rebornModal = (function (_super) {
    __extends(rebornModal, _super);
    function rebornModal() {
        return _super.call(this) || this;
    }
    rebornModal.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    rebornModal.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.ignoreBtn) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    rebornModal.prototype.init = function () {
        var that = this;
        setTimeout(function () {
            that.ignoreBtn.visible = true;
        }, 5000);
        that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
    };
    rebornModal.prototype.ignoreFun = function () {
        //
        sceneMaster.closeModal();
        sceneMaster.openModal(new gameOver());
    };
    return rebornModal;
}(eui.Component));
__reflect(rebornModal.prototype, "rebornModal", ["eui.UIComponent", "egret.DisplayObject"]);
