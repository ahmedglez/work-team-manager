const client = require("../connections/PgConnection");

/* CREATE */
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
		"INSERT INTO public.users (id, nickname, fullname, phone, mobile, email, password, role, ci, address, photo, tasks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $11) RETURNING *";
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
		null,
		[],
	];
	return client.query(text, values);
};

/* QUERIES */
const getAllUsers = () => {
	const text = "SELECT * FROM public.users ORDER BY id ASC";
	return client.query(text);
};

const getUserById = (id) => {
	const text = "SELECT * FROM users WHERE id = $1";
	const values = [id];
	return client.query(text, values);
};

const getUserByNickname = (nickname) => {
	const text = "SELECT * FROM users WHERE nickname = $1";
	const values = [nickname];
	return client.query(text, values);
};

const getUserByEmail = (email) => {
	const text = "SELECT * FROM users WHERE email = $1";
	const values = [email];
	return client.query(text, values);
};

const getLastUser = () => {
	const text = "SELECT * FROM users ORDER BY id DESC LIMIT 1";
	client.query(text);
};

const getUserByRole = (role) => {
	const text = "SELECT * FROM users WHERE role = $1";
	const values = [role];
	return client.query(text, values);
};

const getLastTenUsers = () => {
	const text = "SELECT * FROM users ORDER BY id DESC LIMIT 10";
	client.query(text);
};

const getAllTasks = (id) => {
	const text = "SELECT tasks FROM users WHERE id = $1";
	const values = [id];
	return client.query(text, values);
};

/* UPDATES */
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
	return client.query(text, values);
};

const updatePasswordPg = (email, password) => {
	const text = "UPDATE users SET password = $1 WHERE email = $2";
	const values = [password, email];
	return client.query(text, values);
};

const updateUsername = (id, nickname) => {
	const text = "UPDATE users SET nickname = $1 WHERE id = $2";
	const values = [nickname, id];
	return client.query(text, values);
};

const updatePhoto = (id, photo) => {
	const text = "UPDATE users SET photo = $1 WHERE id = $2";
	const values = [photo, id];
	return client.query(text, values);
};

/* ASING NEW TASK */
const asingNewTask = (id, task) => {
	const text = "UPDATE users SET tasks = array_append(tasks, $1) WHERE id = $2";
	const values = [task, id];
	return client.query(text, values);
};

/* REMOVE TASK */
const removeTask = (id, task) => {
	const text = "UPDATE users SET tasks = array_remove(tasks, $1) WHERE id = $2";
	const values = [task, id];
	return client.query(text, values);
};

/* DELETIONS */
const deleteUser = (id) => {
	const text = "DELETE FROM users WHERE id = $1";
	const values = [id];
	return client.query(text, values);
};

const deleteLastUser = () => {
	const text =
		"DELETE FROM users WHERE id = (SELECT id FROM users ORDER BY id DESC LIMIT 1)";
	client.query();
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	updatePasswordPg,
	deleteUser,
	getUserByNickname,
	getUserByEmail,
	getLastUser,
	getUserByRole,
	getLastTenUsers,
	deleteLastUser,
	updateUsername,
	updatePhoto,
	getAllTasks,
	asingNewTask,
	removeTask,
};
