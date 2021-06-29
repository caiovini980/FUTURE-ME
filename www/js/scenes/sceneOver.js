class SceneOver extends Phaser.Scene
{
    constructor()
    {
        super("SceneOver");
    }

    preload()
    {
        this.load.image("brokenShip", "images/GAME_OVER_title.png");
        this.load.image("playButton", "images/buttons/2/2.png");
        this.load.image("quitButton", "images/buttons/2/5.png");
        //this.load.image("face", "images/face.png");

        this.load.audio("backgroundSound", "ObservatingTheStar.ogg");
        
        //Fonts
        this.load.bitmapFont("ArcadeClassicFont", "fonts/ArcadeClassicFont.png", "fonts/ArcadeClassicFont.fnt");
    }

    create()
    {
        console.log("Scene Over!");
        //this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this})
        //this.alignGrid.showNumbers();

        var mediaManager = new MediaManager({scene: this});

        //TITLE CONFIG
        var title = this.add.image(0, 0, "brokenShip");

        title.x = game.config.width / 2;
        title.y = game.config.height / 3;

        title.scaleX = game.config.width * 0.001;
        title.scaleY = game.config.height * 0.0015;
        //this.alignGrid.placeAtIndex(11, title);

        /*var playButton = new FlatButton({
            scene: this,
            key: "playButton",
            text: "PLAY AGAIN",
            x: game.config.width / 2,
            y: game.config.height * 0.6,
            alpha: 1,
            event: "play_button_pressed"
        }).setDepth(2);*/

        var quitButton = new FlatButton({
            scene: this,
            key: "quitButton",
            text: "RETURN TO MENU",
            x: game.config.width / 2,
            y: game.config.height * 0.8,
            alpha: 0.85,
            event: "quit_button_pressed"
        }).setDepth(2);

        //playButton.scaleX = game.config.width * 0.001;
        //playButton.scaleY = game.config.height * 0.002;

        quitButton.scaleX = game.config.width * 0.0008;
        quitButton.scaleY = game.config.height * 0.0015;

        emitter.on("quit_button_pressed", this.quitButtonPressed, this);
        //emitter.on("play_button_pressed", this.playButtonPressed, this);

        mediaManager.setBackgroundMusic("backgroundSound");
    }

    update()
    {

    }

    playButtonPressed()
    {
        this.scene.start("SceneMain");
    }

    quitButtonPressed()
    {
        this.scene.start("SceneTitle");
    }

}