const build = require("./esbuild-def.cjs");

build({ rootDir: "../", outputFormat: "mjs" });
build({ rootDir: "../", outputFormat: "cjs" });
