const jwt = require("jsonwebtoken");
const { config } = require("../../../config/enviroment.config");
const secret = config.development.api_key;

const verifyToken = (token) => {
	return jwt.verify(token, secret);
};

module.exports = { verifyToken };
