/*funcs.push(["i", "n", 1]);
funcs.push(["s", "ans = 1;", 2]);
funcs.push(["c", "n > 1", 3, 6]);
funcs.push(["s", "ans *= n;", 4]);
funcs.push(["s", "n -= 1", 5]);
funcs.push(["s", "printer(ans);", 2]);
funcs.push(["s", "printer(ans);", 7]);
funcs.push(["e"]);*/

/*funcs.push(["i", "arr", 1]);
funcs.push(["s", "i = 0;", 2]);
funcs.push(["c", "i < arr.length - 1", 3, 11]);
funcs.push(["s", "j = 0;", 4]);
funcs.push(["c", "j < arr.length - 1 - i", 5, 10]);
funcs.push(["c", "arr[j] > arr[j+1]", 6, 9]);
funcs.push(["s", "temp = arr[j];", 7]);
funcs.push(["s", "arr[j] = arr[j+1];", 8]);
funcs.push(["s", "arr[j+1] = temp;", 9]);
funcs.push(["s", "j+=1;", 4]);
funcs.push(["s", "i+=1;", 2]);
funcs.push(["s", "printer(arr)", 12]);
funcs.push(["e"]);*/

/*funcs.push(["s", "num = 0", 1]);
funcs.push(["i", "mod", 2])
funcs.push(["c", "num % mod == 0", 3, 5])
funcs.push(["s", "cleaner()", 4]);
funcs.push(["s", "printer(num); sleeper(1000)", 5]);
funcs.push(["s", "++num", 2]);*/

/*addBox('f');
addBox('s')
addBox('i');
addBox('c');
addBox('s');
addBox('s');
addBox('s');


primaryConnect('0','1');
primaryConnect('1','2');
primaryConnect('2','3');
primaryConnect('3','4');
secondaryConnect('3','6');
primaryConnect('4', '5');
primaryConnect('5', '3');*/

addBox('f');
/*
addBox('i');
addBox('c');
addBox('s');
addBox('s');

primaryConnect('0','1');
primaryConnect('1','2');
primaryConnect('2','3');
secondaryConnect('2','4');
primaryConnect('3','4');
*/

var box = document.getElementById('textbox');
box.value = "";
var worker = null;
var runner = document.getElementById('runButton');
var stopper = document.getElementById('stopButton');
runner.onclick = function() {
    var funcs = codeMaker();
    //box.value = JSON.stringify(funcs);
    box.value = "";
    if (worker != null) {
        return;
    }
    worker = new Worker("newworker.js");
    worker.onmessage = function(event) {
        var pos;
        if (event.data[0] == 'p') {
            box.value += "" + event.data[1];
        } else if (event.data[0] == 'c') {
            box.value = "";
        } else if (event.data[0] == 'i') {
            worker.postMessage(['i', event.data[1], event.data[2] + "=" + prompt("Enter Input", "0") + ";"]);
        } else if (event.data[0] == 'e') {
            worker.terminate();
            worker = null;
        }
    };
    worker.postMessage(funcs);
}

stopper.onclick = function() {
    if (worker == null)
        return;
    else {
        worker.terminate();
        worker = null;
    }
}

var simpleCreator = document.getElementById("simpleButton");
var conditionalCreator = document.getElementById("conditionalButton");
var inputCreator = document.getElementById("inputButton");

simpleCreator.onclick = function() {addBox("s");};
conditionalCreator.onclick = function() {addBox("c");};
inputCreator.onclick = function() {addBox("i");};
