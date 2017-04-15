const   spawnUtils      = require('utils.spawn'),
        RoomController  = require('controller.room');

module.exports.loop = function() {
    var controllers = _.map(Game.rooms, (room) => (new RoomController(room)));
    

    _.each(controllers, (controller) => { Memory.controllers[controller.room.name] = controller.memory });
}
