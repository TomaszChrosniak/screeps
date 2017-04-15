/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils.spawn.template');
 * mod.thing == 'a thing'; // true
 */

const moduleCosts = {
    WORK: 100,
    CARRY: 50,
    MOVE: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    CLAIM: 600,
    TOUGH: 10
};
 
var SpawnTemplate = function(energyCommitment)
{
    this.moduleArray = [];
    this.energy = energyCommitment;
    this.addModule(MOVE);
};

SpawnTemplate.prototype.addModule = function(module)
{
    var moduleCost = moduleCosts[module];

    if(moduleCost && (this.energy > moduleCost))
    {
        this.energy -= moduleCost;
        this.moduleArray.push(module);
        return true;
    }
    return false;
};

SpawnTemplate.prototype.countModules = function(module)
{
    var count = 0;
    
    _.filter(this.moduleArray, function(installedModule)
    {
        if(installedModule === module)
            count++;
    });
    
    return count;
};

module.exports = SpawnTemplate;
