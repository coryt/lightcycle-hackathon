function Logger(name)
{
	var self=this;
	function log(severity, msg)
	{
		var sb = new StringBuilder();
		var now = new Date();
		
		sb.append(now.getTime());
		sb.append(" ");
		sb.append(severity);
		sb.append(" [");
		sb.append(name);
		sb.append(" ] ");
		sb.append(msg);
		
		var result = sb.toString();
		for(var i=0;i<_Loggers.length;i++)
		{
			try
			{
				_Loggers[i](result);
			}
			catch (err)
			{
				//don't care
			}
		}
	}
	
	self.debug = function(msg)
	{log("Debug", msg);}
	self.error = function(msg)
	{log("Error", msg);}
	self.info = function(msg)
	{log("Info ", msg);}
	self.warn = function(msg)
	{log("Warn ", msg);}
}

var _Loggers = [];
function AddLogger(cb)
{
	_Loggers.push(cb);
}

function ConsoleLog(message)
{
	try
	{
		if (console && console.log)
		{
			console.log(message);
		}
	}
	catch (err)
	{
		//don't care
	}
}
AddLogger(ConsoleLog);