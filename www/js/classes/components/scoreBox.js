class ScoreBox extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;

        this.text1 = this.scene.add.bitmapText(0, 0, "ArcadeClassicFont", "SCORE  ", 20);
        this.text1.setOrigin(0.8, 0);

        this.text1.scaleX = game.config.width * 0.002;
        this.text1.scaleY = game.config.height * 0.0025;

        console.log(this.text1);
        this.add(this.text1);

        this.scene.add.existing(this);

        emitter.on(constants.SCORE_UPDATED, this.scoreUpdated, this);
    }

    scoreUpdated()
    {
        this.text1.setText("SCORE  " + model.score);
    }
}