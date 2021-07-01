class ScoreBox extends Phaser.GameObjects.Container
{
    //class to build a score box for the game

    constructor(config)
    {
        //get the scene that this class is created on
        super(config.scene);

        //and save it to a variable
        this.scene = config.scene;

        //add the text using bitmapfont for a custom font
        //add a "SCORE " text and set the text size to 20
        //set the origin position for the text
        this.text1 = this.scene.add.bitmapText(0, 0, "ArcadeClassicFont", "SCORE  ", 20);
        this.text1.setOrigin(0.8, 0);

        //set the text scale
        this.text1.scaleX = game.config.width * 0.002;
        this.text1.scaleY = game.config.height * 0.0025;

        //add it to the container
        this.add(this.text1);
        
        //add it to the scene
        this.scene.add.existing(this);

        //event for the update score function
        emitter.on(constants.SCORE_UPDATED, this.scoreUpdated, this);
    }

    //update the score text 
    scoreUpdated()
    {
        this.text1.setText("SCORE  " + model.score);
    }
}