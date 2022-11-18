const readFromCSV = require("../utils/readFromCSV");
const { createClient } = require("../database/crud/clientsCrud");

const clients = readFromCSV("../xlsx/Clientes.xlsx");

clients.map((client) => {
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
