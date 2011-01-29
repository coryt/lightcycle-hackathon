var MessageStatus = {
	INPROGRESS: 1,
	WAITING: 2,
	CLOSED: 3
};

this.Message = function (initialProperties) {
	var self=this;
	var status, players;
	
	this.GetStatus = function() {
		return self.status;
	};
	
	this.GetPlayers = function() {
		return self.players;
	};
	
	//sets up initial options
	this.UpdateAll = function(newProperties) {
		self.status = newProperties.Status;
		self.players = new Array();

		if (typeof newProperties.Players == "undefined") return;

		for (var i = 0; i < newProperties.Players.length; i ++) {
			self.players.push(new Player(newProperties.Players[i]));
		}	
	}
	
	// Initialize by updating all
	this.UpdateAll(initialProperties);
}

