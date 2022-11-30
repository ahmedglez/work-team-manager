const userRouter = require("../routes/users.routes");
const authRouter = require("../routes/auth.routes");

const addRoutes = (app) => {
	app.use("/users", userRouter);
	app.use("/", authRouter);
};

module.exports = addRoutes;
