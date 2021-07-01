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

        //images preload
        this.load.image("space", "images/Background.jpg");
        this.load.image("arrow", "images/up-arrow.png");
        this.load.image("ship", "images/Ship.png");
        this.load.image("asteroid_1", "images/Asteroid_1.png");
        this.load.image("asteroid_2", "images/Asteroid_2.png");
        this.load.image("asteroid_3", "images/Asteroid_3.png");
        this.load.image("boost", "images/Fuel.png");

        //Buttons preload
        this.load.image("buttonUp", "images/backgroundInvisible.png"); 
        this.load.image("buttonDown", "images/backgroundInvisible.png");
        this.load.image("exitButton", "images/buttons/2/5.png");

        //Fonts preload
        this.load.bitmapFont("ArcadeClassicFont", "fonts/ArcadeClassicFont.png", "fonts/ArcadeClassicFont.fnt");
    }

    //set our objects 
    create()
    {
        //setting up exitButton and putting it above the background
        var exitButton = new FlatButton({
            scene: this,
            key: "exitButton",
            text: "EXIT",
            x: game.config.width / 2,
            y: game.config.height * 0.1,
            alpha: 0.85,
            event: "exit_button_pressed"
        }).setDepth(2);

        //function that the button will execute when pressed
        emitter.on("exit_button_pressed", this.exitButtonPressed, this);

        //button scale
        exitButton.scaleX = game.config.width * 0.001;
        exitButton.scaleY = game.config.height * 0.002;

        //creating a scorebox, setting it's position and putting it above the background
        this.scoreBox = new ScoreBox({scene: this}).setDepth(10);
        this.scoreBox.x = game.config.width * 0.9;
        this.scoreBox.y = game.config.height / 15;

        //setting the player's first score to 0
        model.score = 0;

        //creating the main class for the game
        //the one that handles the whole gameplay and background
        //putting it behind 
        space = new Space({scene: this}).setDepth(0);
        
        //setting its position to center of the screen width
        space.x = game.config.width / 2;
    }

    //constant running loop
    update()
    {
        //functions of gameloop on the space class
        space.update();
        space.moveAsteroid();
        space.moveBoost();
    }

    //function to return to the title scene
    exitButtonPressed()
    {
        console.log("EXIT GAME!");
        this.scene.start("SceneTitle");
    }
}