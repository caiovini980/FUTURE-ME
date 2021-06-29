class SceneTitle extends Phaser.Scene
{
    constructor()
    {
        super("SceneTitle");
    }

    preload()
    {
        this.load.image("title", "images/title.png");
        this.load.image("playButton", "images/buttons/2/2.png");
        this.load.image("quitButton", "images/buttons/2/5.png");
        this.load.image("spaceImage", "images/Background.jpg");
        //this.load.image("face", "images/face.png");

        //Sounds
        this.load.audio("backgroundSound", "sounds/ObservingTheStar.ogg");

        //Fonts
        this.load.bitmapFont("ArcadeClassicFont", "fonts/ArcadeClassicFont.png", "fonts/ArcadeClassicFont.fnt");
    }

    create()
    {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene: this});

        console.log("Scene Title!");
        //this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this})
        //this.alignGrid.showNumbers();

        //BACKGROUND CONFIG
        var background = this.add.image(0, 0, "spaceImage");

        background.x = game.config.width / 2;
        background.y = game.config.height / 2;

        background.scaleX = game.config.width * 0.0015;
        background.scaleY = game.config.height * 0.0025;

        //TITLE CONFIG
        var title = this.add.image(0, 0, "title");

        title.x = game.config.width / 2;
        title.y = game.config.height / 2.5;

        title.scaleX = game.config.width * 0.001;
        title.scaleY = game.config.height * 0.0015;
        //this.alignGrid.placeAtIndex(11, title);

        var playButton = new FlatButton({
            scene: this,
            key: "playButton",
            text: "PLAY",
            x: game.config.width / 2,
            y: game.config.height * 0.6,
            alpha: 1,
            event: "play_button_pressed"
        }).setDepth(2);

        var quitButton = new FlatButton({
            scene: this,
            key: "quitButton",
            text: "QUIT",
            x: game.config.width / 2,
            y: game.config.height * 0.8,
            alpha: 0.85,
            event: "quit_button_pressed"
        }).setDepth(2);

        playButton.scaleX = game.config.width * 0.001;
        playButton.scaleY = game.config.height * 0.002;

        quitButton.scaleX = game.config.width * 0.0008;
        quitButton.scaleY = game.config.height * 0.0015;

        emitter.on("quit_button_pressed", this.quitButtonPressed, this);
        emitter.on("play_button_pressed", this.playButtonPressed, this);

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