function Logger(name)
{
	var self=this;
	function log(severity, msg, moreInfo)
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
		
		if (moreInfo != null && typeof moreInfo != "undefined")
		{
			sb.append("\n");
			try
			{
				sb.append(JSON.stringify(moreInfo));
			}
			catch (err)
			{
				//don't care
			}
		}
		
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
	
	self.debug = function(msg, moreInfo)
	{log("Debug", msg, moreInfo);}
	self.error = function(msg, moreInfo)
	{log("Error", msg, moreInfo);}
	self.info = function(msg, moreInfo)
	{log("Info ", msg, moreInfo);}
	self.warn = function(msg, moreInfo)
	{log("Warn ", msg, moreInfo);}
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