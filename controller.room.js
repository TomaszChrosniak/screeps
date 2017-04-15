/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.controller');
 * mod.thing == 'a thing'; // true
 */

const   inherits = require('utils.inherits'),
        sourceUts = require('utils.source'),
        aiIntents = require('ai.intent');

var RoomController = function(room) {
    this.controller = room.controller;
    this.room = room;
    if(!Memory.controllers || !Memory.controllers.length)
        Memory.controllers = [];
    this.memory = Memory.controllers[this.room.name] || {};
    if(this.memory.sourceAssignments === undefined)
        this.memory.sourceAssignments = {};
    this.creeps = this.room.find(FIND_MY_CREEPS);
    if(this.memory.sources === undefined) {
        this.memory.sources = {};
        _.each(this.room.find(FIND_SOURCES),
            (source) => ( this.memory.sources[source.id] = sourceUts.adjacentEmptySpaces(source.pos) ) );
    }
    if(this.memory.towers === undefined)
        this.memory.towers = _.map(this.room.find(FIND_MY_STRUCTURES,
                { filter: (structure) => (structure.structureType == STRUCTURE_TOWER) }),
            (tower) => (tower.id));
    if(this.memory.constructionSites === undefined)
        this.memory.constructionSites = _.map(this.room.find(FIND_MY_CONSTRUCTION_SITES), (constructionSite) => (contructionSite.id));
    this.idleCreeps = this.getIdleCreeps();
    // TODO handle losing a room or refreshing the data every few ticks, as creeps will die and everything
};

RoomController.prototype.getIdleCreeps = function() {
    return _.filter(this.creeps, (creep) => (creep.memory.idle));
};

RoomController.prototype.assignWorkers = function() {
    
};

RoomController.prototype.assignHarvesters = function() {
    _.each(this.sources, function(source) {
        if(sourceAssignments[source.id].length < this.sources[source.id])
        var creep = this.idleCreeps.shift();
        if(creep) {
            aiIntents.harvest(creep, source);
            this.sourceAssignments[source.id].push(creep.id);
        }
    });
};

RoomController.prototype.runIntents = function() {
    _.each(this.creeps, (creep) => (aiIntents.runIntent(creep)));
};

RoomController.prototype.saveMemory = function() {
    this.memory.sourceAssignments = this.sourceAssignments;
    Memory.controllers[this.room.name] = this.memory;
};

module.exports = RoomController;
