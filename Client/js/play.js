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
	
	var bgCanvas = document.getElementById("backgroundCanvas");
	bgCanvas.style.width = canvasSize + "px";
	bgCanvas.style.height = canvasSize + "px";
	
	var fgCanvas = document.getElementById("foregroundCanvas");
	fgCanvas.style.width = canvasSize + "px";
	fgCanvas.style.height = canvasSize + "px";
	
	var playerInfo = document.getElementById("playerInfo");
	playerInfo.style.height = canvasSize + "px";
	
	var page = document.getElementById("page");
	var totalSize = defaultWidth + canvasSize;
	page.style.width = totalSize + "px";
	
	var title = document.getElementById("title");
	title.style.width = totalSize + "px";
	
	// Canvas initialization.
	var canvasHelper = new CanvasHelper({
		onDraw:drawGameBoard,
		FPS:30,
		offscreenSize:
		{
			width:800,
			height:800
		},
		target:document.getElementById("backgroundCanvas"),
		targetSize:
		{
			width:800,
			height:800
		}
	});
	setInterval(function(){
		document.getElementById("fps").innerHTML = canvasHelper.FPS();
	}, 1000);
	
	//console.log(document.getElementById("canvas").getContext("2d"));
	var lt = new lightTrail(document.getElementById("foregroundCanvas").getContext("2d"), [0,0,0]);
	lt.strokeStart(10,10);
	lt.stroke(100,100);	
	lt.stroke(90,75);
	
	// Player name and color initialization.
	var tmpPlayer = new Player({
		Nickname: queryString("nickname"),
		Colour: queryString("colour"),
		StartX: 0,
		StartY: 0
	});
	
	var pName = document.getElementById('p-name');
	var pKills = document.getElementById('p-kills');
	var pPoints = document.getElementById('p-points');
	pName.innerHTML = tmpPlayer.GetNickname();
	pName.style.color = "#" + tmpPlayer.GetColour();
	pKills.style.color = "#" + tmpPlayer.GetColour();
	pPoints.style.color = "#" + tmpPlayer.GetColour();
	
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