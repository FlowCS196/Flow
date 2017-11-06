var currentlyDragged = null;;
var mouseX = 0;
var mouseY = 0;
var offsetX = 0;
var offsetY = 0;
window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousemove", moveBox, false);

function makeDraggable(box) {
    box.addEventListener("mousedown", function () {return mouseDown(box);}, false);
    if (!box.style.left) {
        box.style.left = "0px";
    }
    if (!box.style.top) {
        box.style.top = "0px";
    }
}

function mouseDown(box) {
    currentlyDragged = box;
    offsetX = -mouseX + parseInt(box.style.left.substring(0, box.style.left.length - 2));
    offsetY = -mouseY + parseInt(box.style.top.substring(0, box.style.top.length - 2));
}

function mouseUp(e) {
    if (currentlyDragged == null) {
        return;
    }
    if (parseInt(currentlyDragged.style.left.substring(0, currentlyDragged.style.left.length-2)) < -80 || parseInt(currentlyDragged.style.top.substring(0, currentlyDragged.style.top.length-2)) < -30) {
        removeBox(currentlyDragged.id);
    }
    currentlyDragged = null;
}

function moveBox(e) {
    mouseX = e.screenX;
    mouseY = e.screenY;
    if (currentlyDragged) {
        currentlyDragged.style.top = mouseY + offsetY + "px";
        currentlyDragged.style.left = mouseX + offsetX + "px";
    }
}
