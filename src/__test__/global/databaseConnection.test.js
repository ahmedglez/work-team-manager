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

describe("Bateria de pruebas para la conexión a la base de datos", () => {
	test("Probando conexión a la base de datos", async () => {
		await client.connect()
		const res = await client.query("SELECT * FROM roles")
		expect(res.rows).toBeTruthy()
		await client.end()
	})
})
