//Helps with using the canvas object by implementing
//double buffering and transparently maintaining
//the target framerate
function CanvasHelper(configOptions)
{
	var self=this;
	
	//Sets a callback that will be called on a periodic basis
	//This function will be called such that the display is updated
	//at the target FPS assuming the device is capable of that.
	// void callback(context);
	self.onDraw = function(callback)
	{
	
	}
	
	//Returns the actual framerate (measured every 5s).  
	//Calling this function with a value will set the target framerate
	self.FPS = function(targetValue)
	{
	
	}
	
	//Sets the target canvas context where draw operations will be copied to
	//optionaly specify the width and height of the drawing context (default 800x600)
	self.target = function(canvas, width, height)
	{
	
	}
	
	//sets the pixel size of the actual canvas
	self.targetSize = function(width, height)
	{
	
	}

	
	//sets the pixel size of the offscreen buffer
	self.offscreenSize = function(width, height)
	{
	
	
	}
		
	//sets up initial options
	function init(configOptions)
	{
		if (configOptions)
		{
			if (configOptions.onDraw)
			{
				self.onDraw(configOptions.onDraw);
			}
			if (configOptions.FPS)
			{
				self.FPS(configOptions.FPS);
			}
			if (configOptions.offscreenSize)
			{
				self.offscreenSize(configOptions.offscreenSize.width, configOptions.offscreenSize.height);
			}
			if (configOptions.target)
			{
				self.target(configOptions.target);
			}
			if (configOptions.targetSize)
			{
				self.targetSize(configOptions.targetSize.width, configOptions.targetSize.height);
			}
		}
	}
	init(configOptions);
}
