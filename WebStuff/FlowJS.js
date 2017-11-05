// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

//ADDING BOXES
document.getElementById("s").onclick = function() {
	addBox("s");
}
document.getElementById("c").onclick = function() {
	addBox("c");
}
document.getElementById("f").onclick = function() {
	addBox("f");
}
document.getElementById("i").onclick = function() {
	addBox("i");
}
document.getElementById("e").onclick = function() {
	addBox("e");
}
document.getElementById("remove").onclick = function() {
	removeBox(codeBoxArr[index]);
}
document.getElementById("run").onclick = function() {
	codeMaker();
}
