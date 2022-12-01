const jwt = require("jsonwebtoken");
const { config } = require("../../../config/enviroment.config");
const secret = config.development.api_key;

const signToken = (payload, options) => {
	return jwt.sign(payload, secret, options);
};

module.exports = { signToken };
