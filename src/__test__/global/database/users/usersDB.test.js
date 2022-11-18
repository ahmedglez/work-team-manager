const {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	deleteAllUsers,
	getUserByNickname,
	getUserByEmail,
	getLastUser,
	getUserByRole,
	getLastTenUsers,
	deleteLastUser,
} = require("../../../../database/crud/usersCrud");

describe("Bateria de pruebas para la tabla de clientes", () => {
	test("Probando la función getClients", async () => {
		const res = await getClients();
		expect(res.rows).toBeTruthy();
	});

	test("Probando la función getUserById", async () => {
		const res = await getUserById("1973678f-688d-491f-b09a-d902cf652bef");
		expect(res.rows).toBeTruthy();
	});

	test("Probando la función createUser", async () => {
		const res = await createUser(
			"Test",
			"Test",
			"Test",
			"Test",
			"Test",
			"Test",
			"Test",
			"Test",
			new Date()
		);
		expect(res).toBeTruthy();
	});

	test("Probando la función updateUser", async () => {
		const res = await updateUser(getLastUser().id, {
			nickname: "Test",
			fullname: "Test",
			phone: "Test",
			mobile: "Test",
			type: "Test",
			location: "Test",
			email: "Test",
			address: "Test",
		});
		expect(res).toBeTruthy();
	});

	test("Probando la función deleteLastUser", async () => {
		const res = await deleteLastUser();
		expect(res).toBeTruthy();
	});
});
