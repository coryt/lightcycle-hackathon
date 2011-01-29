var p = require('./player');
NotificationCommand = {
  JOIN: 'JOIN',
  ACTION: 'ACTION',
  PART: 'PART',
  STATE: 'STATE'
};

JoinCommand = {};
JoinCommand.onMessage = function(server, conn, player) {
  // parse the player info and return the game state
  if (player && player != '') {
    syslog('> ' + player.name);
    server.setPlayer(p.createPlayer(player));
  }
  server.broadcast({status: "Closed", players: [server.players_]}, NotificationCommand.STATE);
};

//ActionCommand = {};
//ActionCommand.onMessage = function(server, conn, message) {
//  var player = server.getPlayer(conn.id);
//  server.broadcast({name: player.Name, id: conn.id},
//                   NotificationCommand.ACTION);
//};
//
//GameStateCommand = {};
//GameStateCommand.onMessage = function(server, conn, message) {
//  var players = server.getPlayers();
//  server.send(conn, {status: "Closed", players: server.players_}, NotificationCommand.STATE);
//};

