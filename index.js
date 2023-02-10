/* IMPORTS */
const { config } = require("./src/config/enviroment.config");
const passport = require("./src/utils/auth/index");
const express = require("express");
const cors = require("cors");
const db = require("./src/database/connections/MongoDBConnection");
const addRoutes = require("./src/routes/routes");
const limiter = require("./src/middlewares/rateLimiter");
const cacheMiddleware = require("./src/middlewares/cacheMiddleware");

/* SERVER CONFIGURATION */
const app = require("./src/app/app");
const port = config.development.port || 3000;

app.use(express.json());

const whiteList = [
	"http://localhost:3000",
	"http://localhost:3001",
	"http://localhost:3000/authentication/sign-in",
	"http://localhost:3000/dashboard",
	"https://virtual-job-board-1ltyju106-ahmedglez.vercel.app/",
	"http://localhost:3000/vision-ui-dashboard-react",
	"https://virtual-job-board-1ltyju106-ahmedglez.vercel.app/authentication/sign-in",
	"https://virtual-job-board-1ltyju106-ahmedglez.vercel.app/dashboard",
	"https://virtual-job-board-1ltyju106-ahmedglez.vercel.app/vision-ui-dashboard-react",
	"http://192.168.43.227:3000/authentication/sign-in",
	"http://192.168.43.227:3000",
	"http://192.168.43.227:3000/dashboard",
	"http://192.168.43.227:3000/profile",
	"https://virtual-job-dashboard-ui.vercel.app/",
	"https://virtual-job-dashboard-ui.vercel.app/dashboard",
	"https://virtual-job-dashboard-ui.vercel.app/authentication/sign-in",
	"https://virtual-job-dashboard-ui.vercel.app/profile",
	"https://virtual-job-dashboard-ui.vercel.app/vision-ui-dashboard-react",
	"https://virtual-job-dashboard-ui.vercel.app/vision-ui-dashboard-react/authentication/sign-in",
	"https://virtual-job-dashboard-ui.vercel.app/vision-ui-dashboard-react/dashboard",
	"https://virtual-job-dashboard-ui.vercel.app/vision-ui-dashboard-react/profile",
	"https://virtual-job-dashboard-ui.vercel.app/vision-ui-dashboard-react/vision-ui-dashboard-react",
	"https://virtual-job-dashboard-ui.vercel.app/vision-ui-dashboard-react/vision-ui-dashboard-react/authentication/sign-in",
	"https://virtual-job-dashboard-ui-git-main-ahmedglez.vercel.app/",
	"https://virtual-job-dashboard-a5mf7nmqr-ahmedglez.vercel.app/",
	"https://virtual-job-dashboard-ui.vercel.app/authentication/sign-in",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app/authentication/sign-in",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app/dashboard",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app/profile",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app/vision-ui-dashboard-react",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app/vision-ui-dashboard-react/authentication/sign-in",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app/vision-ui-dashboard-react/dashboard",
	"https://work-team-manager-r4b1am4l0-ahmedglez.vercel.app/vision-ui-dashboard-react/profile",

];

//app.use(cors({ origin: whiteList, methods: ["GET", "POST", "PUT", "DELETE"] }));

/* ROUTES */
app.get("/", (req, res) => {
	res.redirect("https://virtual-job-dashboard-ui.vercel.app/dashboard");
});

addRoutes(app);

/* JWT MIDDLEWARE */
app.use(passport.initialize());
app.use(passport.session());

/* RATE LIMITER */
app.use(limiter);

/* CACHE MIDDLEWARE */
app.use(cacheMiddleware);

/* SERVER START */
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
