var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var soundMaster = (function () {
    function soundMaster() {
    }
    soundMaster.init = function () {
        // soundMaster.bg_sound = RES.getRes("bg_mp3");
        RES.getResByUrl('https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_guide.mp3', function (res) {
            soundMaster.guide_tap = res;
        });
        var _loop_1 = function (i, len) {
            RES.getResByUrl(soundMaster.songArr[i].path, function (res) {
                soundMaster.songArr[i].sound = res;
            });
        };
        for (var i = 0, len = soundMaster.songArr.length; i < len; i++) {
            _loop_1(i, len);
        }
    };
    soundMaster.playSongMusic = function (index, reborn) {
        if (index === void 0) { index = 0; }
        if (reborn === void 0) { reborn = 0; }
        if (soundMaster.songArr[index].sound && soundMaster.isMusic) {
            if (reborn == 0) {
                soundMaster.musicStart = egret.getTimer();
                soundMaster.soundChannel = soundMaster.songArr[index].sound.play(0, -1);
            }
            else {
                //继续播放  
                soundMaster.soundChannel = soundMaster.songArr[index].sound.play(soundMaster.pauseTime, -1);
            }
        }
    };
    soundMaster.stopSongMusic = function (reborn) {
        if (reborn === void 0) { reborn = false; }
        if (soundMaster.soundChannel) {
            if (reborn) {
                soundMaster.pauseTime = (egret.getTimer() - soundMaster.musicStart) / 1000;
            }
            else {
                soundMaster.pauseTime = 0;
            }
            soundMaster.soundChannel.stop();
            soundMaster.soundChannel = null;
        }
    };
    soundMaster.playSingleMusic = function (type) {
        if (soundMaster[type] && soundMaster.isMusic) {
            soundMaster[type].play(0, 1);
        }
    };
    Object.defineProperty(soundMaster, "isMusic", {
        get: function () {
            return soundMaster.music;
        },
        set: function (val) {
            if (val) {
                //   播放
                soundMaster.music = true;
                // soundMaster.playBgMusic();
            }
            else {
                soundMaster.music = false;
                // soundMaster.stopBgMusic();
            }
        },
        enumerable: true,
        configurable: true
    });
    soundMaster.songArr = [
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_0.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_1.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_2.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_3.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_4.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_5.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_6.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_7.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_8.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_9.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_10.mp3', sound: null }
    ]; //歌曲列表
    soundMaster.music = true;
    soundMaster.musicStart = 0; //音乐开始播放的时间
    soundMaster.pauseTime = 0; //上次暂停时间点
    return soundMaster;
}());
__reflect(soundMaster.prototype, "soundMaster");
