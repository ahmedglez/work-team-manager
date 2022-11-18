/* IMPORTS */
const dotenv = require("dotenv")
dotenv.config({
	path: ".env",
})
const express = require("express")
const cors = require("cors")
const routerApi = require("./controllers/routes")

/* SERVER CONFIGURATION */
const app = express()
const port = process.env.SERVER_PORT || 3000
app.use(express.json())
const whitelist = ["http://localhost:8080", "https://myapp.co"]
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true)
		} else {
			callback(new Error("no permitido"))
		}
	},
}
app.use(cors(options))

/* ROUTES */
app.get("/", (req, res) => {
	res.send("Hello World!")
})

routerApi(app)

/* MIDDLEWARES */

/* SERVER START */
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
