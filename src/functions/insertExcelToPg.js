const readFromCSV = require("../utils/readFromCSV");
const { createUser } = require("../database/crud/usersCrud");

const clients = readFromCSV("../xlsx/Clientes.xlsx");
const workers = readFromCSV("../xlsx/Trabajadores.xlsx");

workers.map((worker) => {
	const ci = worker.CI || "";
	const fullname = worker["Nombre completo"] || "";
	const nickname = "nickname";
	const phone = worker["Teléfono particular"] || "";
	const mobile = worker["Número de teléfono móvil"] || "";
	const email = worker["Dirección de correo electrónico"] || "";
	const address = worker["Dirección"] || "";
	const password = "admin1234";
	const role = 1;

	createUser(
		nickname,
		fullname,
		phone,
		mobile,
		email,
		password,
		role,
		ci,
		address
	);
});


