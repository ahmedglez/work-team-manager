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

const getAllUsers = () => {
	const text = "SELECT * FROM public.users ORDER BY id ASC";
	client
		.query(text)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getUserById = (id) => {
	const text = "SELECT * FROM users WHERE id = $1";
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

const getUserByNickname = (nickname) => {
	const text = "SELECT * FROM users WHERE nickname = $1";
	const values = [nickname];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getUserByEmail = (email) => {
	const text = "SELECT * FROM users WHERE email = $1";
	const values = [email];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getLastUser = () => {
	const text = "SELECT * FROM users ORDER BY id DESC LIMIT 1";
	client
		.query(text)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getUserByRole = (role) => {
	const text = "SELECT * FROM users WHERE role = $1";
	const values = [role];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getLastTenUsers = () => {
	const text = "SELECT * FROM users ORDER BY id DESC LIMIT 10";
	client
		.query(text)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
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

	const text =
		"UPDATE users SET nickname = $1, fullname = $2, phone = $3, mobile = $4, email = $5, password = $6, role = $7, ci = $8, address = $9 WHERE id = $10";
	const values = [
		nickname,
		fullname,
		phone,
		mobile,
		email,
		password,
		role,
		ci,
		address,
		id,
	];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const deleteUser = (id) => {
	const text = "DELETE FROM users WHERE id = $1";
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

const deleteLastUser = () => {
	const text =
		"DELETE FROM users WHERE id = (SELECT id FROM users ORDER BY id DESC LIMIT 1)";
	client
		.query()
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	getUserByNickname,
	getUserByEmail,
	getLastUser,
	getUserByRole,
	getLastTenUsers,
	deleteLastUser,
};
