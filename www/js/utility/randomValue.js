class RandomValue
{
    //class to generate random values

    //get a random number between two values passed as parameters
    static randomBetweenTwoValues(min, max)
    {
        return Math.random() * (max - min) + min;
    }

    //get a random integer number between two values passed as parameters
    static randomIntegerValueBetweenTwoValues(min, max)
    {
        return Math.floor(RandomValue.randomBetweenTwoValues(min, max));
    }
}