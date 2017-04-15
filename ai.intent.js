/*
 * Compacts AI intents.
 */

const attack = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.attack(target);
    
    creep.rangedAttack(target);
    if(error === ERR_NOT_IN_RANGE) {
        creep.say("=>⚔");
        creep.moveByPath(creep.memory._move);
    }
    else if(error == OK) {
        creep.say("⚔");
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
},
attackRanged = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.rangedAttack(target);
    
    if(error === ERR_NOT_IN_RANGE) {
        creep.say("=>🔫");
        creep.moveByPath(creep.memory._move);
    }
    else if(error == OK) {
        creep.say("🔫");
        creep.moveByPath(creep.memory._move);
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
},
build = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.build(target);
    
    if(error === ERR_NOT_IN_RANGE) {
        creep.say('=>🔨');
        creep.moveByPath(creep.memory._move);
    }
    else if(error === OK) {
        creep.say('🔨 ' + (creep.carryCapacity - creep.carry.energy) + '/' + creep.carryCapacity);
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
        
    if(!creep.carry.energy)
        creep.memory.needsRefill = true;
},
claim = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error;

    if(!target.owner)
        error = creep.claimController(target);
    else
        error = creep.attackController(target);
    
    if(error === ERR_NOT_IN_RANGE) {
        creep.say('=>☠');
        creep.moveByPath(creep.memory._move);
    }
    else if(error === OK) {
        creep.say('☠');
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
},
heal = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.heal(target);
    
    creep.rangedHeal(target);
    if(error === ERR_NOT_IN_RANGE) {
        creep.say('=>💉');
        if(creep.memory._move)
            creep.moveByPath(creep.memory._move);
        else
            creep.moveTo(target);
    }
    else if(error === OK) {
        creep.say('💉');
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
},
rechargeTower = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.transfer(target);

    if(error === ERR_NOT_IN_RANGE) {
        creep.say('=>⚡');
        if(creep.memory._move)
            creep.moveByPath(creep.memory._move);
        else
            creep.moveTo(target);
    }
    else if(error === OK) {
        creep.say('⚡');
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
    
    if(!creep.carry.energy)
        creep.memory.needsRefill = true;
},
refill = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error;
    
    if(target.structureType)
        error = creep.withdraw(target, RESOURCE_ENERGY,
            (creep.carryCapacity - creep.carry.energy));
    else
        error = creep.harvest(target);

    if(error == ERR_NOT_IN_RANGE) {
        creep.say('=>🔋');
        if(creep.memory._move)
            creep.moveByPath(creep.memory._move);
        else
            creep.moveTo(storage.pos, pathDefinition ? pathDefinition : {});
    }
    else if (error == 0)
        creep.say('🔋 ' + creep.carry.energy + '/' + creep.carryCapacity);
    else
        creep.say(translateError(error));

    if(creep.carry.energy >= creep.carryCapacity)
        creep.memory.needsRefill = false;
},
repair = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.repair(target);

    if(error === ERR_NOT_IN_RANGE) {
        creep.say('=>🔧');
        if(creep.memory._move)
            creep.moveByPath(creep.memory._move);
        else
            creep.moveTo(target);
    }
    else if(error === OK) {
        creep.say('🔧');
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
    
    if(!creep.carry.energy)
        creep.memory.needsRefill = true;
},
resupply = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.transfer(target);

    if(error === ERR_NOT_IN_RANGE) {
        creep.say('=>⚡');
        if(creep.memory._move)
            creep.moveByPath(creep.memory._move);
        else
            creep.moveTo(target);
    }
    else if(error === OK) {
        creep.say('⚡');
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
    
    if(!creep.carry.energy)
        creep.memory.needsRefill = true;
},
store = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.store(target);;

    if(error === ERR_NOT_IN_RANGE) {
        creep.say('=>⚡');
        if(creep.memory._move)
            creep.moveByPath(creep.memory._move);
        else
            creep.moveTo(target);
    }
    else if(error === OK) {
        creep.say('⚡');
        creep.memory.idle = true;
    }
    else {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
    
    if(!creep.carry.energy)
        creep.memory.needsRefill = true;
},
upgrade = function(creep) {
    var target = Game.getObjectById(creep.memory.target),
        error = creep.upgradeController(target);

    if(error === ERR_NOT_IN_RANGE)
    {
        creep.say('=>⛓');
        if(creep.memory._move)
            creep.moveByPath(creep.memory._move);
        else
            creep.moveTo(target);
    }
    else if(error === OK)
    {
        creep.say('⛓');
        creep.memory.idle = true;
    }
    else
    {
        creep.say(translateError(error));
        creep.memory.idle = true;
    }
},
registerIntent = function(intent, creep, targetObject)
{
    creep.memory.intent = intent;
    creep.memory.target = target.id;
},
functions = {
    attack: (creep) => (registerIntent('attack', creep)),
    attackRanged: (creep) => (registerIntent('attackRanged', creep)),
    build: (creep) => (registerIntent('build', creep)),
    claim: (creep) => (registerIntent('claim', creep)),
    heal: (creep) => (registerIntent('heal', creep)),
    rechargeTower: (creep) => (registerIntent('rechargeTower', creep)),
    refill: (creep) => (registerIntent('refill', creep)),
    repair: (creep) => (registerIntent('repair', creep)),
    resupply: (creep) => (registerIntent('resupply', creep)),
    store: (creep) => (registerIntent('store', creep)),
    upgrade: (creep) => (registerIntent('upgrade', creep))
},
runIntent = function(creep) {
    functions[creep.memory.intent](creep);
};

functions.runIntent = runIntent;

module.exports = functions;
