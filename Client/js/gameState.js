StateStatus = {
    InProgress: 'InProgress',
    Waiting: 'Waiting',
    Closed: 'Closed'
}

GameState = function(status) {
    this.status = status;
    this.players = new Object();
    this.count = 0;
}

GameState.prototype.addPlayer = function(player) {
    if (player && player.GetNickname()) {
        this.players[player.GetNickname()] = player;
        this.count ++;
    }
}

GameState.prototype.findPlayer = function(name) {
    return this.players[name];
}

GameState.prototype.getPlayers = function() {
    var arr = new Array();
    var i = 0;
    for (var p in this.players) {
        arr[i] = this.players[p];
        i ++;
    }
    return arr;
}
