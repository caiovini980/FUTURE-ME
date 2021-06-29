var isMovingUp = false;
var isMovingDown = false;

var boostRespawnTimer;
var fuelTimer;

var fuelLifetime = 13;
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
        this.buttonUp.scaleX = 5;
        this.buttonDown.scaleX = 5;

        //Add clicks
        this.buttonUp.setInteractive();
        this.buttonDown.setInteractive();
        this.buttonUp.on('pointerdown', this.moveShipUp, this);
        this.buttonDown.on('pointerdown', this.moveShipDown, this);

        this.addAsteroid();
        this.addBoost();
        
        //emitter.on(constants.ADD_FUEL, this.addFuel, this);

        fuelTimer = this.scene.time.addEvent({
            callback: this.gameOver,
            callbackScope: this,
            delay: fuelLifetime * 1000
        });

        this.text1 = this.scene.add.bitmapText(0, 0, "ArcadeClassicFont", "FUEL  ", 50);
        //this.text1.setOrigin(0.8, 0);

        this.text1.x = - game.config.width * 0.4;
        this.text1.y = game.config.height * 0.06;

        this.add(this.text1);
    }


    update()
    {
        const fuel = (fuelLifetime - (fuelTimer.elapsed / 1000)).toString().split("");

        this.text1.setText("FUEL  " + fuel[0] + fuel[1]);

        if (isMovingUp)
        {
            console.log("moving up");
            if (this.ship.y >= game.config.height * 0.15)
            {
                this.ship.y -= speed * game.config.height * 0.0023;
            }
        }

        else if (isMovingDown)
        {
            console.log("moving down");
            if (this.ship.y <= game.config.height * 0.85)
            {
                this.ship.y += speed * game.config.height * 0.0023;
            }
        }
    }

    addBoost()
    {
        var randomValue = RandomValue.randomBetweenTwoValues(0.15, 0.85);

        this.boost = this.scene.add.sprite(game.config.width, 
            game.config.height * randomValue, "boost");

        this.boost.speed = 2;
        this.scaleObject(this.boost, game.config.width * 0.002, game.config.height * 0.002);
        this.add(this.boost);
    }

    addAsteroid()
    {
        var randomValue = RandomValue.randomBetweenTwoValues(0.15, 0.85);
        var randomSpeedValue = RandomValue.randomBetweenTwoValues(1, 5);

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

    moveAsteroid()
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
            this.addAsteroid();
        }
    }

    moveBoost()
    {
        this.boost.x -= this.boost.speed;

        if (Collision.checkCollision(this.ship, this.boost) == true)
        {
            this.ship.alpha = 0.5;
            this.boost.destroy();

            console.log("FUEL FULL");

            boostRespawnTimer = this.scene.time.delayedCall(2000, this.addBoost, [], this);

            //emitter.on(constants.ADD_FUEL, this.addFuel, this);

            fuelTimer.reset();
            fuelTimer = this.scene.time.addEvent({
                callback: this.gameOver,
                callbackScope: this,
                delay: fuelLifetime * 1000
            });

            //this.scene.scene.start("SceneOver");
            //emitter.emit(constants.SET_SCORE, 0);
        }
        else
        {
            this.ship.alpha = 1;
        }

        if (this.boost.x < - game.config.width * 0.5)
        {
            this.boost.destroy();
            //emitter.emit(constants.ADD_POINTS, 10);
            console.log(model.score);
            this.addBoost();
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

    gameOver()
    {
        console.log("GAME OVER");
        this.scene.scene.start("SceneOver");
    }


    scaleObject(object, scaleX, scaleY)
    {
        object.scaleX = scaleX;
        object.scaleY = scaleY;
    }
}