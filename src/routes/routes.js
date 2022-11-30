const userRouter = require("../routes/users.routes");

const addRoutes = (app) => {
	app.use("/users", userRouter);
};

module.exports = addRoutes;
