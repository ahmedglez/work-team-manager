const bycryptjs = require("bcryptjs");

const hashPassword = (password) => {
	const salt = bycryptjs.genSaltSync(10);
	const hash = bycryptjs.hashSync(password, salt);
	return hash;
};

const comparePassword = (password, hash) => {
	return bycryptjs.compareSync(password, hash);
};

module.exports = { hashPassword, comparePassword };
