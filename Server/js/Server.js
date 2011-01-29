var ws = require('./lib/websocket/ws/server');
require('./protocol');
require('./commands');
require('./functions');

/**
 * Notification Server that uses HTML WebSockets for its main form of
 * communication.
 * @param {number} port The port number to run the server.
 */
NotificationServer = function(port) {
  this.port_ = port;
  this.server_ = ws.createServer();
  this.players_ = {};
  this.log_ = [];
  this.commands_ = {};
  this.init();
};

/**
 * Initialize the listeners to handle the various notifications..
 */
NotificationServer.prototype.init = function() {
  
  this.commands_ = {
    'JOIN': JoinCommand,
    'ACTION': ActionCommand,
    'STATE': GameStateCommand
  };
  
  this.server_.addListener('request', this.onWebRequest.bind(this));
  this.server_.addListener('listening', this.onListen.bind(this));
  this.server_.addListener('disconnect', this.onDisconnect.bind(this));
  this.server_.addListener('connection', function(conn) {
    this.onConnection(conn);
    conn.addListener('message', this.onMessage.bind(this, [conn]));
  }.bind(this));
  setInterval(this.onCleanup.bind(this), 10000);
};

/**
 * Simple Static Web Server
 */
NotificationServer.prototype.onWebRequest = function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Commands: JOIN | ACTION | STATE | PART\n");
  res.write("Players: "+ Object.size(this.players_) +"\n");
  for(var l =0; l < this.log_.length; ++l){
    res.write("Log: "+this.log_[l]+"\n");
  }
  res.write('\n\nMore to come...');
  res.end();
};

/**
 * Fires when server successfully listened.
 */
NotificationServer.prototype.onListen = function() {
  syslog('onListen: port ' + this.port_);
};

/**
 * Fires when a new connection has been made.
 */
NotificationServer.prototype.onConnection = function(conn) {
  syslog('onConnection: from ' + conn.id);
  this.log_.push("Connection from "+ conn.id);
  this.players_[conn.id] = {
    id: conn.id
  };
};

/**
 * Fires when the connection sent a message.
 */
NotificationServer.prototype.onMessage = function(conn, message) {
  var player = this.players_[conn.id];
  syslog('> ' + message);
  var obj = JSON.parse(message);
  var cmd = this.commands_[obj.command];
  if (cmd) {
    cmd.onMessage(this, conn, obj.message);
  } else {
    syslog('ERROR MESSAGE: ' + obj.command)
  }
};

/**
 * Fires when a user is being disconnected.
 */
NotificationServer.prototype.onDisconnect = function(conn) {
  var player = this.players_[conn.id].name;
  syslog('onDisconnect: ' + player);
  this.broadcast({player: player, id: conn.id}, NotificationCommand.PART);
  delete this.players_[conn.id];
};

/**
 * Fired when its time to free up resources.
 */
NotificationServer.prototype.onCleanup = function() {
  // Only keep the last 100 messages in the log. Dispose the rest.
  if (this.log_.length > 100) {
    this.log_ = this.log_.slice(100);
  }
};

/**
 * @returns {object} List of connected players.
 */
NotificationServer.prototype.getPlayers = function() {
  return this.players_;
};

/**
 * @id player connection id
 * @player {object} player
 */
NotificationServer.prototype.setPlayer = function(id, player) {
  this.players_[id] = player;
};

/**
 * Start listening for connections.
 */
NotificationServer.prototype.start = function() {
  this.server_.listen(this.port_);
  this.log_.push("Server Started "+new Date());
};

/**
 * Broadcast a message to all players
 */
NotificationServer.prototype.broadcast = function(message, command, protocol) {
  this.log_.push(message);
  this.server_.broadcast(JSON.stringify({
    command: command ? command : NotificationCommand.STATE,
    message: message
  }));
};

/**
 * Broadcast a message to a specific players
 */
NotificationServer.prototype.send = function(conn, message, command, protocol) {
  this.log_.push(message);
  conn.send(JSON.stringify({
    command: command ? command : NotifiationCommand.STATE,
    message: message
  }));
};
