var space;

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
        this.load.image("ship", "images/Ship.png");
        this.load.image("buttonUp", "images/backgroundInvisible.png"); 
        this.load.image("buttonDown", "images/backgroundInvisible.png");
    }

    //set our objects 
    create()
    {
        console.log("Ready!");
        space = new Space({scene:this});
        //var space = this.add.image(0, 0, "space");
        
        space.x = game.config.width / 2;
    }

    //constant running loop
    update()
    {
        space.update();
    }
}