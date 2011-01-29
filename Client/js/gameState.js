StateStatus = {
    InProgress: 'InProgress',
    Waiting: 'Waiting',
    Closed: 'Closed'
}

GameState = function(status) {
    this.status = status;
    this.players = [];
}

GameState.prototype.addPlayer = function(player) {
    this.players[player.name] = player;
}

GameState.prototype.findPlayer = function(name) {
    return this.players[name];
}
