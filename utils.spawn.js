/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils.spawn');
 * mod.thing == 'a thing'; // true
 */

const CreepTemplate = require('utils.spawn.template');
 
var harvester = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(WORK) || !creep.addModule(CARRY))
        return;

    while(creep.addModule(MOVE) && creep.addModule(WORK));
    creep.addModule(CARRY);

    console.log("Spawning harvester: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, work: creep.countModules(WORK), carry: creep.countModules(CARRY) }));
};

var upgrader = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(WORK) || !creep.addModule(CARRY))
        return;

    while(creep.addModule(MOVE)
        && creep.addModule(WORK)
        && creep.addModule(MOVE)
        && creep.addModule(CARRY));
    creep.addModule(MOVE);

    console.log("Spawning upgrader: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, work: creep.countModules(WORK), carry: creep.countModules(CARRY) }));
};
 
var builder = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(WORK) || !creep.addModule(CARRY))
        return;

    while(creep.addModule(MOVE)
        && creep.addModule(WORK)
        && creep.addModule(MOVE)
        && creep.addModule(CARRY));
    creep.addModule(MOVE);

    console.log("Spawning builder: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, work: creep.countModules(WORK), carry: creep.countModules(CARRY) }));
};

var carrier = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(CARRY))
        return;

    while(creep.addModule(MOVE)
        && creep.addModule(CARRY));

    console.log("Spawning carrier: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, carry: creep.countModules(CARRY) }));
};
 
var claimer = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(CLAIM))
        return;

    while(creep.addModule(MOVE)
        && creep.addModule(CLAIM));

    console.log("Spawning claimer: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, claim: creep.countModules(CLAIM) }));
};

var healer = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(HEAL))
        return;

    while(creep.addModule(MOVE)
        && creep.addModule(HEAL));

    console.log("Spawning healer: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, heal: creep.countModules(HEAL) }));
};

var fighter = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(ATTACK))
        return;

    while(creep.addModule(MOVE)
        && creep.addModule(ATTACK));

    console.log("Spawning fighter: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, attack: creep.countModules(ATTACK) }));
};

var rdps = function(spawn, energy)
{
    var creep = new CreepTemplate(energy);

    if(!creep.addModule(RANGED_ATTACK))
        return;

    while(creep.addModule(MOVE)
        && (creep.addModule(RANGED_ATTACK)
            || creep.addModule(ATTACK)));

    console.log("Spawning rdps: " + spawn.createCreep(creep.moduleArray,
        undefined,
        { idle: true, rangedAttack: creep.countModules(RANGED_ATTACK), attack: creep.countModules(ATTACK) }));
};

module.exports = {
    harvester: harvester,
    upgrader: upgrader,
    builder: builder,
    claimer: claimer,
    carrier: carrier,
    healer: healer,
    fighter: fighter,
    rdps: rdps
};
