/**
 * var conn = new ServerConn('127.0.0.1', 'clientName', 'ffffff');
 * conn.onState = function(state) {
 *     console.log(state);
 * }
 * conn.start();
 * conn.notify(Action.LEFT);
 * conn.notify(Action.RIGHT);
 * conn.notifyLeft();
 * conn.notifyRight();
 */

/** Instantiate a connection */
ServerConn = function(address, name, color) {
    this.connection = new WebSocket('ws://' + address);
    this.name = name;
    this.color = color;
}

/** Start listening */
ServerConn.prototype.start = function() {
    this.connection.onopen = this.onConnectionOpen_.bind(this);
    this.connection.onclose = this.onServerClose_.bind(this);
    this.connection.onerror = this.onServerError_.bind(this);
    this.connection.onmessage = this.onMessage_.bind(this);
}

/** Internal WebSocket handler of new connections */
ServerConn.prototype.onConnectionOpen_ = function() {
    console.log('ServerConn: Connected ' + this.name);
    this.send_({
        command: RequestType.JOIN,
        player: {
            name: this.name,
            color: this.color
        }
    });
}

/** Internal WebSocket handler for closed connections */
ServerConn.prototype.onServerClose_ = function() {
    console.log('ServerConn: Server disconnected');
}

/** Internal WebSocket handler for server errors */
ServerConn.prototype.onServerError_ = function(error) {
    console.error('ServerConn: Error ' + error);
}

/** Internal WebSocket handler for server messages */
ServerConn.prototype.onMessage_ = function(e) {
    console.log('ServerConn: Received message ' + e + ' : ' + e.data);
    this.parseMessage_(e.data);
}

/** Internal parse message */
ServerConn.prototype.parseMessage_ = function(data) {
    var obj = JSON.parse(data);

    switch (obj.command) {
        case ResponseType.STATE:
            console.log('ServerConn: Received STATE response');
            var msg = obj.message;
            if (this.onState && msg) {
                var state = new GameState(msg.status);
                var players = msg.players;
                if (players) {
                    for (var i = 0; i < players.length; i ++) {
                        var player = players[i];
                        if (player) {
                            var pos = player.position;
                            var x = null;
                            var y = null;
                            if (pos) {
                                var split = pos.split(',');
                                if (split && split.length == 2) {
                                    x = split[0];
                                    y = split[1];
                                }
                            }
                            var p = this.getPlayer({
                                ID : player.id,
                                Nickname : player.name,
                                Colour : player.color,
                                StartX : x,
                                StartY : y,
                                Direction : player.direction,
                                Status : player.status
                            });

                            state.addPlayer(p);
                        }
                    }
                }
            }
            onState(state);
            break;
        default:
            console.error('ServerConn: Invalid response type: ' + obj.command);
            break;
    }
}

/** Internal send to server */
ServerConn.prototype.send_ = function(obj) {
    var json = JSON.stringify(obj);
    console.log('ServerConn: Sending ' + json);
    this.connection.send(json);
}

/** Exposed GameState handler */
ServerConn.prototype.onState = function(state) { };

/** Check if connection is open */
ServerConn.prototype.isActive = function() {
    return this.connection.readyState == 1;
}

/** Send event to server */
ServerConn.prototype.notify = function(action) {
    this.send_({
        command: RequestType.ACTION,
        player: {
            name: this.name,
            action: action
        }
    });
}

/** Send LEFT event to server */
ServerConn.prototype.notifyLeft = function() {
    this.notify_(Action.LEFT);
}

/** Send RIGHT event to server */
ServerConn.prototype.notifyRight = function() {
    this.notify_(Action.RIGHT);
}

/** Function to get or create a player given a set of properties. Can be overwritten. */
ServerConn.prototype.getPlayer = function(props) {
    var player = new Player(props);
    return player;
}