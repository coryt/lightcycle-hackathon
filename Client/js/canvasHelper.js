//Helps with using the canvas object by implementing
//double buffering and transparently maintaining
//the target framerate
function CanvasHelper(configOptions)
{
	var self=this;
	var log = new Logger("CanvasHelper");
	
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
	
	var _clearFrameOnCopy = true;
	
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
			{
				log.error("Could not clear draw frame interval",err);
			}
		}
		try
		{
			_drawFrameInterval = setInterval(drawFrame, 1000/_targetFPS);
		}
		catch (err)
		{
			log.error("Could not create draw frame interval",err);
		}
		drawFrame();
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
		{
			log.error("An erro occured while drawing the frame", err);
		}
		try
		{
			if (_targetCanvasContext)
			{
				if (_clearFrameOnCopy)
				{
					_targetCanvasContext.clearRect(0,0, 800, 800);
				}
				_targetCanvasContext.drawImage(_offscreenCanvas, 0, 0, _targetCanvasWidth, _targetCanvasHeight);
			}
		}catch (err)
		{
			log.error("An error occured while updating the main canvas",err);
		}
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
			_targetFPS = Math.max(0.1, Math.min(MAX_FPS, Number(targetValue)));
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
			log.error("Could not find main canvas graphics context");
			throw ("Could not find main canvas graphics context");
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
			log.error("Could not create offscreen canvas element");
			throw ("Could not create offscreen canvas element");
		}
		_offscreenCanvasContext = _offscreenCanvas.getContext("2d");
		if (!_offscreenCanvasContext)
		{
			log.error("Could not fetch offscreen graphics context"); 
			throw ("Could not fetch offscreen graphics context");
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
