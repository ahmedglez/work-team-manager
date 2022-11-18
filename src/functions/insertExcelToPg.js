const readFromCSV = require("../utils/readFromCSV");
const { createClient } = require("../database/crud/clientsCrud");
const { createUser } = require("../database/crud/usersCrud");

const clients = readFromCSV("../xlsx/Clientes.xlsx");
const workers = readFromCSV("../xlsx/Trabajadores.xlsx");

workers.map((worker) => {
	console.log(worker);
	const ci = worker.CI || "";
	const nickname = "admin" + ci;
	const fullname = worker["Nombre completo"];
	const phone = worker["Teléfono particular"];
	const mobile = worker["Número de teléfono móvil"];
	const email = worker["Dirección de correo electrónico"];
	const password = "admin1234";
	const role = 1;
	const address = worker["Dirección"];

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

/* clients.map((client) => {
	const nickname = client["Nombre del Cliente"] || "";
	const fullname = client["Nombre del Cliente"] || "";
	const phone = client["Teléfono"] || "";
	const mobile = client.Celular || "";
	const location = client.Municipio || "";
	const email = "";
	const address = "";
	const type = client["Tipo de Cliente"];
	const created = new Date(client.Year, client.Mes, client.Dia);

	createClient(
		nickname,
		fullname,
		phone,
		mobile,
		location,
		email,
		address,
		type,
		created
	);
});
 */
