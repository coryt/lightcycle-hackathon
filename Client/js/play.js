function play_init()
{
	// width of div.page in play.css
	var defaultWidth = 350;
	
	// height of title (h1) + clock (h2) + padding + borders
	// add one so that we can see the bottom border
	var defaultHeight = 113 + 1;
	
	var width = window.innerWidth - defaultWidth;
	var height = window.innerHeight - defaultHeight;
	
	var canvasSize = height;
	
	if( width < height )
	{
		canvasSize = width;
	}
	
	var canvas = document.getElementById("canvas");
	canvas.style.width = canvasSize + "px";
	canvas.style.height = canvasSize + "px";
	
	var playerInfo = document.getElementById("playerInfo");
	playerInfo.style.height = canvasSize + "px";
	
	var page = document.getElementById("page");
	var totalSize = defaultWidth + canvasSize;
	page.style.width = totalSize + "px";
	
	var title = document.getElementById("title");
	title.style.width = totalSize + "px";
	
	// Canvas initialization.
	var canvasHelper = new CanvasHelper({
		onDraw:drawTest,
		FPS:30,
		offscreenSize:
		{
			width:800,
			height:800
		},
		target:document.getElementById("canvas"),
		targetSize:
		{
			width:800,
			height:800
		}
	});
	setInterval(function(){
		document.getElementById("fps").innerHTML = canvasHelper.FPS();
	}, 1000);
	
	// Now that we have everything sized properly, show the game.
	document.getElementById("loadingMessage").style.display = "none";
	title.style.display = "block";
	page.style.display = "block";
}

function drawTest(context)
{
	context.strokeStyle = "#000000";
	context.fillStyle = "#FFFF00";
	context.beginPath();
	context.arc(100,100,50,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
}