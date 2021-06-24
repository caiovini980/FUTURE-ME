var isMovingUp = false;
var isMovingDown = false;
var speed = 3;

class Space extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;
        
        //Add background
        this.background = this.scene.add.image(
            0, 
            game.config.height / 2, 
            "space"
        );

        this.scaleObject(this.background, game.config.width * 0.0015, game.config.height * 0.0025);
        
        this.add(this.background);
        this.scene.add.existing(this);
        
        //Add ship
        this.ship = this.scene.add.image(
            - game.config.width * 0.30,
            game.config.height * 0.55,
            "ship"
        );

        this.ship.flipX = true;
        //this.ship.setScale(0.5);
        this.scaleObject(this.ship, game.config.width * 0.0003, game.config.height * 0.0006);
        this.add(this.ship);

        //Add movement arrows
        //Arrow up
        this.buttonUp = this.scene.add.image(
            game.config.width / 2,
            game.config.height * 0.28,
            "buttonUp"
        );

        //Arrow down
        this.buttonDown = this.scene.add.image(
            game.config.width / 2,
            game.config.height * 0.82,
            "buttonDown"
        );

        //Define buttons's scale
        //this.buttonUp.scaleY = 0.5;
        this.buttonUp.scaleX = 5;

        //this.buttonDown.scaleY = ;
        this.buttonDown.scaleX = 5;
        
        //this.arrowDown.flipY = true;

        //this.setSize(game.config.width * 0.5, game.config.height);

        //Add clicks
        this.buttonUp.setInteractive();
        this.buttonDown.setInteractive();
        this.buttonUp.on('pointerdown', this.moveShipUp, this);
        this.buttonDown.on('pointerdown', this.moveShipDown, this);

        //this.background.setInteractive();
        //this.background.on("pointerdown", this.moveShip, this);
    }

    update()
    {
        if (isMovingUp)
        {
            console.log("moving up");
            if (this.ship.y >= game.config.height * 0.15)
            {
                this.ship.y -= speed;
            }
        }

        else if (isMovingDown)
        {
            console.log("moving down");
            if (this.ship.y <= game.config.height * 0.85)
            {
                this.ship.y += speed;
            }
        }
    }

    stopMovement()
    {
        isMovingDown = false;
        isMovingUp = false;
    }

    moveShip()
    {
        console.log(this.ship.y > game.config.height * 0.5)

        if (this.ship.y > game.config.height * 0.5)
        {
            console.log("moving ship up");
            this.ship.y = game.config.height * 0.25;
        }

        else if (this.ship.y > game.config.height * 0.2)
        {
            console.log("moving ship down");
            this.ship.y = game.config.height * 0.55;
        }
    }

    moveShipUp()
    {
        isMovingUp = true;
        isMovingDown = false;
    }

    moveShipDown()
    {
        isMovingUp = false;
        isMovingDown = true;
    }


    scaleObject(object, scaleX, scaleY)
    {
        object.scaleX = scaleX;
        object.scaleY = scaleY;
    }
}