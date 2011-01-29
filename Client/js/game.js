function foo()
{
	var canvasHelper = new CanvasHelper({
		onDraw:drawGame,
		FPS:30,
		offscreenSize:
		{
			width:800,
			height:600
		}
		target:$("#gamecanvas").get(0)
		targetSize:
		{
			width:800,
			height:600
		}
	});
}