/* IMPORTS */
const { config } = require("./src/config/enviroment.config");
const passport = require("./src/utils/auth/index");
const express = require("express");
const cors = require("cors");
const db = require("./src/database/connections/MongoDBConnection");
const addRoutes = require("./src/routes/routes");
import limiter from "./src/middlewares/rateLimiter";

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
];

app.use(cors({ origin: whiteList, methods: ["GET", "POST", "PUT", "DELETE"] }));

/* ROUTES */
app.get("/", (req, res) => {
	res.send(
		`This is the root of the backend server for the Virtual Job Board project :D,
		 please check the documentation on github for more information about the endpoints. 
		 `
	);
});

addRoutes(app);

/* JWT MIDDLEWARE */
app.use(passport.initialize());
app.use(passport.session());

/* RATE LIMITER */
app.use(limiter);

/* SERVER START */
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
