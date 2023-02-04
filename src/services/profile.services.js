const { getUserByEmail, updateUser } = require("../database/crud/users.crud");

const {
	comparePassword,
	hashPassword,
} = require("../utils/auth/passwordEncript");
const { verifyToken } = require("../utils/auth/tokens/token-verify");

const ProfileServices = () => {
	const getPersonalInformationHandler = async (req, res, next) => {
		const token = req.headers.authorization.split(" ")[1];
		const payload = verifyToken(token);
		const user = await getUserByEmail(payload.email);
		res.status(200).json({
			message: "User information",
			data: user,
		});
	};

	const updatePersonalInformationHandler = async (req, res, next) => {
		const token = req.headers.authorization.split(" ")[1];
		const payload = verifyToken(token);
		const user = await getUserByEmail(payload.email);
		const { body: data } = req;
		data.password = hashPassword(data.password);
		const userUpdated = await updateUser(user._id, {
			...data,
		});
		res.status(200).json({
			message: "User information updated",
			data: userUpdated,
		});
	};

	const updatePasswordHandler = async (req, res, next) => {
		const token = req.headers.authorization.split(" ")[1];
		const payload = verifyToken(token);
		const user = await getUserByEmail(payload.email);
		const { oldPassword, newPassword } = req.body;
		const isPasswordValid = await comparePassword(oldPassword, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid password",
			});
		}
		const hashedPassword = await hashPassword(newPassword);
		const userUpdated = await updateUser(user._id, {
			password: hashedPassword,
		});
		res.status(200).json({
			message: "Password updated",
			data: userUpdated,
		});
	};

	const deleteAccountHandler = async (req, res, next) => {
		const token = req.headers.authorization.split(" ")[1];
		const payload = verifyToken(token);
		const user = await getUserByEmail(payload.email);
		const { password } = req.body;
		const isPasswordValid = await comparePassword(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid password",
			});
		}
		await deleteUser(user._id);
		res.status(200).json({
			message: "Account deleted",
		});
	};

	return {
		getPersonalInformationHandler,
		updatePersonalInformationHandler,
		updatePasswordHandler,
		deleteAccountHandler,
	};
};

module.exports = ProfileServices;
