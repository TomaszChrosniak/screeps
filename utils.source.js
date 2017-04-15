/*
 * Helper functions to do with sources.
 */
 
var qualifier = function(object)
{
    if(object.type == "terrain")
    {
        if(object.terrain
            && (object.terrain == "swamp" || object.terrain == "normal" || object.terrain == "plain"))
            return true;
    }
    else if(object.type == "structure")
    {
        if(object.structure)
            switch(object.structure.structureType)
            {
                case STRUCTURE_ROAD:
                    return true;
                case STRUCTURE_RAMPART:
                    if(structure.my)
                        return structure.my;
                    else if(structure.my === false)
                        return false;
                    return true;
                case STRUCTURE_STORAGE:
                    if(structure.my)
                        return structure.my;
                    else if(structure.my === false)
                        return false;
                    return true;
                default:
                    return false;
            }
    }
    else
        return true;
};

var adjacentEmptySpaces = function(position)
{
    var areaDescription = Game.rooms[position.roomName]
            .lookAtArea(position.y - 1, position.x - 1, position.y + 1, position.x + 1),
        usableSpots = [];
        
    _.forOwn(areaDescription, function(yValue, y)
    {
        _.forOwn(yValue, function(xValue, x)
        {
            if(_.filter(xValue, qualifier).length == xValue.length)
                usableSpots.push([position.roomName, x, y]);
        });
    });

    return usableSpots.length;
};

module.exports = {
    adjacentEmptySpaces: adjacentEmptySpaces
};
