var saveButton = document.getElementById("save");
saveButton.onclick = function () {
	var str = document.getElementById("textbox").value;
	var saveButton = document.getElementById("save");
	var link = document.createElement("a");
	//Check if the download feature is supported (Not in Internet Explorer)
	if (typeof link.download != "undefined") {
	link.download = "diagram.txt";
	link.href = "data:text/plain;charset=UTF-8," + str);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	} else {
		window.open("data:application/text/plain;charset=UTF-8," + str);
	}
	delete link;
}