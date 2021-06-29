class FlatButton extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        if (!config.scene)
        {
            console.log("MISSING SCENE!");
            return;
        }

        if (!config.key)
        {
            console.log("MISSING KEY!");
            return;
        }

        super(config.scene);

        this.config = config;
        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, config.key);

        this.add(this.back);

        if (config.text)
        {
            this.text1 = this.scene.add.text(0, 0, config.text, {
                font: "20px Arial"
            });
            this.text1.setOrigin(0.5, 0.5);

            this.add(this.text1);
        }

        if (config.x)
        {
            this.x = config.x;
        }

        if (config.y)
        {
            this.y = config.y;
        }

        if (config.alpha)
        {
            this.alpha = config.alpha;
        }

        if (config.event)
        {
            this.back.setInteractive();
            this.back.on("pointerdown", this.pressed, this);
        }

        // if (model.isMobile == -1)
        // {
        //     this.back.on("pointerover", this.over, this);
        //     this.back.on("pointerout", this.out, this);
        // }

        this.scene.add.existing(this);
    }

    over()
    {
        this.y -= 5;
    }

    out()
    {
        this.y += 5;
    }

    pressed()
    {
        emitter.emit(this.config.event);
    }
}