const client = require("../connections/PgConnection");


/* CREATE */
const createTask = (
	title,
	description,
	address,
	client,
	importance = 1,
) => {
	const id = require("uuid").v4();
	const state = "1";
	const date = new Date();
	const users_assigned = [];
	const text =
		"INSERT INTO public.tasks(	id, title, description, address, state, client, importance, date, users_assigned)	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);";
	const values = [
		id,
		title,
		description,
		address,
		state,
		client,
		importance,
		date,
		users_assigned,
	];
	client
		.query(text, values)
		.then((res) => {
			console.log("Task created with ID: ", res.rows[0].id);
		})
		.catch((e) => console.error(e.stack));
};

/* QUERIES */
const getAllTasks = () => {
	const text = "SELECT * FROM public.tasks ORDER BY id ASC";
	client
		.query(text)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getTaskById = (id) => {
	const text = "SELECT * FROM tasks WHERE id = $1";
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

const getTaskbyClient = (client) => {
	const text = "SELECT * FROM tasks WHERE client = $1";
	const values = [client];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getTaskbyState = (state) => {
	const text = "SELECT * FROM tasks WHERE state = $1";
	const values = [state];
	client
		.query(text, values)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getRecentTasks = () => {
	const text = "SELECT * FROM tasks ORDER BY date DESC LIMIT 5";
	client
		.query(text)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getTaskInLastSevenDays = () => {
	const text =
		"SELECT * FROM tasks WHERE date BETWEEN NOW() - INTERVAL '7 days' AND NOW()";
	client
		.query(text)
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getUsersAssigned = (id) => {
	const text = "SELECT users_assigned FROM tasks WHERE id = $1";
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

/* ASSING USER TO A TASK */
const assignNewUserToTask = async (id, user) => {
	const text = "UPDATE tasks SET users_assigned = $1 WHERE id = $2";
	const users_assigned = await getUsersAssigned(id);
	const newUsers = [...users_assigned, user];
	const values = [newUsers, id];
	client
		.query(text, values)
		.then((res) => {
			console.log("User assigned to task");
		})
		.catch((err) => {
			console.log(err);
		});
};

/* REMOVE AN USER FROM A TASK */
const removeUserFromTask = async (id, user) => {
	const text = "UPDATE tasks SET users_assigned = $1 WHERE id = $2";
	const users_assigned = await getUsersAssigned(id);
	const newUsers = users_assigned.filter((u) => u !== user);
	const values = [newUsers, id];
	client
		.query(text, values)
		.then((res) => {
			console.log("User removed from task");
		})
		.catch((err) => {
			console.log(err);
		});
};

/* UPDATES */
const updateTask = (
	id,
	title,
	description,
	address,
	state,
	client,
	importance,
	users_assigned
) => {
	const text =
		"UPDATE tasks SET title = $1, description = $2, address = $3, state = $4, client = $5, importance = $6, users_assigned = $7 WHERE id = $8";
	const values = [
		title,
		description,
		address,
		state,
		client,
		importance,
		users_assigned,
		id,
	];
	client
		.query(text, values)
		.then((res) => {
			console.log("Task updated with ID: ", res.rows[0].id);
		})
		.catch((e) => console.error(e.stack));
};

const updateStateByID = (id, state) => {
	const text = "UPDATE tasks SET state = $1 WHERE id = $2";
	const values = [state, id];
	client
		.query(text, values)
		.then((res) => {
			console.log("Task updated with ID: ", res.rows[0].id);
		})
		.catch((e) => console.error(e.stack));
};

/* DELETIONS */
const deleteTask = (id) => {
	const text = "DELETE FROM tasks WHERE id = $1";
	const values = [id];
	client
		.query(text, values)
		.then((res) => {
			console.log("Task deleted with ID: ", res.rows[0].id);
		})
		.catch((e) => console.error(e.stack));
};

const deletAnUserFromTask = (id, user) => {
	const text = "UPDATE tasks SET users_assigned = $1 WHERE id = $2";
	const users_assigned = getUsersAssigned(id);
	const newUsers = users_assigned.filter((u) => u !== user);
	const values = [newUsers, id];
	return client
		.query(text, values)
}



module.exports = {
	createTask,
	getAllTasks,
	getTaskById,
	updateTask,
	deleteTask,
	getTaskbyClient,
	getTaskbyState,
	getRecentTasks,
	getTaskInLastSevenDays,
	updateStateByID,
	assignNewUserToTask,
	removeUserFromTask,
	deletAnUserFromTask,
};
