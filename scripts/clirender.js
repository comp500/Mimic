var buffer = {};
var CHARACTERS_PER_LINE = 16;
var render = {};
var colors = require("colors");
var cursor = {"x": 0, "y":0};

//
//    Individual Cells
//


render.characterBackground = function(x, y, color, ctx) {
	var computer = core.getActiveComputer();
	if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
		//var actualWidth = config.cellWidth * config.terminalScale;
		//var actualHeight = config.cellHeight * config.terminalScale;
		//var cellX = ((x - 1) * actualWidth + config.borderWidth);
		//var cellY = ((y - 1) * actualHeight + config.borderHeight);
		if (cursor.x <= x && cursor.y <= y) {
			console.log("hmm, i'm passed " + color);
			//process.stdout.write(" ".colors)
		} else {
			//render.renderBuffer();
		}
		/*ctx.beginPath();
		ctx.rect(cellX, cellY, actualWidth, actualHeight);
		ctx.fillStyle = globals.colors[color];
		ctx.fill();*/
	}
}


render.characterText = function(x, y, text, color, ctx) {
	/*if (typeof(ctx) == "undefined") {
		ctx = context;
	}*/

	if (text == " ") {
		return;
	}

	var computer = core.getActiveComputer();
	if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
		//var loc = characters.indexOf(text);
		//if (loc != -1) {
			/*var imgW = font.width / 16;
			var imgH = font.height / 16 / 16;
			var startY = parseInt(color, 16) * (font.height / 16);

			var imgX = loc % CHARACTERS_PER_LINE;
			var imgY = (loc - imgX) / CHARACTERS_PER_LINE + LINE_Y_OFFSET;
			imgX *= imgW;
			imgY *= imgH;
			imgY += startY;

			var offset = imgW / 2 - globals.characterWidths[loc] / 2 - 1;
			if (text == "@" || text == "~") {
				offset -= 1;
			}

			var actualWidth = config.cellWidth * config.terminalScale;
			var actualHeight = config.cellHeight * config.terminalScale;
			var textX = (x - 1) * actualWidth + config.borderWidth + offset;
			var textY = (y - 1) * actualHeight + config.borderHeight + 1;

			var scaledImgWidth = imgW * config.terminalScale;
			var scaledImgHeight = imgH * config.terminalScale;

			ctx.drawImage(font, imgX, imgY, imgW, imgH, textX, textY,
				scaledImgWidth, scaledImgHeight);*/
			/*if (cursor.x <= x && cursor.y <= y) {
				process.stdout.write(text)
				cursor.x += 1;
			} else {
				render.renderBuffer();
			}*/
			if (cursor.x <= x && cursor.y <= y) {
				process.stdout.cursorTo(x,y)
				process.stdout.write(text)
				if ((x + 1) > computer.width){
					cursor.x = 0;
					cursor.y = y + 1;
				} else {
					cursor.x = x + 1;
				}
			} else {
				//render.renderBuffer();
			}
		//}
	}
}


render.character = function(x, y, text, foreground, background, ctx) {
	/*if (typeof(ctx) == "undefined") {
		ctx = context;
	}*/

	var computer = core.getActiveComputer();
	if (x >= 1 && y >= 1 && x <= computer.width && y <= computer.height) {
		/*if (typeof(background) != "undefined") {
			render.characterBackground(x, y, background, ctx);
		}

		if (typeof(foreground) != "undefined") {
			render.characterText(x, y, text, foreground, ctx);
		}*/
		if (typeof(background) != "undefined") {
			//render.characterBackground(x, y, background, ctx);
		}

		if (typeof(foreground) != "undefined") {
			//render.characterText(x, y, text, foreground, ctx);
			if (cursor.x <= x && cursor.y <= y) {
				process.stdout.cursorTo(x,y)
				process.stdout.write(text)
				if ((x + 1) > computer.width){
					cursor.x = 0;
					cursor.y = y + 1;
				} else {
					cursor.x = x + 1;
				}
			} else {
				//render.renderBuffer();
				process.stdout.cursorTo(0,y)
				process.stdout.clearLine()
				process.stdout.cursorTo(x,y)
				process.stdout.write(text)
				if ((x + 1) > computer.width){
					cursor.x = 0;
					cursor.y = y + 1;
				} else {
					cursor.x = x + 1;
				}
			}
		}
	}
}

render.border = function(){};

render.clearLine = function(y, foreground, background) {
	background = background || "0";
	foreground = foreground || "f";

	var computer = core.getActiveComputer();
	//render.text(1, y, " ".repeat(computer.width), foreground, background);
	// something here
	process.stdout.cursorTo(0,y);
	process.stdout.clearLine();
	//render.renderBuffer();
}

render.clear = function(foreground, background) {
	background = background || "0";
	foreground = foreground || "f";

	var computer = core.getActiveComputer();
	for (var i = 1; i <= computer.height; i++) {
		render.clearLine(i, foreground, background);
	}
}

render.text = function(x, y, text, foreground, background, ctx) {
	var computer = core.getActiveComputer();
	for (var i = 0; i < text.length; i++) {
		render.character(x + i, y, text.charAt(i), foreground, background, ctx);
	}
}

render.centredText = function(y, text, foreground, background, ctx) {
	var computer = core.getActiveComputer();
	var x = Math.floor(computer.width / 2 - text.length / 2);
	render.text(x, y, text, foreground, background, ctx);
}

render.cursorBlink = function() {
	/*var computer = core.getActiveComputer();

	if (computer.cursor.blink && core.cursorFlash) {
		overlayContext.clearRect(0, 0, canvas.width, canvas.height);

		var x = computer.cursor.x;
		var y = computer.cursor.y;
		var color = computer.colors.foreground;

		render.text(x, y, "_", color, undefined, overlayContext);
	} else {
		overlayContext.clearRect(0, 0, canvas.width, canvas.height);
	}*/
}

render.bsod = function(title, lines) {
	render.clear("f", "4");

	var computer = core.getActiveComputer();
	computer.cursor.blink = false;
	render.cursorBlink();

	render.clearLine(5, "f", "f");
	render.centredText(5, title, "4", "f");

	for (var i in lines) {
		var line = lines[i];
		render.centredText(9 + parseInt(i), line, "f", "4");
	}

	render.centredText(10 + lines.length, "Press enter to reboot the computer...", "f", "4");
}

module.exports = render;