NotificationCommand = {
  JOIN: 'JOIN',
  ACTION: 'ACTION',
  PART: 'PART',
  STATE: 'STATE'
};

JoinCommand = {};
JoinCommand.onMessage = function(server, conn, message) {
  // parse the player info and return the game state
  if (message && message != '') {
    server.setPlayer(conn.id, Player(message.player));
    server.log_.push("Registering Player: " + player.name);
  }
  server.broadcast({status: "Closed", players: server.players_}, NotificationCommand.STATE);
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

