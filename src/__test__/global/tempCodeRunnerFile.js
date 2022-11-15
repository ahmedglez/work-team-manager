const dotenv = require("dotenv")
dotenv.config({
	path: ".env",
})
const { Client } = require("pg")

const client = new Client({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
})

const test = async () => {
	const res = await client.connect()
	const data = await client.query("SELECT * FROM roles")
	console.log("DATA",data.rows)
	return data
}
console.log(test())
