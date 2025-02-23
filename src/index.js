const { buildAll } = require("./lib");

buildAll(process.argv.length > 2 && process.argv[2] == "debug");
