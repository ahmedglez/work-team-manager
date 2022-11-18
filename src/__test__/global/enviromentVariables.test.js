const dotenv = require("dotenv")
dotenv.config({
	path: ".env",
})

describe("Bateria de pruebas para las variables de entorno", () => {
	test("Probando variables de entorno", () => {
		expect(process.env.PGUSER).toBe("postgres")
		expect(process.env.PGPORT).toBe("5433")
		expect(process.env.PGHOST).toBe("localhost")
		expect(process.env.PGDATABASE).toBe("workgroup")
		expect(process.env.PGPASSWORD).toBe("1234")
		expect(process.env.DATABASE_URL).toBe(
			"postgres://postgres:1234@localhost:5433/workgroup"
		)
	})
})
