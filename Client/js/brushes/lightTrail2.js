function gameDisplay()
{
	var self = this;
	var lines ={};
	var pointAges = {};
	var colors = {};
	var rotation = {};
	
	var lightCycle = new Image();
	lightCycle.src =  "images/lightcycle.png";
	
	self.setColor = function(name, color)
	{
		colors[name] = color;
	}
	
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
	
	self.removePoints = function(name)
	{
		lines[name] = [];
	}
	
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
	
	function drawPlayer(context, name)
	{
		context.save();		
		context.strokeStyle = colors[name];
		context.lineWidth = 4;
		context.lineCap = "round";
		context.lineJoin = "round";
		var line = lines[name];
		if (line.length > 3)
		{
			context.beginPath();
			context.moveTo(line[0].x, line[0].y);
			for(var i=1;i<line.length - 2;i=i+2)
			{
				context.quadraticCurveTo(line[i].x, line[i].y, line[i+1].x, line[i+1].y);
			}
			
			var percent = Math.min(1, (new Date().getTime() - pointAges[name])/200);
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
			context.translate(lx, ly);
			
			context.rotate(whatAngle);			
			context.translate(-20, -5);
            context.drawImage(lightCycle, 0,  0, 30, 12);			
			context.restore();
		}		
		context.restore();
	}
	
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
		speed=10;
	}
	
	function step()
	{
		//this random function has a clockwise bias.  This is intentional as it gives more
		//interesting paths
		var maxDR = 15;
		var bias = 0.55;
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
	setInterval(step, 200);
}