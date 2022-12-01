const { Strategy, ExtractJwt } = require("passport-jwt");
const { config } = require("../../../config/enviroment.config");
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.development.api_key,
};

const JwtStrategy = new Strategy(options, (payload, done) => {
	return done(null, payload);
});

module.exports = JwtStrategy;
