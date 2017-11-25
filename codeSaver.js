var saveButton = document.getElementById("saveButton");
saveButton.onclick = function () {
	let fileName = prompt("File Name?");
	if (fileName == null) {
		return;
	}
	for (let i = 0; i < codeBoxArr.length; ++i) {
		codeBoxArr[i][7] = codeBoxArr[i][1].value
		codeBoxArr[i][5] = codeBoxArr[i][0].style.left;
		codeBoxArr[i][6] = codeBoxArr[i][0].style.top;
	}
	localStorage.setItem(fileName, JSON.stringify(codeBoxArr));
};

var loadButton = document.getElementById("loadButton");
loadButton.onclick = function () {
	let fileName = prompt("File Name?");
	if (fileName == null) {
		return;
	}
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
			space.removeChild(myDiv);
		}
	}
	codeBoxArr = JSON.parse(stringArr);

	for (let i = 0; i < codeBoxArr.length; ++i) {
		
		codeBoxArr[i][0] = document.createElement("div");
		codeBoxArr[i][1] = document.createElement("textarea");

		codeBoxArr[i][0].id = "" + i;
		codeBoxArr[i][0].className = codeBoxArr[i][2] + "_box";

		makeDraggable(codeBoxArr[i][0]);

		codeBoxArr[i][1].className = codeBoxArr[i][2] + "_code";

		codeBoxArr[i][1].value = codeBoxArr[i][8];
			
		codeBoxArr[i][0].appendChild(codeBoxArr[i][1]);
		space.appendChild(codeBoxArr[i][0]);

		codeBoxArr[i][0].style.left = codeBoxArr[i][6];
		codeBoxArr[i][0].style.top = codeBoxArr[i][7];

		if (codeBoxArr[i][3] === null) {
			codeBoxArr[i][3] = -1;
		}
		if (codeBoxArr[i][4] === null) {
			codeBoxArr[i][4] = -1;
		}
	}
};