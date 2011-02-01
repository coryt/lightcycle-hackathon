var _wallColorSpeed = .1;
var _wallColorPercent = 0;
var _wallColorDirection = _wallColorSpeed;

function drawGameBoard(context)
{
	_wallColorPercent += _wallColorDirection;
	if (_wallColorPercent > 1)
	{
		_wallColorPercent = 1;
		_wallColorDirection = -_wallColorSpeed;
	}
	else if (_wallColorPercent < 0)
	{
		_wallColorPercent = 0;
		_wallColorDirection = _wallColorSpeed;
	}
	var wcp = _wallColorPercent;
	
	context.save();
	context.globalAlpha = 1;
	context.globalCompositeOperation = "source-over";
	context.clearRect(0,0,800,800);
	context.fillStyle = "#ffffff";
	context.beginPath();
	context.arc(400, 400, 400, 0, Math.PI *2, true);
	context.closePath();	
	context.fill();
	
	context.globalCompositeOperation = "source-atop";
	context.fillStyle = "#000000";
	context.fillRect(0,0, 800, 800);

	var lc1 = {r:0,g:30,b:30};
	var lc2 = {r:0,g:20,b:20};
	context.strokeStyle = "rgb("+Math.ceil(tween(lc1.r, lc2.r, wcp))+","+Math.ceil(tween(lc1.g, lc2.g, wcp))+","+Math.ceil(tween(lc1.b,lc2.b,wcp))+")";	
	context.lineWidth = 3;
	for (var i=0;i< 20;i++)
	{
		var d = i*(800/20);
		context.beginPath();
		context.moveTo(0, d);
		context.lineTo(800, d);
		context.closePath();
		context.stroke();
		context.beginPath();
		context.moveTo(d, 0);
		context.lineTo(d, 800);
		context.closePath();
		context.stroke();
	}

	//Todo refactor this function so that it has it's own private space for variables
	var wc1 = {r:120,g:160,b:160};
	var wc2 = {r:120,g:255,b:255};
	context.strokeStyle = "rgb("+Math.ceil(tween(wc1.r, wc2.r, wcp))+","+Math.ceil(tween(wc1.g, wc2.g, wcp))+","+Math.ceil(tween(wc1.b,wc2.b,wcp))+")";
	context.lineWidth = 5;	
	context.beginPath();
	context.arc(400, 400, 398, 0, Math.PI *2, true);
	context.closePath();	
	context.stroke();
	
	context.restore();
	}
	
	function tween(value1, value2, percent)
	{
		return (value1 * percent) + (value2 * (1-percent));
	}