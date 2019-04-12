var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var movieMaster = (function () {
    function movieMaster() {
    }
    movieMaster.init = function () {
        var data = RES.getRes("ball_travel_gif_json");
        var txtr = RES.getRes("ball_travel_gif_png");
        movieMaster.mcFactory = new egret.MovieClipDataFactory(data, txtr);
    };
    movieMaster.getGif = function (name) {
        var mc = new egret.MovieClip(movieMaster.mcFactory.generateMovieClipData(name));
        return mc;
    };
    return movieMaster;
}());
__reflect(movieMaster.prototype, "movieMaster");
window['movieMaster'] = movieMaster;
