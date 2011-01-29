//Helps with using the canvas object by implementing
//double buffering and transparently maintaining
//the target framerate
function CanvasHelper(configOptions)
{
	var self=this;
	
	var MAX_FPS = 60;
	
	var _onDrawCB = null;
	var _targetFPS = 60;
	var _actualFPS = 0;
	var _frameCount = 0;
	
	var _targetCanvas = null;
	var _targetCanvasContext = null;
	var _targetCanvasWidth = 800;
	var _targetCanvasHeight = 600;
	
	var _offscreenCanvas = null;
	var _offscreenCanvasContext = null;
	var _offscreenCanvasWidth = 800;
	var _offscreenCanvasHeight = 600;
	
	var _updateFrameRateInterval = null;
	var _drawFrameInterval = null;
	
	function updateFrameRate()
	{
		_actualFPS = _frameCount / 5;
		_frameCount = 0;
	}
	
	function updateDrawFrameInterval()
	{
		if (_drawFrameInterval)
		{
			try
			{
				clearTimeout(_drawFrameInterval);
			}
			catch (err)
			{}
		}
		try
		{
			_drawFrameInterval = setInterval(drawFrame, 1000/_targetFPS);
		}
		catch (err)
		{
		
		}
	}
	
	//draws a frame then copies it to the main canvas
	function drawFrame()
	{
		_frameCount ++;
		try
		{
			if (_onDrawCB && _offscreenCanvasContext)
			{
				_onDrawCB(_offscreenCanvasContext);
			}
		}
		catch (err)
		{}
		try
		{
			if (_targetCanvasContext)
			{
				_targetCanvasContext.drawImage(_offscreenCanvas, 0, 0, _targetCanvasWidth, _targetCanvasHeight);
			}
		}catch (err)
		{}
	}
	
	//Sets a callback that will be called on a periodic basis
	//This function will be called such that the display is updated
	//at the target FPS assuming the device is capable of that.
	// void callback(context);
	self.onDraw = function(callback)
	{
		_onDrawCB = callback;
	}
	
	//Returns the actual framerate (measured every 5s).  
	//Calling this function with a value will set the target framerate
	self.FPS = function(targetValue)
	{
		if (targetValue)
		{
			_targetFPS = Math.min(MAX_FPS, Number(_targetFPS));
			updateDrawFrameInterval();
		}
		return _actualFPS;
	}
	
	//Sets the target canvas context where draw operations will be copied to
	//optionaly specify the width and height of the drawing context (default 800x600)
	self.target = function(canvas, width, height)
	{
		_targetCanvas = canvas;
		if (!_targetCanvas || !_targetCanvas.getContext)
		{
			return;
		}
		_targetCanvasContext = _targetCanvas.getContext("2d");
		if (!_targetCanvasContext)
		{
			throw ("Could not find graphics context");
		}
		if (width || height)
		{
			self.targetSize(width, height);
		}
	}
	
	//sets the pixel size of the actual canvas
	self.targetSize = function(width, height)
	{
		if (width || height)
		{
			_targetCanvasWidth = Math.max(1, Number(width));
			_targetCanvasHeight = Math.max(1, Number(height));
		}
		var result = 
		{
			"width" : _targetCanvasWidth,
			"height" : _targetCanvasHeight
		}
		return result;
	}

	
	//sets the pixel size of the offscreen buffer
	self.offscreenSize = function(width, height)
	{
		if (width || height)
		{
			_offscreenCanvasWidth = Math.max(1, Number(width));
			_offscreenCanvasHeight = Math.max(1, Number(height));
			_offscreenCanvas.width = _offscreenCanvasWidth;
			_offscreenCanvas.height = _offscreenCanvasHeight;
		}
		var result = 
		{
			"width" : _offscreenCanvasWidth,
			"height" : _offscreenCanvasHeight
		}
		return result;
	}
		
	//sets up initial options
	function init(configOptions)
	{
		_offscreenCanvas = document.createElement("canvas");
		if (!_offscreenCanvas || !_offscreenCanvas.getContext)
		{
			throw ("Could not create canvas element");
		}
		_offscreenCanvasContext = _offscreenCanvas.getContext("2d");
		if (!_offscreenCanvasContext)
		{
			throw ("Could not fetch graphics context");
		}
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
		_updateFrameRateInterval = setInterval(updateFrameRate, 5000);
		updateDrawFrameInterval();
	}
	init(configOptions);
}
