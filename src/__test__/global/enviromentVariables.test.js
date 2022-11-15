const dotenv = require("dotenv")
dotenv.config({
	path: ".env",
})

describe("Bateria de pruebas para las variables de entorno", () => {
	test("Probando variables de entorno", () => {
		expect(process.env.PGUSER).toBe("postgres")
		expect(process.env.PGPORT).toBe("5736")
		expect(process.env.PGHOST).toBe("containers-us-west-121.railway.app")
		expect(process.env.PGDATABASE).toBe("railway")
		expect(process.env.PGPASSWORD).toBe("YuXE9K7WWSIgYzIDRVNl")
		expect(process.env.DATABASE_URL).toBe(
			"postgres:YuXE9K7WWSIgYzIDRVNl@containers-us-west-121.railway.app:5736/railway"
		)
	})
})
