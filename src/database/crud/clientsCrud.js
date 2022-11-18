const client = require("../connection");

const createClient = (
	nickname,
	fullname,
	phone,
	mobile,
	location,
	email,
	address,
	type,
	created
) => {
	const id = require("uuid").v4();
	const text =
		"INSERT INTO public.clients (id,nickname,	fullname,	phone,	mobile,	location,	email,	address,	type,	created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
	const values = [
		id,
		nickname,
		fullname,
		phone,
		mobile,
		location,
		email,
		address,
		type,
		created,
	];
	client
		.query(text, values)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

const getClients = () => {
	client.query("SELECT * FROM clients ORDER BY id ASC", (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results.rows);
	});
};

const getClientById = (id) => {
	client.query(
		"SELECT * FROM clients WHERE id = $1",
		[id],
		(error, results) => {
			if (error) {
				throw error;
			}
			console.log(results.rows);
		}
	);
};

const getLastClient = () => {
	client.query(
		"SELECT * FROM clients ORDER BY id DESC LIMIT 1",
		(error, results) => {
			if (error) {
				throw error;
			}
			console.log(results.rows);
		}
	);
};

const getLastTenClients = () => {
	client.query(
		"SELECT * FROM clients ORDER BY id DESC LIMIT 10",
		(error, results) => {
			if (error) {
				throw error;
			}
			console.log(results.rows);
		}
	);
};

const getOldClients = (date) => {
	client.query(
		"SELECT * FROM clients WHERE created < $1",
		[date],
		(error, results) => {
			if (error) {
				throw error;
			}
			console.log(results.rows);
		}
	);
};

const updateClient = (id, client) => {
	const { nickname, fullname, phone, mobile, type, location, email, address } =
		client;
	client.query(
		"UPDATE clients SET nickname = $1, fullname = $2, phone = $3, mobile = $4, type = $5, location = $6, email = $7, address = $8 WHERE id = $9",
		[nickname, fullname, phone, mobile, type, location, email, address, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			console.log("User updated successfully");
		}
	);
};

const deleteClient = (id) => {
	client.query("DELETE FROM clients WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		console.log("User deleted successfully");
	});
};

const deleteAllClients = () => {
	client.query("DELETE FROM clients", (error, results) => {
		if (error) {
			throw error;
		}
		console.log("All users deleted successfully");
	});
};

module.exports = {
	createClient,
	getClients,
	getClientById,
	updateClient,
	deleteClient,
	deleteAllClients,
	getLastClient,
	getLastTenClients,
	getOldClients,
};
