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
var levelUpModal = (function (_super) {
    __extends(levelUpModal, _super);
    function levelUpModal(info) {
        var _this = _super.call(this) || this;
        _this.info = info;
        return _this;
    }
    levelUpModal.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    levelUpModal.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.videoBtn) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    levelUpModal.prototype.init = function () {
        this.scoreText.text = this.info.score + '';
        this.levelText.text = '第' + this.info.level + '关';
        this.videoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.videoFun, this);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
    };
    levelUpModal.prototype.videoFun = function () {
        AdMaster.useVideo(function () {
            suc();
        }, function () {
            CallbackMaster.openShare(function () {
                suc();
            });
        });
        var that = this;
        function suc() {
            sceneMaster.changeScene(new startScene());
            sceneMaster.openModal(new getSuccess(1, that.info.gold * 2));
        }
    };
    levelUpModal.prototype.getFun = function () {
        sceneMaster.changeScene(new startScene());
        sceneMaster.openModal(new getSuccess(1, this.info.gold));
    };
    return levelUpModal;
}(eui.Component));
__reflect(levelUpModal.prototype, "levelUpModal", ["eui.UIComponent", "egret.DisplayObject"]);
