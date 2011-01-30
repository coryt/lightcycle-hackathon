//draws the light racers on the screen
function gameDisplay()
{
	var self = this;
	var lines ={};
	var pointAges = {};
	var colors = {};
	var rotation = {};
	var lastRotation = {};
	
	var lightCycle = new Image();
	lightCycle.src =  "images/lightcycle.png";
	
	//sets the color of a named player
	self.setColor = function(name, color)
	{
		colors[name] = color;
	}
	
	//adds a waypoint to the named player
	self.addPoint = function (name, x, y, r)
	{
		var line = lines[name];		
		if (!line)
		{
			line = [];
			lines[name] = line;			
		}
		pointAges[name] = (new Date()).getTime();
		rotation[name] = r;
		line.push({"x":x,"y":y});
	}
	
	//removes all the waypoints for the named player
	self.removePoints = function(name)
	{
		lines[name] = [];
	}
	
	//a function to determine the angle between two points
	//it's not very accurate when the distance between the points is small
	function determineAngle(x1,y1,x2,y2)
	{
		var quarter = Math.PI/2;
		var angle = 0;
		try
		{
			var dx = x2-x1;
			var dy = y2-y1;
						
			if (dy == 0)
			{
				angle=dx>0?0:Math.PI;
			}
			else
			{
				angle=Math.atan(Math.abs(dx/dy));
			}
			if (dx < 0 && dy > 0)
			{angle+=quarter;}
			else if (dx < 0 && dy < 0)
			{angle+=quarter*2;}
			else if (dx > 0 && dy < 0)
			{angle+=quarter*3;}			
		}
		catch (err)
		{}
		angle = angle ? angle : 0;
		angle = Math.max(0, angle);
		angle = Math.min(Math.PI * 2, angle);
		return angle;
	}
	
	//Draws a single player's light trail and light cycle
	function drawPlayer(context, name)
	{
		context.save();		
		context.strokeStyle = colors[name];
		context.lineWidth = 4;
		context.lineCap = "round";
		context.lineJoin = "round";
		var line = lines[name];
		//wait till we have three points before we start drawing so we can make the lines smoother with curves
		if (line.length > 3)
		{
			context.beginPath();
			
			context.moveTo(line[0].x, line[0].y);
			for(var i=1;i<line.length - 2;i=i+2)
			{
				context.quadraticCurveTo(line[i].x, line[i].y, line[i+1].x, line[i+1].y);
			}
			
			var percent = Math.min(1, (new Date().getTime() - pointAges[name])/250);
			var invPercent = 1- percent;
			var l1 = line.length-1;
			var l2 = l1 -1;			
			var lx = line[l1].x;
			var ly = line[l1].y;							
			lx = (lx * percent) + (line[l2].x * invPercent);
			ly = (ly * percent) + (line[l2].y * invPercent);			
			context.quadraticCurveTo(line[line.length-2].x, line[line.length-2].y, lx, ly);
			context.moveTo(line[0].x, line[0].y);
			context.closePath();
			context.stroke();

			context.save();
			var whatAngle = rotation[name];
			if (!whatAngle)
			{
				whatAngle = determineAngle(line[l2].x, line[l2].y, lx, ly);
			}
			var lr = lastRotation[name];
			if (!lr){lr=whatAngle;}
			
			if (lr - whatAngle > Math.PI)
			{whatAngle+=Math.PI*2;}
			
			whatAngle = (whatAngle*percent) + (lr*invPercent);
			lastRotation[name]=whatAngle%(Math.PI*2);
			
			context.translate(lx, ly);			
			context.rotate(whatAngle);			
			context.translate(-20, -5);
            context.drawImage(lightCycle, 0,  0, 30, 12);			
			context.restore();
		}		
		context.restore();
	}
	
	//the draw loop for the game board
	self.draw = function(context)
	{
		context.clearRect(0,0,800, 800);
		for (var player in lines)
		{
			drawPlayer(context, player);
		}
	}
}

//creates a fake player that will travel in big circles
function fakePlayer(name, gameDisplay, color)
{
	var x=400;
	var y=400;
	var angle = 0;
	var speed=1;

	gameDisplay.setColor(name, color);
	
	function init()
	{
		x=400;
		y=400;
		angle = Math.random() * Math.PI * 2;
		speed=20;
	}
	
	//moves the player more or less in the same direction that they were heading previously
	function step()
	{
		//this random function has a clockwise bias.  This is intentional as it gives more
		//interesting paths
		var maxDR = 45;
		var bias = 0.65;
		var dr = (Math.random() * (maxDR)- (maxDR/2*bias)) / 360 * Math.PI * 2;
		angle += dr;
		angle %= Math.PI * 2;
	
		var dy = Math.sin(angle) * speed;
		var dx = Math.cos(angle) * speed;
				
		x+= dx;
		y+= dy;		
		
		var xs = (x-400);
		var ys = (y-400);
		if (xs*xs+ys*ys > 160000)
		{
			init();
			gameDisplay.removePoints(name);
		}
		
		gameDisplay.addPoint(name, x, y, angle);
	}
	
	init();
	setInterval(step, 250);
}