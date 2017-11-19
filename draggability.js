var codeArea = document.getElementById("codeArea");
var scrollElement = document.getElementById("scrollElement");
var currentlyDragged = null;
var mouseX = 0;
var mouseY = 0;
var offsetX = 0;
var offsetY = 0;
var currentlyScrolling = false;
var scrollStartX = 0;
var scrollStartY = 0;
var offsetDict = {}; //top, right, bottom, left
offsetDict["f_box"] = [8, -10.919, -8, 10.919]; // 30/tan(70)
offsetDict["s_box"] = [8, 0, -8, 0];
offsetDict["c_box"] = [25.397, -25.397, -25.397, 20.711]; // (50 + (16 / √2))(√2 - 1), (50)(√2 - 1)
offsetDict["i_box"] = [8, 0, -8, 0];

window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousemove", moveStuff, false);
window.addEventListener("keydown", deleteBox, false);
codeArea.addEventListener("mousedown", startScrolling, false);

function addConnectorNodes(box) {
    let connector_receiver = document.createElement("div");
    connector_receiver.className = "connector_receiver";

    let connector_primary = document.createElement("div");
    connector_primary.className = "connector_primary";

    if (box.className == "f_box") {
        connector_receiver.style.transform = "skew(20deg)";
        connector_primary.style.transform = "skew(20deg)";
    }

    if (box.className == "c_box") {
        connector_receiver.style.left = "-13.657px"; //8 + 8/√2
        connector_receiver.style.top = "-13.657px"; //8 + 8/√2
        connector_primary.style.left = "calc(100% - 2.343px)"; //8 - 8/√2
        connector_primary.style.top = "calc(100% - 2.343px)"; //8 - 8/√2

        let connector_secondary = document.createElement("div");
        connector_secondary.className = "connector_secondary";
        box.appendChild(connector_secondary);
    }

    box.appendChild(connector_receiver);
    box.appendChild(connector_primary);
}



function makeDraggable(box) {
    box.addEventListener("mousedown", clickOnBox, false);
    box.style.left = offsetDict[box.className][3] + "px";
    box.style.top = offsetDict[box.className][0] + "px";
    addConnectorNodes(box);
}

function deleteBox(e) {
    if (e.keyCode == 8) { //backspace
        if (document.activeElement.tagName != "TEXTAREA") {
            e.preventDefault();
        }
        if (currentlyDragged) {
            currentlyDragged = removeBox(currentlyDragged.id);
        }
    }
}

function startScrolling(e) {
    if (e.button == 2) { //right-click
        return;
    }

    if (!currentlyDragged) {
        currentlyScrolling = true;
        scrollStartX = mouseX;
        scrollStartY = mouseY;
    }
}

function clickOnBox(e) {
    if (e.button != 2) { //not right-click
        startDragging(this);
    }
}

function startDragging(box) {
    currentlyDragged = box;
    offsetX = -mouseX + parseFloat(box.style.left.substring(0, box.style.left.length - 2));
    offsetY = -mouseY + parseFloat(box.style.top.substring(0, box.style.top.length - 2));
}

function mouseUp(e) {
    if (currentlyDragged == null) {
        currentlyScrolling = false;
        return;
    }
    
    var rect = currentlyDragged.getBoundingClientRect();
    console.log(rect);


    let offsets = offsetDict[currentlyDragged.className];



    let left = parseFloat(currentlyDragged.style.left.substring(0, currentlyDragged.style.left.length-2)) - offsets[3];
    let top = parseFloat(currentlyDragged.style.top.substring(0, currentlyDragged.style.top.length-2)) - offsets[0];
    let boxWidth = currentlyDragged.offsetWidth + offsets[3] - offsets[1];
    let boxHeight = currentlyDragged.offsetHeight + offsets[0] - offsets[2];

    /*let left = rect.left - 160;
    let top = rect.top - 40;
    let boxWidth = rect.width;
    let boxHeight = rect.height;
    if (currentlyDragged.className == "c_box") {
        top += 3.314; // 16/√2 - 8
    }*/

    let areaWidth = codeArea.offsetWidth;
    let areaHeight = codeArea.offsetHeight;

    
    if (left < codeArea.scrollLeft) {
        currentlyDragged.style.left = codeArea.scrollLeft + offsets[3] + "px";
    }
    if (top < codeArea.scrollTop) {
        currentlyDragged.style.top = codeArea.scrollTop + offsets[0] + "px";
    }
    if (left + boxWidth > areaWidth + codeArea.scrollLeft) {
        currentlyDragged.style.left = areaWidth + codeArea.scrollLeft - boxWidth + offsets[3] + "px";
    }
    if (top + boxHeight > areaHeight + codeArea.scrollTop) {
        currentlyDragged.style.top = areaHeight + codeArea.scrollTop - boxHeight + offsets[0] + "px";
    }
    currentlyDragged = null;
}

function moveStuff(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    if (currentlyDragged) {
        currentlyDragged.style.top = mouseY + offsetY + "px";
        currentlyDragged.style.left = mouseX + offsetX + "px";
    } else if (currentlyScrolling) {
        scrollElement.style.width = Math.max(codeArea.scrollLeft + codeArea.offsetWidth, codeArea.scrollLeft + codeArea.offsetWidth + mouseX - scrollStartX) + "px";
        scrollElement.style.height = Math.max(codeArea.scrollTop + codeArea.offsetHeight,  + codeArea.scrollTop + codeArea.offsetHeight + mouseY - scrollStartY) + "px";
        codeArea.scrollBy(mouseX - scrollStartX, mouseY - scrollStartY);
        scrollStartX = mouseX;
        scrollStartY = mouseY;
    }
}
