const client = require("../connection");

const createUser = (
	nickname,
	fullname,
	phone,
	mobile,
	email,
	password,
	role,
	ci,
	address
) => {
	const id = require("uuid").v4();
	const text =
		"INSERT INTO public.users (id, nickname, fullname, phone, mobile, email, password, role, ci, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
	const values = [
		id,
		nickname,
		fullname,
		phone,
		mobile,
		email,
		password,
		role,
		ci,
		address,
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

const getUsers = () => {
	client.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results.rows);
	});
};

const getUserById = (id) => {
	client.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results.rows);
	});
};

const updateUser = (id, user) => {
	const {
		nickname,
		fullname,
		phone,
		mobile,
		email,
		password,
		role,
		ci,
		address,
	} = user;

	client.query(
		"UPDATE users SET nickname = $1, fullname = $2, phone = $3, mobile = $4, email = $5, password = $6, role = $7, ci = $8, address = $9 WHERE id = $10",
		[nickname, fullname, phone, mobile, email, password, role, ci, address, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			console.log(`User modified with ID: ${id}`);
		}
	);
};

const deleteUser = (id) => {
	client.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		console.log(`User deleted with ID: ${id}`);
	});
};

module.exports = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};
