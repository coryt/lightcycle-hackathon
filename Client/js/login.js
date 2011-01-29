login = function() {
	var nickname = document.getElementById('nickname').value;
	var colourList = document.getElementById('colour');	
	var colour = colourList.options[colourList.selectedIndex].value;
	var server = document.getElementById('server').value;

	document.location.href = 'play.html?nickname=' + nickname + '&colour=' + colour + '&server=' + server;
		
	return false; // avoid postback
};