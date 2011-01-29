function GameModel()
{
	var self = this;
	var players = new Array();
	var fieldX = 500;
	var fieldY = 500;
	var playerSpeed = 10;
	var playerTurnAngle = 15;
	var lastUpdate;
	
	self.addPlayers(newPlayers)
	{
	}
	
	self.update = function(dt)
	{
		// update the game state
		for (actor in players)
		{
			// update the actor position based on desired action
			
		}
		return players;
	}
	
	
	self.calculatePlayerPosition = function(actor, action, dt)
	{
		// turn
		if (action == 1)
		{
			// turn left
			actor.direction -= playerTurnAngle*dt;
		}
		else if (action == 2)
		{
			// turn right
			actor.direction += playerTurnAngle*dt;
		}
		// move forward
		actor.location.x += playerSpeed * cos(actor.direction);
		actor.location.y += playerSpeed * sin(actor.direction);
		// TODO: detect collisions
		return {newLoc:location, newDir:direction};
	}
}

function Actor()
{
	var self = this;
	self.location = {x:0.0,y:0.0};
	self.direction = 0.0;
}

var gm = new GameModel(dt);
gm.update();