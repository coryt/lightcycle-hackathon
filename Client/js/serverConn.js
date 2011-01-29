/**
 * var conn = new ServerConn('127.0.0.1', 'clientName', 'ffffff');
 * conn.onState = function(state) {
 *     console.log(state);
 * }
 * conn.start();
 * conn.notify(Action.LEFT);
 * conn.notify(Action.RIGHT);
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
    this.connection.send(JSON.stringify({
        command: RequestType.JOIN,
        player: {
            name: this.name,
            color: this.color
        }
    }));
}

/** Internal WebSocket handler for closed connections */
ServerConn.prototype.onServerClose_ = function() {
    console.log('ServerConn: server disconnected');
}

/** Internal WebSocket handler for server errors */
ServerConn.prototype.onServerError_ = function(error) {
    console.error('ServerConn: ' + error);
}

/** Internal WebSocket handler for server messages */
ServerConn.prototype.onMessage_ = function(e) {
    console.log('ServerConn: Received message ' + e + ' : ' + e.data);
    this.parseMessage_(e.data);
}

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
                            state.addPlayer(player);
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

/** Exposed GameState handler */
ServerConn.prototype.onState = function(state) { };

/** Check if connection is open */
ServerConn.prototype.isActive = function() {
    return this.connection.readyState == 1;
}

/** Send event to server */
ServerConn.prototype.notify = function(action) {
    console.log('ServerConn: Sending action for ' + name + ' : ' + action);
    this.connection.send(JSON.stringify({
        command: RequestType.ACTION,
        player: {
            name: this.name,
            action: action
        }
    }));
}