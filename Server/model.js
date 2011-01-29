function GameModel()
{
	var self = this;
	var players = new Array();
	var radius = 500;
	var playerSpeed = 10;
	var playerTurnAngle = 15;
	var lastUpdate;
	
	self.update = function(dt)
	{
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
		}
		return players;
	}
	
	
	self.calculatePlayerPosition = function(actor, dt)
	{
		// turn
		if (actor.action == 1)
		{
			// turn left
			actor.direction -= playerTurnAngle*dt;
		}
		else if (actor.action == 2)
		{
			// turn right
			actor.direction += playerTurnAngle*dt;
		}
		// move forward
		actor.location.x += playerSpeed * dt * cos(actor.direction);
		actor.location.y += playerSpeed * dt * sin(actor.direction);
		// TODO: detect collisions
		
		return actor;
	}
}

function Actor()
{
	var self = this;
	self.id = "";
	self.location = {x:0.0,y:0.0};
	self.direction = 0.0;
	self.action = 0;
	self.status = 0;
}