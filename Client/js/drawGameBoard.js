function drawGameBoard(context)
{
	context.save();
	context.globalAlpha = 1;
	context.globalCompositeOperation = "source-over";
	context.clearRect(0,0,800,800);
	context.fillStyle = "#ffffff";
	context.beginPath();
	context.arc(400, 400, 400, 0, Math.PI *2, true);
	context.closePath();	
	context.fill();
	
	context.strokeStyle = "#eeeeee";
	context.lineWidth = 3;
	context.stroke();

	context.globalCompositeOperation = "source-atop";
	
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
	
	context.restore();
	}