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

window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousemove", moveStuff, false);
window.addEventListener("keydown", deleteBox, false);
codeArea.addEventListener("mousedown", startScrolling, false);

function makeDraggable(box) {
    box.addEventListener("mousedown", function () {return mouseDown(box);}, false);
    if (!box.style.left) {
        box.style.left = "0px";
    }
    if (!box.style.top) {
        box.style.top = "0px";
    }
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
    if (!currentlyDragged) {
        currentlyScrolling = true;
        scrollStartX = mouseX;
        scrollStartY = mouseY;
    }
}


function mouseDown(box) {
    currentlyDragged = box;
    offsetX = -mouseX + parseFloat(box.style.left.substring(0, box.style.left.length - 2));
    offsetY = -mouseY + parseFloat(box.style.top.substring(0, box.style.top.length - 2));
}

function mouseUp(e) {
    if (currentlyDragged == null) {
        currentlyScrolling = false;
        return;
    }
    let left = parseFloat(currentlyDragged.style.left.substring(0, currentlyDragged.style.left.length-2));
    let top = parseFloat(currentlyDragged.style.top.substring(0, currentlyDragged.style.top.length-2));
    let boxWidth = currentlyDragged.offsetWidth;
    let boxHeight = currentlyDragged.offsetHeight;
    let areaWidth = codeArea.offsetWidth;
    let areaHeight = codeArea.offsetHeight;

    if (left < codeArea.scrollLeft) {
        currentlyDragged.style.left = codeArea.scrollLeft + "px";
    }
    if (top < codeArea.scrollTop) {
        currentlyDragged.style.top = codeArea.scrollTop + "px";
    }
    if (left + boxWidth > areaWidth + codeArea.scrollLeft) {
        currentlyDragged.style.left = areaWidth + codeArea.scrollLeft - boxWidth + "px";
    }
    if (top + boxHeight > areaHeight + codeArea.scrollTop) {
        currentlyDragged.style.top = areaHeight + codeArea.scrollTop - boxHeight + "px";
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
