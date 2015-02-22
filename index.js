var Lua = require("./scripts/lib/lua5.1.5.min.js");
var fs = require("fs");
GLOBAL.Lua5_1 = Lua;
GLOBAL.C = Lua.C;
GLOBAL.core = {};
GLOBAL.render = require("./scripts/clirender.js");
require("./scripts/globals.js");
require("./scripts/filesystem.js")
GLOBAL.bitAPI = require("./scripts/apis/bit.js");
GLOBAL.httpAPI = {};
GLOBAL.osAPI = require("./scripts/apis/os.js");
GLOBAL.peripheralAPI = {};
GLOBAL.redstoneAPI = {};
GLOBAL.termAPI = {};
GLOBAL.code = require("./scripts/code.js")
var Computer = require("./scripts/computer.js");
core.createComputer = function(id, advanced) {
	var computer = new Computer(id, advanced);
	core.computers.push(computer);
};
core.getActiveComputer = function() {
	if (core.computers) {
		return core.computers[0];
	} else {
		return undefined;
	}
};
core.computers = [];
core.createComputer(0, false);

core.computers[0].launch();