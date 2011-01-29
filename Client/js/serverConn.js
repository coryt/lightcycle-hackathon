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

ServerConn.prototype.onConnectionOpen_ = function() {
    console.log('connect: ' + this.name);
    this.connection.send(JSON.stringify({
        command: RequestType.JOIN,
        name: this.name,
        color: this.color
    }));
}

ServerConn.prototype.onServerClose_ = function() {
    console.log('server disconnected');
    if (window.webkitNotifications) {
        var notification = webkitNotifications.createNotification(
                null,
                'Disconnected',
                'Server disconnected'
        );
        notification.show();
    }

}

ServerConn.prototype.onServerError_ = function(error) {
    console.error(error);
}

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
            console.error('Invalid response type: ' + obj.Type);
            break;
    }
}

ServerConn.prototype.onState = function(state) { }

ServerConn.prototype.isActive = function() {
    return this.connection.readyState == 1;
}

ServerConn.prototype.notify(action) {
    console.log('Event: ' + name + ', ' + action);
    this.connection.send(JSON.stringify({
        command: RequestType.EVENT,
        name: this.name,
        action: action
    }));
}