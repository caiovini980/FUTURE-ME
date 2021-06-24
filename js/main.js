var game;

window.onload = function ()
{
    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: "phaser-game",
        scene: [SceneMain]
    };

    game = new Phaser.Game(config);
}