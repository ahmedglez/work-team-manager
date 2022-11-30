/* IMPORTS */
const { config } = require("./src/config/enviroment.config");
const express = require("express");
const cors = require("cors");
const db = require("./src/database/connections/MongoDBConnection");
const addRoutes = require("./src/routes/routes");
/* SERVER CONFIGURATION */
const app = express();
const port = config.development.port || 3000;

app.use(express.json());
const whitelist = ["http://localhost:8080", "https://myapp.co"];
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("no permitido"));
		}
	},
};
app.use(cors(options));

/* ROUTES */
app.get("/", (req, res) => {
	res.send("Hello World!");
});

addRoutes(app);

/* MIDDLEWARES */

/* SERVER START */
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
