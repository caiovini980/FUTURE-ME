class FlatButton extends Phaser.GameObjects.Container
{
    //class to configure a new button

    constructor(config)
    {
        //check if the scene is being passed on the parameter
        if (!config.scene)
        {
            console.log("MISSING SCENE!");
            return;
        }

        //check if the key is being passed on the parameter
        if (!config.key)
        {
            console.log("MISSING KEY!");
            return;
        }

        //get the scene and saving it to a variable
        super(config.scene);
        this.config = config;
        this.scene = config.scene;

        //adding an image, on the center, that is passed as the key parameter
        this.back = this.scene.add.image(0, 0, config.key);

        //add this image to the container
        this.add(this.back);

        //setting the text configuration
        if (config.text)
        {
            //add the text to the button, on the center of it with a specific font
            this.text1 = this.scene.add.text(0, 0, config.text, {
                font: "20px Arial"
            });
            this.text1.setOrigin(0.5, 0.5);

            //add this text to the container
            this.add(this.text1);
        }

        //config the X position
        if (config.x)
        {
            this.x = config.x;
        }

        //config the Y position
        if (config.y)
        {
            this.y = config.y;
        }

        //config the alpha value
        if (config.alpha)
        {
            this.alpha = config.alpha;
        }

        //config the function that will execute when we press the button
        if (config.event)
        {
            this.back.setInteractive();
            this.back.on("pointerdown", this.pressed, this);
        }

        //add the button to the scene
        this.scene.add.existing(this);
    }

    //move the button up
    over()
    {
        this.y -= 5;
    }

    //move the button down
    out()
    {
        this.y += 5;
    }

    //execute the function when we press the button
    pressed()
    {
        emitter.emit(this.config.event);
    }
}