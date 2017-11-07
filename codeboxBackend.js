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

        //TODO: The x and y coordinates don't get changed when the div moves. They should get changed, so that loading works appropriately.
        var codeBox = [document.createElement("div"), document.createElement("textarea"), type, undefined, undefined, [], "", "", ""];

        //Give an id to the box.
        codeBox[0].id = "" + codeBoxArr.length;

        //Give a class name to the box so that we can stylize the boxes in CSS. The names are in the format type_box, where type can be f, s, i, c, or e
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
        codeBoxArr.push(codeBox);

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
        return;
    }
    space.removeChild(codeBoxArr[num][0]);
    primaryUnconnectStart(index);
    secondaryUnconnectStart(index);
    unconnectEnd(index);
    codeBoxArr[num] = null;
}


//You are setting a primary connection from the box with ID startIndex to the box with ID endIndex.
function primaryConnect(startIndex, endIndex) {
    let start = parseInt(startIndex);
    let end = parseInt(endIndex);
    codeBoxArr[start][3] = parseInt(end);
    codeBoxArr[end][5].push(start);
}

//You are setting a primary connection from the box with ID startIndex to the box with ID endIndex.
function secondaryConnect(startIndex, endIndex) {
    let start = parseInt(startIndex);
    let end = parseInt(endIndex);
    codeBoxArr[start][4] = parseInt(end);
    codeBoxArr[end][5].push(start);
}

//You are removing the primary connection from the box with ID startIndex. The endIndex is already known.
function primaryUnconnectStart(startIndex) {
    let start = parseInt(startIndex);
    let end = codeBoxArr[start][3];
    if (end == undefined) {
        return;
    }
    codeBoxArr[start][3] = undefined;
    codeBoxArr[end][5] = codeBoxArr[end][5].filter(num => num != start);
}

//You are removing the secondary connection from the box with ID startIndex. The endIndex is already known.
function secondaryUnconnectStart(startIndex) {
    let start = parseInt(startIndex);
    let end = codeBoxArr[start][4];
    if (end == undefined) {
        return;
    }
    codeBoxArr[start][4] = undefined;
    codeBoxArr[end][5] = codeBoxArr[end][5].filter(num => num != start);
}

//You are removing all the connections that lead to the box with ID endIndex. The list of boxes that lead to it is already known.
function unconnectEnd(endIndex) {
    let end = parseInt(endIndex);
    for (let i = 0; i < codeBoxArr[end][5].length; ++i) {
        primaryUnconnectStart("" + codeBoxArr[end][5][i]);
    }
    codeBoxArr[end][5] = [];
}


// Creates code out of the boxes, using the code inside their textareas and their connections.
function codeMaker() {
    code = [];
    var start;
    for (let i = 0; i < codeBoxArr.length; ++i) {
        if (codeBoxArr[i][2] == 'f') {
            start = i;
            let tmp = codeBoxArr[i];
            code.push(['s', tmp[1].value, tmp[3]]);
            break;
        }
    }
    for (let i = 0; i < start; ++i) {
        let tmp = codeBoxArr[i];
        let line = [tmp[2], tmp[1].value];
        if (tmp[3] != undefined) {
            line.push(tmp[3]);
            if (tmp[4] != undefined) {
                line.push(tmp[4]);
            }
        } else {
            line[0] = 'e';
        }
        code.push(line);
    }
    for (let i = start + 1; i < codeBoxArr.length; ++i) {
        let tmp = codeBoxArr[i];
        let line = [tmp[2], tmp[1].value];
        if (tmp[3] != undefined) {
            line.push(tmp[3]);
            if (tmp[4] != undefined) {
                line.push(tmp[4]);
            }
        } else {
            line[0] = 'e';
        }
        code.push(line);
    }
    return code;
}