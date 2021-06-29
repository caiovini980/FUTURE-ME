var space;
var timer;
//var scoreBox;

class SceneMain extends Phaser.Scene
{
    //called as soon as the class is created
    constructor() 
    {
        super("SceneMain");
    }

    //load all of our resources before we use it
    preload() 
    {
        //this.load.image("key", "path");
        this.load.image("space", "images/Background.jpg");
        this.load.image("arrow", "images/up-arrow.png");
        this.load.image("ship", "images/Ship.png");
        this.load.image("asteroid_1", "images/Asteroid_1.png");
        this.load.image("asteroid_2", "images/Asteroid_2.png");
        this.load.image("asteroid_3", "images/Asteroid_3.png");
        this.load.image("boost", "images/Fuel.png");

        //Buttons
        this.load.image("buttonUp", "images/backgroundInvisible.png"); 
        this.load.image("buttonDown", "images/backgroundInvisible.png");
        this.load.image("exitButton", "images/buttons/2/5.png");

        //Fonts
        this.load.bitmapFont("ArcadeClassicFont", "fonts/ArcadeClassicFont.png", "fonts/ArcadeClassicFont.fnt");
    }

    //set our objects 
    create()
    {
        var exitButton = new FlatButton({
            scene: this,
            key: "exitButton",
            text: "EXIT",
            x: game.config.width / 2,
            y: game.config.height * 0.1,
            alpha: 0.85,
            event: "exit_button_pressed"
        }).setDepth(2);

        emitter.on("exit_button_pressed", this.exitButtonPressed, this);

        exitButton.scaleX = game.config.width * 0.001;
        exitButton.scaleY = game.config.height * 0.002

        this.scoreBox = new ScoreBox({scene: this}).setDepth(10);
        this.scoreBox.x = game.config.width * 0.9;
        this.scoreBox.y = game.config.height / 15;

        model.score = 0;
        space = new Space({scene: this}).setDepth(0);

        //var space = this.add.image(0, 0, "space");
        
        space.x = game.config.width / 2;
    
        timer = this.time.delayedCall(1000, this.onEvent, [], this);
    }

    //constant running loop
    update()
    {
        space.update();
        space.moveAsteroid();
        space.moveBoost();
    }

    exitButtonPressed()
    {
        console.log("EXIT GAME!");
        this.scene.start("SceneTitle");
    }
}