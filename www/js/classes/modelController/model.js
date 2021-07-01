class Model
{
    //class to "save" the players score

    constructor()
    {
        //set the initial score
        this._score = 0;
    }
    set score(value)
    {
        //update the score for a new value
        this._score = value;
        console.log("score updated!");
        emitter.emit(constants.SCORE_UPDATED);
    }
    get score()
    {
        //return the score value
        return this._score;
    }
}