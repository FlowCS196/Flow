const closer = (word) => {
	this.postMessage(['e', word])
}

const printer = (word) => {
	this.postMessage(['p', word]);
}

const cleaner = () => {
	this.postMessage(['c']);
}
const inputter = (word, next) => {
	this.postMessage(['i', next.toString(), word]);
}

const sleeper = (milliseconds) => {
	// Right now, this function does busy waiting. TODO: Implement a better solution.
	var start = new Date().getTime();
	while ((new Date().getTime() - start) < milliseconds) {}
}

const inputEvaluator = (word) => {
	eval(word);
}

const complexEvaluator = (words) => {
	if (words[0] == 's') {
		eval(words[1]);
		return words[2];
	} else if (words[0] == 'c') {
		return (eval(words[1])) ? words[2] : words[3];
	} else if (words[0] == 'i') {
		inputter(words[1], words[2]);
		return -1;
	} else if (words[0] == 'e') {
		closer("");
		return -1;
	}
}

const run = (next, code) => {
	inputEvaluator(code);
	while (next >= 0) {
		//printer(next)
		next = complexEvaluator($functions[next]);
	}
}
const creator = (rawFunctions) => {
	for (let i = 0; i < rawFunctions.length; ++i) {
		$functions.push(rawFunctions[i]);
	}

}

const $functions = [];

/*function functionize(phrase) {
	if (phrase[0] == "s") {
		return new Function(phrase[1] + "return " + phrase[2] + ";");
	} else if (phrase[0] == 'c') {
		return new Function("if (" + phrase[1] + ") return" + phrase[2] + "; return" + phrase[3] +";");
	} else if (phrase[0] == 'i') {
		return new Function("inputter(\"" + phrase[1] + "\"," + phrase[2] + "); return -1;");
	} else if (phrase[0] == "e") {
		return new Function("closer(\"\"); return -1;");
	}
}*/

this.onmessage = function (event) {
	if (event.data[0] == 'i') {
		run (event.data[1], event.data[2]);
	} else {
		creator(event.data);
		run(0, "");
	}
};

