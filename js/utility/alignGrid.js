class AlignGrid
{
    constructor(config)
    {
        this.config = config;

        if (!config.scene)
        {
            console.log("Missing Scene!");
            return;
        }

        if (!config.rows)
        {
            config.rows = 5;
        }

        if (!config.cols)
        {
            config.cols = 5;
        }

        if (!config.height)
        {
            config.height = game.config.height;
        }

        if (!config.width)
        {
            config.width = game.config.width;
        }

        this.scene = config.scene;

        this.cellWidth = config.width / config.cols;
        this.cellHeight = config.height / config.rows;
    }

    show()
    {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);

        for(var i = 0; i < this.config.width; i += this.cellWidth)
        {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);

            console.log("adding a collum")
        }

        for(var i = 0; i < this.config.height; i += this.cellHeight)
        {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.config.width, i);

            console.log("adding a row")
        }

        this.graphics.strokePath();
    }

    
    placeAt(xPosition, yPosition, object)
    {
        var x2 = this.cellWidth * xPosition;
        var y2 = this.cellHeight + yPosition;

        object.y = x2;
        object.y = y2;
    }
}