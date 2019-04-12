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
var getLifeModal = (function (_super) {
    __extends(getLifeModal, _super);
    function getLifeModal() {
        return _super.call(this) || this;
    }
    getLifeModal.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    getLifeModal.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.videoBtn) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    getLifeModal.prototype.init = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.videoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.videoFun, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
    };
    getLifeModal.prototype.closeFun = function () {
        sceneMaster.closeModal();
    };
    getLifeModal.prototype.videoFun = function () {
        AdMaster.useVideo(function () {
            suc();
        }, function () {
            CallbackMaster.openShare(function () {
                suc();
            });
        });
        function suc() {
        }
    };
    getLifeModal.prototype.shareFun = function () {
        CallbackMaster.openShare(function () {
        });
    };
    return getLifeModal;
}(eui.Component));
__reflect(getLifeModal.prototype, "getLifeModal", ["eui.UIComponent", "egret.DisplayObject"]);
