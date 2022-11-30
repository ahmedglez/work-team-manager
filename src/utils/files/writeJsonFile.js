const fs = require("fs");
const path = require("path");

const writeJsonFile = async (path, json) => {
	fs.writeFileSync(path, "");
	fs.writeFileSync(path, JSON.stringify(json));
};

module.exports = writeJsonFile;
