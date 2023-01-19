/* IMPORTS */
const { config } = require("./src/config/enviroment.config");
const passport = require("./src/utils/auth/index");
const express = require("express");
const cors = require("cors");
const db = require("./src/database/connections/MongoDBConnection");
const addRoutes = require("./src/routes/routes");
/* SERVER CONFIGURATION */
const app = require("./src/app/app");
const port = config.development.port || 3000;

app.use(express.json());

const whiteList = [
	"http://localhost:3000",
	"http://localhost:3001",
	"https://virtual-job-board-1ltyju106-ahmedglez.vercel.app/",
];

app.use(cors({ origin: whiteList }));

/* ROUTES */
app.get("/", (req, res) => {
	res.send(
		`This is the root of the backend server for the Virtual Job Board project :D,
		 please check the documentation on github for more information about the endpoints. 
		 `
	);
});

addRoutes(app);

/* MIDDLEWARES */
app.use(passport.initialize());
app.use(passport.session());

/* SERVER START */
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
