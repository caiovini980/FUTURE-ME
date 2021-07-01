class Controller
{
    constructor()
    {
        //set the event to set the score and to add points
        emitter.on(constants.SET_SCORE, this.setScore);
        emitter.on(constants.ADD_POINTS, this.upPoints);
    }
 
    //function to set the score
    setScore(score)
    {
        model.score = score;
    }

    //function to add points
    upPoints(points)
    {
        var score = model.score; //10

        score += points;
        model.score = score;
    }
}