class soundMaster {
    public static bg_sound: egret.Sound;//背景音乐
    public static guide_tap: egret.Sound;//新手引导时点击音乐
    public static songArr = [
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
    ];//歌曲列表

    //  音轨
    public static soundChannel: egret.SoundChannel;
    public static music: boolean = true;
    public static musicStart = 0;//音乐开始播放的时间
    public static pauseTime = 0;//上次暂停时间点
    public constructor() {

    }
    public static init() {
        // soundMaster.bg_sound = RES.getRes("bg_mp3");
        RES.getResByUrl('https://lixi.h5.app81.com/minigame/game_lixi/new_music/music_guide.mp3', (res) => {
            soundMaster.guide_tap = res;
        });
        for (let i = 0, len = soundMaster.songArr.length; i < len; i++) {
            RES.getResByUrl(soundMaster.songArr[i].path, (res) => {
                soundMaster.songArr[i].sound = res;
            });
        }
    }
    public static playSongMusic(index = 0, reborn = 0) {
        if (soundMaster.songArr[index].sound && soundMaster.isMusic) {
            if (reborn == 0) {
                soundMaster.musicStart = egret.getTimer();
                soundMaster.soundChannel = soundMaster.songArr[index].sound.play(0, -1);
            } else {
                //继续播放  
                soundMaster.soundChannel = soundMaster.songArr[index].sound.play(soundMaster.pauseTime, -1);
            }
        }
    }
    public static stopSongMusic(reborn = false) {
        if (soundMaster.soundChannel) {
            if (reborn) {
                soundMaster.pauseTime = (egret.getTimer() - soundMaster.musicStart) / 1000;
            } else {
                soundMaster.pauseTime = 0;
            }
            soundMaster.soundChannel.stop();
            soundMaster.soundChannel = null;
        }
    }
    public static playSingleMusic(type) {
        if (soundMaster[type] && soundMaster.isMusic) {
            soundMaster[type].play(0, 1);
        }
    }
    public static set isMusic(val) {
        if (val) {
            //   播放
            soundMaster.music = true;
            // soundMaster.playBgMusic();
        } else {
            soundMaster.music = false;
            // soundMaster.stopBgMusic();
        }
    }
    public static get isMusic() {
        return soundMaster.music;
    }
}