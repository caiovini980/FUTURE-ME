class RandomValue
{
    static randomBetweenTwoValues(min, max)
    {
        return Math.random() * (max - min) + min;
    }

    static randomIntegerValueBetweenTwoValues(min, max)
    {
        return Math.floor(RandomValue.randomBetweenTwoValues(min, max));
    }
}