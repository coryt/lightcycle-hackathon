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
    console.log('connect: ' + this.name);
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
    console.log('server disconnected');
    if (window.webkitNotifications) {
        /*
        var notification = webkitNotifications.createNotification(
                null,
                'Disconnected',
                'Server disconnected'
        );
        notification.show();
        */
    }
}

/** Internal WebSocket handler for server errors */
ServerConn.prototype.onServerError_ = function(error) {
    console.error(error);
}

/** Internal WebSocket handler for server messages */
ServerConn.prototype.onMessage_ = function(e) {
    console.log(e.data);
    var obj = JSON.parse(e.data);

    switch (obj.Type) {
        case ResponseType.STATE:
            console.log('STATE response');
            if (this.onState) {
                onState(obj);
            }
            break;
        default:
            console.error('Invalid response type: ' + obj.command);
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
    console.log('Event: ' + name + ', ' + action);
    this.connection.send(JSON.stringify({
        command: RequestType.ACTION,
        player: {
            name: this.name,
            action: action
        }
    }));
}