// Example: 
// var myPlayer = new Player({ Nickname: 'John', Colour: 'Red', StartX : 50, StartY: 50 });
// myPlayer.SetCoord({X: 50, Y: 70});
this.Player = function (initialProperties) {
	var self = this;
	var nickname, colour, coord, kills, points;	

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
		
	//sets up initial options
	function init(initialProperties) {
		self.nickname = initialProperties.Nickname;
		self.colour = initialProperties.Colour;
		self.coord = { X: initialProperties.StartX, Y: initialProperties.StartY };
		self.kills = 0;
		self.points = 0;	
	}
	init(initialProperties);
}

//var myPlayer = new Player({ Nickname: 'John', Colour: 'Red', StartX : 50, StartY: 50 });
//myPlayer.SetCoord({X: 50, Y: 70});
//alert(myPlayer.GetCoord());
//alert(myPlayer.GetNickname());