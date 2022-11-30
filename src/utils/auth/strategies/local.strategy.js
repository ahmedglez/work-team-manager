const { Strategy } = require("passport-local");
const { getUserByEmail } = require("../../../database/crud/users.crud");
const { comparePassword } = require("../passwordEncript");
const boom = require("@hapi/boom");

const LocalStrategy = new Strategy(
	{
		usernameField: "email",
		passwordField: "password",
	},

	async (username, password, done) => {
		try {
			const user = await getUserByEmail(username);
			if (!user) {
				done(boom.unauthorized("Invalid email or password"), false);
			}
			const isValidPassword = comparePassword(password, user.password);
			if (!isValidPassword) {
				done(boom.unauthorized("Invalid email or password"), false);
			}
			const newUser = {
				_id: user._id,
				email: user.email,
				nickname: user.nickname,
				fullname: user.fullName,
				roles: user.roles,
				role: user.role,
			};
			done(null, newUser);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;
