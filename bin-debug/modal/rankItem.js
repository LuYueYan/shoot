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
var rankItem = (function (_super) {
    __extends(rankItem, _super);
    function rankItem() {
        return _super.call(this) || this;
    }
    rankItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    rankItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    rankItem.prototype.init = function () {
    };
    rankItem.prototype.dataChanged = function () {
        if (this.data.rank.length > 4) {
            this.data.rank = this.data.rank.slice(0, 4) + "…";
        }
        this.index.text = this.data.rank + '';
        this.headimg.source = this.data.avatarUrl;
        this.level.text = this.data.level + '阶';
        this.score.text = this.data.score;
        if (this.data.nickName.length > 5) {
            this.data.nickName = this.data.nickName.slice(0, 5) + "…";
        }
        this.nickName.text = this.data.nickName;
        this.headimg.mask = this.headimgMask;
        if (this.data.rank < 4) {
            this.bestHat.visible = true;
            this.bestHat.texture = RES.getRes('icn_medal_0' + this.data.rank + '_png');
        }
        else {
            this.bestHat.visible = false;
        }
        for (var i = 1; i <= 2; i++) {
            this['star_' + i].texture = RES.getRes('img_bullet_a2_png');
        }
        // if (this.data.uid != userData.getInstance().getMyInfo.uid) {
        // 	this.bgImg.texture = RES.getRes('bg_friend_png');
        // 	this.score.textColor = 0x5A5BE9;
        // 	this.index.textColor = 0x5A5BE9;
        // 	this.nickName.textColor = 0x5A5BE9;
        // } else {
        // 	this.bgImg.texture = RES.getRes('bg_me_png');
        // 	this.score.textColor = 0xffffff;
        // 	this.index.textColor = 0xffffff;
        // 	this.nickName.textColor = 0xffffff;
        // }
    };
    return rankItem;
}(eui.ItemRenderer));
__reflect(rankItem.prototype, "rankItem", ["eui.UIComponent", "egret.DisplayObject"]);
