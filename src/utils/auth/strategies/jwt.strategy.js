const { Strategy, ExtractJwt } = require("passport-jwt");
const { config } = require("../../../config/enviroment.config");
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.development.api_key,
};
