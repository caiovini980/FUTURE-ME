class SceneOver extends Phaser.Scene
{
    constructor()
    {
        super("SceneOver");
    }

    preload()
    {
        //prelaod images
        this.load.image("gameOver", "images/GAME_OVER_title.png");
        this.load.image("playButton", "images/buttons/2/2.png");
        this.load.image("quitButton", "images/buttons/2/5.png");

        //preload audio
        this.load.audio("backgroundSound", "ObservatingTheStar.ogg");
        
        //preload Fonts
        this.load.bitmapFont("ArcadeClassicFont", "fonts/ArcadeClassicFont.png", "fonts/ArcadeClassicFont.fnt");
    }

    create()
    {
        console.log("Scene Over!");

        //create a new mediamanager that will play the audio file
        var mediaManager = new MediaManager({scene: this});

        //TITLE CONFIG
        var title = this.add.image(0, 0, "gameOver");

        //title position
        title.x = game.config.width / 2;
        title.y = game.config.height / 3;

        //title scale
        title.scaleX = game.config.width * 0.001;
        title.scaleY = game.config.height * 0.0015;

        //setting up a button to return for the title scene and utting it above the background
        var quitButton = new FlatButton({
            scene: this,
            key: "quitButton",
            text: "RETURN TO MENU",
            x: game.config.width / 2,
            y: game.config.height * 0.8,
            alpha: 0.85,
            event: "quit_button_pressed"
        }).setDepth(2);

        //quit game button scales
        quitButton.scaleX = game.config.width * 0.0008;
        quitButton.scaleY = game.config.height * 0.0015;

        //event that call a function for the button when it gets pressed
        emitter.on("quit_button_pressed", this.quitButtonPressed, this);

        //call the function to play the background music
        mediaManager.setBackgroundMusic("backgroundSound");
    }

    //update function
    update()
    {

    }

    //function to return to the main menu
    quitButtonPressed()
    {
        this.scene.start("SceneTitle");
    }

}