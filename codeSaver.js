var saveButton = document.getElementById("saveButton");
saveButton.onclick = function () {
	for (let i = 0; i < codeBoxArr.length; ++i) {
		codeBoxArr[i][8] = codeBoxArr[i][1].value
	}
	let fileName = prompt("File Name?");
	localStorage.setItem(fileName, JSON.stringify(codeBoxArr));
};

var loadButton = document.getElementById("loadButton");
loadButton.onclick = function () {
	let fileName = prompt("File Name?");
	let stringArr = localStorage.getItem(fileName);
	if (stringArr === null) {
		alert("No such file exists. Did you type correctly?");
		return;
	}
	for (let i = 0; i < codeBoxArr.length; ++i) {
		let myDiv = document.getElementById("" + i);
		if (myDiv !== null) {
			while (myDiv.firstChild) {
				myDiv.removeChild(myDiv.firstChild);
			}
			document.body.removeChild(myDiv);
		}
	}
	codeBoxArr = JSON.parse(stringArr);

	for (let i = 0; i < codeBoxArr.length; ++i) {
		
		codeBoxArr[i][0] = document.createElement("div");
		codeBoxArr[i][1] = document.createElement("textarea");

		codeBoxArr[i][0].id = "" + i;
		codeBoxArr[i][0].className = codeBoxArr[i][2] + "_box";
		codeBoxArr[i][1].className = codeBoxArr[i][2] + "_code";

		codeBoxArr[i][1].value = codeBoxArr[i][8];
			
		codeBoxArr[i][0].appendChild(codeBoxArr[i][1]);
		document.body.appendChild(codeBoxArr[i][0]);

		if (codeBoxArr[i][3] === null) {
			codeBoxArr[i][3] = undefined;
		}
		if (codeBoxArr[i][4] === null) {
			codeBoxArr[i][4] = undefined;
		}
	}
};