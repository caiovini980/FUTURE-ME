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

        /*this.scene.time.addEvent({
            delay: 2000,                // ms
            callback: this.addObject,
            callbackScope: this.scene,
            loop: true
        });*/

        this.addObject();
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

    addObject()
    {
        var randomValue = RandomValue.randomBetweenTwoValues(0.15, 0.85);
        var randomSpeedValue = RandomValue.randomBetweenTwoValues(1, 10);

        var objects = [
            {key: "asteroid_1", speed: randomSpeedValue}, 
            {key: "asteroid_2", speed: randomSpeedValue}, 
            {key: "asteroid_3", speed: randomSpeedValue}
        ];

        var index = RandomValue.randomIntegerValueBetweenTwoValues(0, objects.length);
        var randomObject = objects[index].key;
        
        var objectSpeed = objects[index].speed;

        this.object = this.scene.add.sprite(game.config.width * 0.5, 
            game.config.height * randomValue, randomObject);

        this.object.speed = objectSpeed;
        this.scaleObject(this.object, game.config.width * 0.0005, game.config.height * 0.0015);
        this.add(this.object);
    }

    stopMovement()
    {
        isMovingDown = false;
        isMovingUp = false;
    }

    moveObject()
    {
        this.object.x -= this.object.speed;

        if (Collision.checkCollision(this.ship, this.object) == true)
        {
            this.ship.alpha = 0.5;
            this.scene.scene.start("SceneOver");
            emitter.emit(constants.SET_SCORE, 0);
        }
        else
        {
            this.ship.alpha = 1;
        }

        if (this.object.x < - game.config.width * 0.5)
        {
            this.object.destroy();
            emitter.emit(constants.ADD_POINTS, 10);
            console.log(model.score);
            this.addObject();
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