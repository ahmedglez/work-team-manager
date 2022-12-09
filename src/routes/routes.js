const userRouter = require("../routes/users.routes");
const authRouter = require("../routes/auth.routes");
const clientRouter = require("../routes/client.routes");
const taskRouter = require("../routes/task.routes");
const logRouter = require("../routes/logs.routes");
const assignmentsRouter = require("../routes/assignments.routes");
const profileRouter = require("../routes/profiles.routes");

const addRoutes = (app) => {
	app.use("/users", userRouter);
	app.use("/", authRouter);
	app.use("/clients", clientRouter);
	app.use("/tasks", taskRouter);
	app.use("/logs", logRouter);
	app.use("/assignments", assignmentsRouter)
	app.use("/", profileRouter);
};

module.exports = addRoutes;
