class MediaManager
{
    //function to play the sounds on the game

    constructor(config)
    {
        //get the actual scene and save it on a variable
        this.scene = config.scene;

        //event that executes a function to play a sound
        emitter.on(constants.PLAY_SOUND, this.playSound, this);
    }

    //play a sound that is passed on the parameter
    playSound(key)
    {
        var sound = this.scene.sound.add(key);

        sound.play();
    }

    //play a sound on loop
    setBackgroundMusic(key)
    {
        var background = this.scene.sound.add(key, {volume: 0.5, loop: true});

        background.play();
    }
}