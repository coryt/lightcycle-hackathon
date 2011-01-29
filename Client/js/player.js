// Example: 
// var myPlayer = new Player({ Nickname: 'John', Colour: 'Red', StartX : 50, StartY: 50 });
// myPlayer.SetCoord({X: 50, Y: 70});
this.Player = function (initialProperties) {
	var self = this;
	var nickname, colour, coord, kills, points, isAlive, rotation;

	this.SetCoord = function(newCoordinate) {
		self.coord.X = newCoordinate.X;
		self.coord.Y = newCoordinate.Y;
	};
	
	this.GetCoord = function() {
		return self.coord;
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
	
	this.SetIsAlive = function(newIsAlive) {
		self.isAlive = newIsAlive;
	};
	
	this.GetIsAlive = function() {
		return self.isAlive;
	};
	
	// Radians? Degrees?
	this.SetRotation = function(newRotation) {
		self.rotation = newRotation;
	};
	
	this.GetRotation = function() {
		return self.rotation;
	};
	
	//sets up initial options
	function init(initialProperties) {
		self.nickname = initialProperties.Nickname;
		self.colour = initialProperties.Colour;
		self.coord = { X: initialProperties.StartX, Y: initialProperties.StartY };
		self.kills = 0;
		self.points = 0;
		self.isAlive = true;
		self.rotation  = 0;
	}
	init(initialProperties);
}

