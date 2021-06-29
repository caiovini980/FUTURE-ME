class Collision
{
    static checkCollision(object1, object2)
    {
        var distanceX = Math.abs(object1.x - object2.x);
        var distanceY = Math.abs(object1.y - object2.y);

        if (distanceX < object1.width / 3)
        {
            if (distanceY < object1.height / 3)
            {
                return true;
            }
        }

        return false;
    }
}