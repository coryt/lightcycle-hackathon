//function Player(options) {
//    if (!(this instanceof Player)) {
//        return new Player(options);
//    }
//
//    return this.init(options);
//}

/*-----------------------------------------------
  Player Exports:
-----------------------------------------------*/
exports.Player = Player;
exports.createPlayer = function(options){
  return new Player(options);
};

function Player(options){
    var empty = '';
    var name = '';
    var color = '';
    var position = '';
    var direction = '';
    var status = '';

    this.name = options.name || empty;
    this.color = options.color || empty;
    this.position = options.position || empty;
    this.direction = options.direction || empty;
    this.status = options.status || 'Idle';
};
