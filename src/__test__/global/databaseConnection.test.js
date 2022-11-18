const client = require("../../database/connection");

describe("Bateria de pruebas para la conexión a la base de datos", () => {
	test("Probando conexión a la base de datos", async () => {
		const res = await client.query("SELECT * FROM roles");
		expect(res.rows).toBeTruthy();
		await client.end();
	});
});
