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
				done(boom.unauthorized().message, false);
				return;
			}
			const isValidPassword = comparePassword(password, user.password);
			if (!isValidPassword) {
				done(boom.unauthorized().message, false);
				return;
			}
			const newUser = {
				_id: user._id.toString(),
				fullname: user.fullname,
				email: user.email,
				roles: user.roles,
			};
			done(null, newUser);
			return;
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;
