const {
	getUser,
	getUserByEmail,
	updateUser,
} = require("../database/crud/users.crud");
const {
	hashPassword,
	comparePassword,
} = require("../utils/auth/passwordEncript");
const boom = require("@hapi/boom");

const { sendRecoveryCodeTo } = require("../utils/emails/sendEmails");
const { signToken } = require("../utils/auth/tokens/token-sign");
const { verifyToken } = require("../utils/auth/tokens/token-verify");

const AuthServices = () => {
	const recoveryPassword = async (req, res, next) => {
		try {
			const { email } = req.body;
			const user = await getUserByEmail(email);
			if (!user) {
				const error = boom.notFound("User not found");
				res.status(error.output.statusCode).json(error.output.payload);
			}
			const recoveryCode = Math.floor(100000 + Math.random() * 900000);

			const payload = { email, recoveryCode };
			const token = signToken(payload, { expiresIn: "15 minutes" });

			await sendRecoveryCodeTo(email, recoveryCode);
			res.status(200).send({ message: "Recovery code email sent", token });
		} catch (error) {
			const err = boom.badImplementation("Error sending recovery code");
			res.status(err.output.statusCode).json(err.output.payload);
		}
	};

	const verifyRecoveryCode = async (req, res, next) => {
		try {
			const { recoveryCode } = req.body;
			const payload = verifyToken(req.headers.authorization.split(" ")[1]);
			const { email } = payload;

			const user = await getUserByEmail(email);
			console.log(user);
			if (!user) {
				const error = new Error("User not found");
				error.status = 404;
				throw error;
			}
			if (payload.recoveryCode !== recoveryCode) {
				const error = boom.unauthorized("Invalid recovery code");
				res.status(error.output.statusCode).json(error.output.payload);
			} else {
				const payload = {
					sub: user.id,
					fullname: user.fullname,
					email: user.email,
					roles: user.roles,
				};
				const token = signToken(payload, { expiresIn: "15 minutes" });
				res.status(200).send({ message: "Recovery code verified", token });
			}
		} catch (error) {
			next(error);
		}
	};

	const resetPassword = async (req, res, next) => {
		try {
			const { password, email } = req.body;
			const user = await getUserByEmail(email);
			if (!user) {
				const error = boom.notFound("User not found");
				res.status(error.output.statusCode).json(error.output.payload);
				next(error);
			}
			const payload = verifyToken(req.headers.authorization.split(" ")[1]);
			if (payload.sub !== user.id) {
				const error = boom.unauthorized("Invalid token");
				res.status(error.output.statusCode).json(error.output.payload);
				next(error);
			}
			const encriptedPassword = hashPassword(password);

			const updatedUser = await updateUser(user._id, {
				password: encriptedPassword,
			});
			res.status(200).send({ message: "Password updated", updatedUser });
		} catch (error) {
			next(error);
		}
	};

	const refreshToken = async (req, res, next) => {
		try {
			const { refreshToken } = req.body;
			const payload = verifyToken(refreshToken);
			const user = await getUser(payload.sub);
			if (!user) {
				const error = boom.notFound("User not found");
				res.status(error.output.statusCode).json(error.output.payload);
				next(error);
			}
			const newPayload = {
				sub: user.id,
				fullname: user.fullname,
				email: user.email,
				roles: user.roles,
			};
			const newToken = signToken(newPayload, { expiresIn: "15 minutes" });
			const newRefreshToken = signToken(newPayload, { expiresIn: "1 hour" });
			res.status(200).send({
				message: "Token refreshed",
				token: newToken,
				refreshToken: newRefreshToken,
			});
		} catch (error) {
			next(error);
		}
	};

	return {
		recoveryPassword,
		verifyRecoveryCode,
		resetPassword,
		refreshToken,
	};
};

module.exports = AuthServices;
