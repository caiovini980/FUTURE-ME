let game;
let model;
let emitter;
let constants;
let controller;

document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

function onDeviceReady()
{
    screen.orientation.lock('landscape');

    const scale =  {
        parent: 'game',
        mode: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    }


    var config = {
        type: Phaser.WEBGL,
        scene: [SceneTitle, SceneMain, SceneOver],
        physics: {
            default: 'arcade',
            arcade: {
              debug: true,
            }
          },
        ...scale
    };
    constants = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
    resize();
    window.addEventListener("resize", resize, false);
};

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth - 8;
    var windowHeight = window.innerHeight - 8;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

