class SceneTitle extends Phaser.Scene
{
    constructor()
    {
        super("SceneTitle");
    }

    preload()
    {
        //preload images
        this.load.image("title", "images/FUTURE-ME_title.png");
        this.load.image("playButton", "images/buttons/2/2.png");
        this.load.image("quitButton", "images/buttons/2/5.png");
        this.load.image("spaceImage", "images/Background.jpg");

        //preload Sounds
        this.load.audio("backgroundSound", "sounds/ObservingTheStar.ogg");

        //preload Fonts
        this.load.bitmapFont("ArcadeClassicFont", "fonts/ArcadeClassicFont_0.png", "fonts/ArcadeClassicFont.fnt");
    }

    create()
    {
        //define a event system with "emmiter"
        emitter = new Phaser.Events.EventEmitter();

        //create a new controller that handles the points distribution of the game
        controller = new Controller();

        //create a media manager to handle the background music of the game
        var mediaManager = new MediaManager({scene: this});

        //BACKGROUND CONFIG
        //adding a background image
        var background = this.add.image(0, 0, "spaceImage");

        //setting it's position
        background.x = game.config.width / 2;
        background.y = game.config.height / 2;

        //setting it's scale
        background.scaleX = game.config.width * 0.0015;
        background.scaleY = game.config.height * 0.0025;

        //TITLE CONFIG
        //adding a title image
        var title = this.add.image(0, 0, "title");

        //adding a position for the title
        title.x = game.config.width / 2;
        title.y = game.config.height / 2.5;

        //adding a scale for the title
        title.scaleX = game.config.width * 0.001;
        title.scaleY = game.config.height * 0.0015;

        //setting up a play button above the background
        var playButton = new FlatButton({
            scene: this,
            key: "playButton",
            text: "PLAY",
            x: game.config.width / 2,
            y: game.config.height * 0.6,
            alpha: 1,
            event: "play_button_pressed"
        }).setDepth(2);

        //setting a quit game button above the background
        var quitButton = new FlatButton({
            scene: this,
            key: "quitButton",
            text: "QUIT",
            x: game.config.width / 2,
            y: game.config.height * 0.8,
            alpha: 0.85,
            event: "quit_button_pressed"
        }).setDepth(2);

        //play button scale
        playButton.scaleX = game.config.width * 0.001;
        playButton.scaleY = game.config.height * 0.002;

        //quit button scale
        quitButton.scaleX = game.config.width * 0.0008;
        quitButton.scaleY = game.config.height * 0.0015;

        //event for the quit button that executes the quitButtonPressed function
        emitter.on("quit_button_pressed", this.quitButtonPressed, this);

        //event for the play button that executes the playButtonPressed function
        emitter.on("play_button_pressed", this.playButtonPressed, this);

        //call a function to play the background music
        mediaManager.setBackgroundMusic("backgroundSound");
    }

    
    update()
    {

    }

    //function to start the main game scene
    playButtonPressed()
    {
        this.scene.start("SceneMain");
    }

    //function to start the title scene
    quitButtonPressed()
    {
        this.scene.start("SceneTitle");
    }

}