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
var moreScroller = (function (_super) {
    __extends(moreScroller, _super);
    function moreScroller() {
        var _this = _super.call(this) || this;
        _this.scrTerval = null; //左侧滚动定时器
        _this.loadTimes = 0;
        return _this;
    }
    moreScroller.getInstance = function () {
        if (!moreScroller.shared) {
            moreScroller.shared = new moreScroller();
        }
        return moreScroller.shared;
    };
    moreScroller.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    moreScroller.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    moreScroller.prototype.init = function () {
        var that = this;
        if (userDataMaster.recommand && userDataMaster.recommand['1'] && userDataMaster.recommand['1'].games) {
            var list = userDataMaster.recommand['1'].games;
            that.sourceArr = new eui.ArrayCollection(list);
            that.dataGroup = new eui.DataGroup();
            that.dataGroup.dataProvider = that.sourceArr;
            that.dataGroup.useVirtualLayout = true;
            var layout = new eui.VerticalLayout();
            layout.gap = 20;
            that.dataGroup.layout = layout;
            that.dataGroup.itemRenderer = moreItem;
            that.dataGroup2 = new eui.DataGroup();
            that.dataGroup2.dataProvider = that.sourceArr;
            that.dataGroup2.useVirtualLayout = true;
            var layout2 = new eui.VerticalLayout();
            layout2.gap = 20;
            that.dataGroup2.layout = layout2;
            that.dataGroup2.itemRenderer = moreItem;
            that.moreGroup.height = list.length * 150;
            that.moreGroup2.height = list.length * 150;
            that.moreGroup.addChild(that.dataGroup);
            that.moreGroup2.addChild(that.dataGroup2);
            that.moreGroup2.y = that.moreGroup.height;
            that.moreScroller.scrollPolicyV = 'off'; //禁止垂直滚动
            that.scrTerval = setInterval(function () {
                egret.Tween.get(that.moreGroup).to({ y: that.moreGroup.y - 450 }, 1000).wait(100).call(function () {
                    if (that.moreGroup.y <= -that.moreGroup.height) {
                        that.moreGroup.y = that.moreGroup2.y + that.moreGroup2.height;
                    }
                });
                egret.Tween.get(that.moreGroup2).to({ y: that.moreGroup2.y - 450 }, 1000).wait(100).call(function () {
                    if (that.moreGroup2.y <= -that.moreGroup.height) {
                        that.moreGroup2.y = that.moreGroup.y + that.moreGroup.height;
                    }
                });
            }, 3000);
        }
        else if (that.loadTimes < 5) {
            setTimeout(function () {
                that.loadTimes++;
                that.init();
            }, 300);
        }
    };
    return moreScroller;
}(eui.Component));
__reflect(moreScroller.prototype, "moreScroller", ["eui.UIComponent", "egret.DisplayObject"]);
window['moreScroller'] = moreScroller;
