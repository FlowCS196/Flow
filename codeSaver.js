function stringHexer(str) {
	let saveString = ""
	for (let i = 0; i < str.length; ++i) {
		let hex = "" + str.charCodeAt(i).toString(16);
		let prefix = "";
		for (let j = hex.length; j < 4; ++j) {
			prefix += '0';
		}
		saveString += prefix + hex;
	}
	return saveString;
}

function hexStringer(str) {
    let loadString = ""
    for (let i = 0; i < str.length - 3; i += 4) {
	    loadString += String.fromCharCode(parseInt('0x' + str[i] + str[i+1] + str[i+2] + str[i+3]));
    }
    return loadString;
}

var saveButton = document.getElementById("saveButton");
saveButton.onclick = function () {
	for (let i = 0; i < codeBoxArr.length; ++i) {
		codeBoxArr[i][8] = codeBoxArr[i][1].value
	}
	let fileName = prompt("File Name?");
	document.cookie = stringHexer(fileName) + "=" + stringHexer(JSON.stringify(codeBoxArr)) + ";expires=Tue, 19 Jan 2038 03:14:07 UTC"
};

var loadButton = document.getElementById("loadButton");
loadButton.onclick = function () {
	let stringArr = "";
	let fileName = stringHexer(prompt("File Name?"));
	let myCookies = document.cookie.split(";");
	for (let i = 0; i < myCookies.length; ++i) {
		let thisCookie = myCookies[i].split("=");
		if (thisCookie[0] == fileName) {
			stringArr = hexStringer(thisCookie[1]);
			break;
		}
	}
	if (stringArr == "") {
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