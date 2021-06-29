class Align
{
    static scaleToGameWidth(object, percentage)
    {
        object.displayWidth = game.config.width * percentage;
        object.scaleY = object.ScaleX;
    }

    static center(object)
    {
        object.x = game.config.width / 2;
        object.y = game.config.height / 2;
    }

    static centerHorizontal(object)
    {
        object.x = game.config.width / 2;
    }

    static centerVertical(object)
    {
        object.y = game.config.height / 2;
    }
}