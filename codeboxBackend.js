var space = document.getElementById("codeArea");
var codeBoxArr = [];
/**
 * Creates a div that has a textarea as a child. These will be the diagram boxes that you can drag around and fill with code.
 * Primary connection: If a box directly leads to another, there is a primary connection between the two boxes.
 * Secondary connection: Conditional boxes have these. If the condition is false, they lead to the box with which they have a seconday connection.
 * @param {string} type is the type of the box. 
 *                      'f' means 'first', or the starting block. It leads to its primary connection box. There should always be exactly one of these on the screen. What is written inside them doesn't matter.
 *                      's' means a simple box that leads to its primary connection box.
 *                      'i' means 'input'. It prompts the user to enter an expression that is assigned to the variable it contains. It leads to its primary connection box.
 *                      'c' means 'conditional'. It leads to its primary connection box if its condition it true. Else, it leads to its secondary connection box.
 *                      'e' means 'end'. The program halts when these boxes are reached. The code inside them is executed before this happens.
 */
function addBox(type) {
    function actualAdd(index) {
        /*codeBox contains: A div that contatins a textarea and can be dragged around, a textarea that is a child of the div, a type (f, s, i, c, or e), its primary connection, its secondary connection,
        an array of indices that hold all the boxes that have connections to this box, an x-coordinate, a y-coordinate, and a string that keeps the code of the box inside after saving.*/

        var codeBox = [document.createElement("div"), document.createElement("textarea"), type, -1, -1, "", "", ""];

        //Give an id to the box.
        var position
        for (position = 0; position < codeBoxArr.length; ++position) {
            if (codeBoxArr[position] == null) {
                break;
            }
        }

        codeBox[0].id = "" + position;

        //Give a class name to the box so that we can stylize the boxes in CSS. The names are in the format type_box, where type can be f, s, i, c, or e.
        codeBox[0].className = type + "_box";

        makeDraggable(codeBox[0]);

        //Give a class name to the textarea that is the child of the box. The names are in the format type_code.
        codeBox[1].className = type + "_code";

        if (type == "f") {
            codeBox[1].value = "//START"
        } else {
            codeBox[1].value = "";
        }

        codeBox[0].appendChild(codeBox[1]);
        space.appendChild(codeBox[0]);

        if (position == codeBoxArr.length) {
            codeBoxArr.push(codeBox);
        } else {
            codeBoxArr[position] = codeBox;
        }

    }
    for (let i = 0; i < codeBoxArr.length; ++i) {
        if (codeBoxArr[i] == null) {
            actualAdd(i);
            return;
        }
    }
    actualAdd(codeBoxArr.length);
}
 
/**
 * Deletes a code diagram box that has been created before. It also removes all the connections this box has to others.
 * @param {*} index is the ID of the box your are deleting.
 */
function removeBox(index) {
    let num = parseInt(index);
    //Don't delete first boxes!
    if (codeBoxArr[num][2] == 'f') {
        return codeBoxArr[num][0];
    }
    space.removeChild(codeBoxArr[num][0]);
    primaryUnconnectStart(index);
    secondaryUnconnectStart(index);
    unconnectEnd(index);
    codeBoxArr[num] = null;
    return null;
}


//You are setting a primary connection from the box with ID startIndex to the box with ID endIndex.
function primaryConnect(startIndex, endIndex) {
    let start = parseInt(startIndex);
    let end = parseInt(endIndex);
    codeBoxArr[start][3] = parseInt(end);
}

//You are setting a primary connection from the box with ID startIndex to the box with ID endIndex.
function secondaryConnect(startIndex, endIndex) {
    let start = parseInt(startIndex);
    let end = parseInt(endIndex);
    codeBoxArr[start][4] = parseInt(end);
}

//You are removing the primary connection from the box with ID startIndex. The endIndex is already known.
function primaryUnconnectStart(startIndex) {
    let start = parseInt(startIndex);
    let end = codeBoxArr[start][3];
    if (end == -1) {
        return;
    }
    codeBoxArr[start][3] = -1
}

//You are removing the secondary connection from the box with ID startIndex. The endIndex is already known.
function secondaryUnconnectStart(startIndex) {
    let start = parseInt(startIndex);
    let end = codeBoxArr[start][4];
    if (end == -1) {
        return;
    }
    codeBoxArr[start][4] = -1;
}

//You are removing all the connections that lead to the box with ID endIndex. The list of boxes that lead to it is already known.
function unconnectEnd(endIndex) {
    //WRITE AGAIN
}


// Creates code out of the boxes, using the code inside their textareas and their connections.
function codeMaker() {
    code = [];
    let tmp = codeBoxArr[0];
    let line = ['s', tmp[1].value, tmp[3]];
    if (line[2] == -1) {
        line = ['e', line[1]];
    }
    code.push(line);
    for (let i = 1; i < codeBoxArr.length; ++i) {
        tmp = codeBoxArr[i];
        line = [tmp[2], tmp[1].value, tmp[3], tmp[4]];

        if (line[0] != 'c' && line[2] == -1) {
            line = ['e', line[1]];
        }
        code.push(line);
    }
    return code;
}