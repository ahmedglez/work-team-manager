const reader = require("xlsx");
const path = require("path");

const readFromCSV = (fileName) => {
	const file = reader.readFile(path.join(__dirname, fileName));
	let data = [];
	const sheets = file.SheetNames;
	for (let i = 0; i < sheets.length; i++) {
		const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
		temp.forEach((res) => {
			data.push(res);
		});
	}
	return data;
};

module.exports = readFromCSV;
