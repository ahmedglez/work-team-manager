const {
	getAllUsers,
	getUserById,
	getUserByNickname,
	getUserByEmail,
	getLastUser,
	getUserByRole,
	getLastTenUsers,
} = require("../../../../database/crud/usersCrud");


describe("Bateria de pruebas para la tabla de usuarios", () => {
	test("Probando la función getUserById", async () => {
		const res = getUserById("0affc818-deb1-4827-84ab-ded17fc47422");
		expect(res).toBeTruthy();
	});

	test("Probando la función getUserByNickname", async () => {
		const res = getUserByNickname("ahmedglez");
		expect(res).toBeTruthy();
	});

	test("Probando la función getUserByEmail", async () => {
		const res = getUserByEmail("ahmediglez@gmail.com");
		expect(res).toBeTruthy();
	});

	test("Probando la función getLastUser", async () => {
		const res = getLastUser();
		expect(res).toBeTruthy();
	});

	test("Probando la función getUserByRole", async () => {
		const res = getUserByRole("admin");
		expect(res).toBeTruthy();
	});

	test("Probando la función getLastTenUsers", async () => {
		const res = getLastTenUsers();
		expect(res).toBeTruthy();
	});

	test("Probando la función getAllUsers", async () => {
        const res = getAllUsers();
        console.log(res);
		expect(res).toBeTruthy();
	});
});
