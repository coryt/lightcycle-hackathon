var PlayerStatus = {
    ALIVE: 1,
    DEAD: 2
};

// Example: 
// var myPlayer = new Player({ ID: 1234, Nickname: 'John', Status: PlayerStatus.ALIVE, Colour: 'ff0000', Direction: 180, StartX : 50, StartY: 50 });
// myPlayer.SetPosition({X: 50, Y: 70});
this.Player = function (initialProperties) {
	var self = this;
	var id, nickname, colour, position, kills, points, state, direction;

	this.GetID = function() {
		return self.id;
	};
	
	this.SetPosition = function(newPosition) {
		self.position.X = newPosition.X;
		self.position.Y = newPosition.Y;
	};
	
	this.GetPosition = function() {
		return self.position;
	};
	
	this.GetNickname = function() {
		return self.nickname;
	};
	
	this.SetColour = function(newColour) {
		self.colour = newColour;
	};
	
	this.GetColour = function() {
		return self.colour;
	};
		
	this.IncreasePoints = function(additionalPoints) {
		self.points += additionalPoints;
	};
	
	this.GetPoints = function() {
		return self.points;
	};

	this.IncreaseKills = function(additionalKills) {
		self.kills += additionalKills;		
	};
	
	this.GetKills = function() {
		return self.kills;
	};	
	
	this.SetState = function(newState) {
		self.state = newState;
	};
	
	this.GetState = function() {
		return self.state;
	};
	
	// Degrees
	this.SetDirection = function(newDirection) {
		self.direction = newDirection;
	};
	
	this.GetDirection = function() {
		return self.direction;
	};

	this.UpdateAll = function(newProperties) {
		self.id = newProperties.ID;
		self.nickname = newProperties.Nickname;
		self.colour = newProperties.Colour;
		self.position = { X: newProperties.StartX, Y: newProperties.StartY };
		self.state = newProperties.Status;
		self.direction = newProperties.Direction;		
		self.kills = 0;
		self.points = 0;
	}
	
	// Initialize by updating all
	this.UpdateAll(initialProperties);
}

