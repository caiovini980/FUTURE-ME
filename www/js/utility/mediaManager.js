class MediaManager
{
    constructor(config)
    {
        this.scene = config.scene;

        emitter.on(constants.PLAY_SOUND, this.playSound, this);
    }

    playSound(key)
    {
        var sound = this.scene.sound.add(key);

        sound.play();
    }

    setBackgroundMusic(key)
    {
        var background = this.scene.sound.add(key, {volume: 0.5, loop: true});

        background.play();
    }
}