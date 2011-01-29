function GameModel(playerArray)
{
	var self = this;
	var players = initPlayers(playerArray);
	var trails = new Array();
	var radius = 500;
	var playerSpeed = 10;
	var playerTurnAngle = 15;
	var nextScoreTime;
	var scorePeriod = 1000;
	
	function initPlayers(playersArray)
	{
		p = new Array();
		// import player data
		for (serverPlayer in playersArray)
		{
			var gamePlayer = new Actor();
			gamePlayer.id = serverPlayer.id;
			gamePlayer.direction = 0.0;
			gamePlayer.location = new Vector(0.0,0.0);
			gamePlayer.status = 1;
			
			p.push(gamePlayer);
		}
		return p;
	}
	
	self.update = function(dt)
	{
		var theTime = new Date().getTime();
		
		// update the game state
		for (actor in players)
		{
			if (actor.status == 1)
			{
				// update the actor position based on desired action
				actor = calculatePlayerPosition(actor, dt);
				if (actor.status == 0)
				{
					// player has died
				}
			}
			if(theTime > nextScoreTime)
			{
				actor.score += 1;
				nextScoreTime += score_period;
			}
		}
		return players;
	};
	
	
	function calculatePlayerPosition(actor, dt)
	{
		// turn
		var dir;
		if (actor.action == 1)
		{
			// turn left
			dir = actor.direction - playerTurnAngle*dt;
		}
		else if (actor.action == 2)
		{
			// turn right
			dir = actor.direction + playerTurnAngle*dt;
		}
		// move forward
		var finalPos = new Vector(actor.location.x + playerSpeed * dt * cos(dir),
		actor.location.y + playerSpeed * dt * sin(dir));
		// TODO: detect collisions
		var newSeg = new Segment(actor.location, finalPos);
		if(outOfBounds(actor))
		{
			actor.status = 0;
			return actor;
		}
		for (seg in trails)
		{
			if(intersect(newSeg, seg))
			{
				// player has crashed!
				actor.status = 0;
			}
			else
			{
				trails.push(newSeg);
			}
		}
		return actor;
	}
	
	function outOfBounds(player)
	{
		var center = new Vector(radius, radius);
		var diff = center.subtract(player.location);
		return (Math.sqrt(diff.x*diff.x + diff.y*diff.y) >= radius);
	}
};

function Segment(p1, p2){
  this.p1 = p1;
  this.p2 = p2;
}

// the cross product of vectors v1 and v2.
function cross(v1, v2) {
	return v1.x * v2.y - v2.x * v1.y;
}
	
var epsilon = 10e-6;

function intersect(seg1, seg2) {
	p = seg1.p1;
	r = seg1.p2.subtract(seg1.p1);
	q = seg2.p1;
	s = seg2.p2.subtract(seg2.p1);
	rCrossS = cross(r, s);
	if(rCrossS <= epsilon && rCrossS >= -1 * epsilon){
		return false;
	}
	t = cross(q.subtract(p), s)/rCrossS;
	u = cross(q.subtract(p), r)/rCrossS;
	if(0 <= u && u <= 1 && 0 <= t && t <= 1){
		intPoint = p.add(r.scalarMult(t));
		return true;
	}else{
		return false;
	}
}

function Vector(x, y){
  this.x = x;
  this.y = y;
  this.color = '#000';
  this.draw = function() {
	var canvas = getCanvas();
	context = canvas.getContext('2d');
	context.strokeStyle = this.color; //black
	context.fillRect(this.x, this.y, 5, 5);

  };
  this.scalarMult = function(scalar){
	  return new Vector(this.x * scalar, this.y * scalar);
  }
  this.dot = function(v2) {
	return this.x * v2.x + this.y * v2.y;
  };
  this.perp = function() {
	return new Vector(-1 * this.y, this.x);
  };
  this.subtract = function(v2) {
	return this.add(v2.scalarMult(-1));//new Vector(this.x - v2.x, this.y - v2.y);
  };
  this.add = function(v2) {
	  return new Vector(this.x + v2.x, this.y + v2.y);
  }
}

function Actor()
{
	var self = this;
	self.id = "";
	self.location = new Vector(0,0);
	self.direction = 0.0;
	self.action = 0;
	self.status = 0;
	self.points = 0;
}