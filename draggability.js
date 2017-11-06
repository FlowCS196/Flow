var currentlyDragged = null;;
var mouseX = 0;
var mouseY = 0;
var offsetX = 0;
var offsetY = 0;
window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousemove", moveBox, false);

function makeDraggable(box) {
    box.addEventListener("mousedown", function () {return mouseDown(box);}, false);
}

function mouseDown(box) {
    currentlyDragged = box;
    offsetX = -mouseX + parseInt("0" + box.style.left.substring(0, box.style.left.length - 2));
    offsetY = -mouseY + parseInt("0" + box.style.top.substring(0, box.style.top.length - 2));
    console.log(offsetX);
}

function mouseUp(e) {
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
