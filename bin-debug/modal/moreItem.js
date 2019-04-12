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
var moreItem = (function (_super) {
    __extends(moreItem, _super);
    function moreItem() {
        return _super.call(this) || this;
    }
    moreItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    moreItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    moreItem.prototype.init = function () {
        var that = this;
        // this.image.mask = this.imgMask;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            CallbackMaster.recommandClick(1, that.data);
            var type = 2;
            platform.navigateToMiniProgram({
                appId: that.data.appid,
                path: that.data.path,
                extraData: {},
                success: function (suc) {
                }, fail: function (err) {
                    type = 3;
                },
                complete: function () {
                    CallbackMaster.recommandClick(type, that.data);
                }
            });
        }, this);
    };
    moreItem.prototype.dataChanged = function () {
        this.title.text = this.data.name;
        this.image.source = this.data.image || '';
        // this.image.mask = this.imgMask;
        // this.title.textColor = this.data.color || 0xFBF6E3;
    };
    return moreItem;
}(eui.ItemRenderer));
__reflect(moreItem.prototype, "moreItem", ["eui.UIComponent", "egret.DisplayObject"]);
window['moreItem'] = moreItem;
