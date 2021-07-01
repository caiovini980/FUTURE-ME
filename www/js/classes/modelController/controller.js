class Controller
{
    constructor()
    {
        emitter.on(constants.SET_SCORE, this.setScore);
        emitter.on(constants.ADD_POINTS, this.upPoints);
    }

    setScore(score)
    {
        model.score = score;
    }

    upPoints(points)
    {
        var score = model.score; //10

        score += points;
        model.score = score;
    }
}