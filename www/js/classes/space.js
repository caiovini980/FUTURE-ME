var isMovingUp = false;
var isMovingDown = false;

var boostRespawnTimer;
var fuelTimer;
var inContactAsteroid;
var inContactBoost;

var fuelLifetime = 13;
var speed = 3;

class Space extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        //get the actual scene and save it on a variable
        super(config.scene);
        this.scene = config.scene;
        
        //Add background
        this.background = this.scene.add.image(
            0, 
            game.config.height / 2, 
            "space"
        );

        //scale the object on X and Y
        this.scaleObject(this.background, game.config.width * 0.0015, game.config.height * 0.0025);
        
        //add background image to the continer
        this.add(this.background);
        
        //add this container to the scene
        this.scene.add.existing(this);
        
        //Add ship
        this.ship = this.scene.physics.add.image(
            - game.config.width * 0.30,
            game.config.height * 0.55,
            "ship"
        );
        
        //flip ship image on X axis
        this.ship.flipX = true;

        //scale schip image
        this.scaleObject(this.ship, game.config.width * 0.0003, game.config.height * 0.0006);

        //add ship image to the scene
        this.add(this.ship);

        //Add clicks behaviour
        //set the background image to interactable
        this.background.setInteractive();

        //when we press on the screen, execute a function
        this.background.on('pointerdown', this.getInputPosition, this);

        //add a asteroid to the scene
        this.addAsteroid();

        //add a boost to the scene
        this.addBoost();
        
        //Timer for game over
        fuelTimer = this.scene.time.addEvent({
            callback: this.gameOver,
            callbackScope: this,
            delay: fuelLifetime * 1000
        });

        //Fuel Text Config
        this.text1 = this.scene.add.bitmapText(0, 0, "ArcadeClassicFont", "FUEL  ", 50);

        this.text1.x = - game.config.width * 0.4;
        this.text1.y = game.config.height * 0.06;        

        this.add(this.text1);
    }


    update()
    {
        //data manipulation to show the fuel timer on the screen
        const fuel = (fuelLifetime - (fuelTimer.elapsed / 1000)).toString().split("");

        //set the text to a new value
        this.text1.setText("FUEL  " + fuel[0] + fuel[1]);

        //if the ship overlap the asteroid
        if(inContactAsteroid)
        {
            this.gameOver();
        }

        //if the ship overlap the fuel/boost
        if(inContactBoost)
        {
            this.addFuel();
        }

        //if the ship is moving up
        if (isMovingUp)
        {
            console.log("moving up");
            if (this.ship.y >= game.config.height * 0.15)
            {
                this.ship.y -= speed * game.config.height * 0.0023;
            }
        }

        //if the ship is moving down
        else if (isMovingDown)
        {
            console.log("moving down");
            if (this.ship.y <= game.config.height * 0.85)
            {
                this.ship.y += speed * game.config.height * 0.0023;
            }
        }
    }

    //get click position and move the player accordingly
    getInputPosition()
    {
        //move up
        if (this.scene.input.y < game.config.height / 2)
        {
            isMovingUp = true;
            isMovingDown = false;
        }

        //move down
        else if (this.scene.input.y > game.config.height / 2)
        {
            isMovingUp = false;
            isMovingDown = true;
        }
    }

    //function to create a boost/fuel on the screen
    addBoost()
    {
        //get a random position for Y
        var randomValue = RandomValue.randomBetweenTwoValues(0.15, 0.85);

        //add the boost on a specific X position and random Y position
        this.boost = this.scene.physics.add.sprite(game.config.width, 
            game.config.height * randomValue, "boost");
        
        //set a collider for the new image
        this.scene.physics.add.overlap(this.ship, this.boost, function () {
            inContactBoost = true;
        });

        //set boost speed, scale and add it to the scene
        this.boost.speed = 2;
        this.scaleObject(this.boost, game.config.width * 0.002, game.config.height * 0.002);
        this.add(this.boost);
    }

    //function to create a asteroid on the screen
    addAsteroid()
    {
        //get a random position for Y
        var randomValue = RandomValue.randomBetweenTwoValues(0.15, 0.85);

        //get a random value for the asteroid speed
        var randomSpeedValue = RandomValue.randomBetweenTwoValues(1, 5);

        //array of possible asteroids to spawn, each with a random speed
        var objects = [
            {key: "asteroid_1", speed: randomSpeedValue}, 
            {key: "asteroid_2", speed: randomSpeedValue}, 
            {key: "asteroid_3", speed: randomSpeedValue}
        ];

        //get a random asteroid, with a random speed, from the array of possible asteroids
        var index = RandomValue.randomIntegerValueBetweenTwoValues(0, objects.length);
        
        //get asteroid name as a "key"
        var randomObject = objects[index].key;
        
        //get asteroid speed
        var objectSpeed = objects[index].speed;

        //add an image for the asteroid, with a physics parameter to make overlap possible
        //on a random Y value
        this.object = this.scene.physics.add.sprite(game.config.width * 0.5, 
            game.config.height * randomValue, randomObject);

        //set a collider for the new image
        this.scene.physics.add.overlap(this.ship, this.object, function () {
            inContactAsteroid = true;
        });

        // set asteroid speed, scale and add to the game
        this.object.speed = objectSpeed;
        this.scaleObject(this.object, game.config.width * 0.0005, game.config.height * 0.0015);
        this.add(this.object);
    }

    // function to move, destroy asteroid, add points and respawn asteroid
    moveAsteroid()
    {
        //function to move the asteroid to the left, on the X axis
        this.object.x -= this.object.speed;

        //if it pass the limit of the screen on the left, destroy it, add 10 points and create a new asteroid
        if (this.object.x < - game.config.width * 0.5)
        {
            this.object.destroy();
            emitter.emit(constants.ADD_POINTS, 10);
            this.addAsteroid();
        }
    }

    //function to transit to the gameOver scene and set player points to 0
    gameOver()
    {
        //load the GameOver scene
        this.scene.scene.start("SceneOver");
        
        //set the player score to 0
        emitter.emit(constants.SET_SCORE, 0);
        
        //set the contact asteroid boolean to false again
        inContactAsteroid = false;
    }

    //function to execute when the player overlap the boosts
    addFuel()
    {
        //destroy the actual boost
        this.boost.destroy();

        //start a timer to respawn a new boost
        boostRespawnTimer = this.scene.time.delayedCall(2000, this.addBoost, [], this);

        //it will reset the timer to enf the game
        fuelTimer.reset();

        //restart the timer to end the game, in miliseconds
        fuelTimer = this.scene.time.addEvent({
            callback: this.gameOver,
            callbackScope: this,
            delay: fuelLifetime * 1000
        });

        //setting the contact booleans to false again
        inContactBoost = false;
    }

    //function to move the boost/fuel, destroy it if it pass the screen limit and respawn it
    moveBoost()
    {
        //function to move the boost/fuel to the left, on the X axis
        this.boost.x -= this.boost.speed;

        //if the boost/fuel pass the screen, destry it and respawn a new one
        if (this.boost.x < - game.config.width * 0.5)
        {
            this.boost.destroy();
            this.addBoost();
        }
    }

    //function to scale objects on both axis
    scaleObject(object, scaleX, scaleY)
    {
        object.scaleX = scaleX;
        object.scaleY = scaleY;
    }
}