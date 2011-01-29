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
    console.log('connect: ' + name);
    this.connection.send(JSON.stringify({
        Name: name,
        Color: color
    }))
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
    if (this.onMessage) {
        var obj = JSON.parse(e.data);
        this.onMessage(obj);
    }
}

ServerConn.prototype.isActive = function() {
    return this.connection.readyState == 1;
}

ServerConn.prototype.send = function(obj) {
    return this.connection.send(obj);
}