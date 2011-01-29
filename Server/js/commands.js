NotificationCommand = {
  JOIN: 'JOIN',
  ACTION: 'ACTION',
  PART: 'PART',
  STATE: 'STATE'
};

JoinCommand = {};
JoinCommand.onMessage = function(server, conn, message) {
  var player = server.getPlayer(conn.id);

  this.log_.push("Registering Player: ");
  // return the game state
  
  if (message && message != '') {
    player.name = message;
  }
  server.broadcast({name: player.Name, id: conn.id}, NotificationCommand.JOIN);
};

ActionCommand = {};
ActionCommand.onMessage = function(server, conn, message) {
  var player = server.getPlayer(conn.id);
  server.broadcast({name: player.Name, id: conn.id},
                   NotificationCommand.ACTION);
};

GameStateCommand = {};
GameStateCommand.onMessage = function(server, conn, message) {
  var players = server.getPlayers();
  server.send(conn, {id: conn.id, players: players}, NotificationCommand.STATE);
};

