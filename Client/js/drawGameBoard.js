function drawGameBoard(context)
{
	context.save();
	
	//draw stuff here
	context.fillStyle = "#000000";
	context.fillRect(0,0, 800, 800);
	
	context.strokeStyle = "#001111";
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
	context.globalCompositeOperation = "destination-in";
	context.beginPath();
	context.arc(400, 400, 400, 0, Math.PI *2, false);
	context.closePath();
	
	context.fill();
	context.globalCompositeOperation = "source-over";
	context.strokeStyle = "#eeeeee";
	context.lineWidth = 3;
	context.stroke();
	
	context.restore();
	}