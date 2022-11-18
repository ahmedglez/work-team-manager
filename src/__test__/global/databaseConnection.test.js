const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});
const client = require("../../database/connection");

describe("Bateria de pruebas para la conexión a la base de datos", () => {
	test("Probando conexión a la base de datos", async () => {
		await client.connect();
		const res = await client.query("SELECT * FROM roles");
		expect(res.rows).toBeTruthy();
		await client.end();
	});
});
