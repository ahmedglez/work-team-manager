const client = require("../connection");

const createRole = (name, description) => {
	const id = require("uuid").v4();
	const text =
		"INSERT INTO public.roles (id, name, description) VALUES ($1, $2, $3) RETURNING *";
	const values = [id, name, description];
	client
		.query(text, values)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

const getAllRoles = () => {
	const text = "SELECT * FROM public.roles ORDER BY id ASC";
	client
		.query(text)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getRoleById = (id) => {
	const text = "SELECT * FROM roles WHERE id = $1";
	const values = [id];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getRoleByName = (name) => {
	const text = "SELECT * FROM roles WHERE name = $1";
	const values = [name];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const updateRole = (id, name, description) => {
	const text = "UPDATE roles SET name = $1, description = $2 WHERE id = $3";
	const values = [name, description, id];
	client
		.query(text, values)

		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = {
	createRole,
	getAllRoles,
	getRoleById,
	getRoleByName,
	updateRole,
};
