const { faker } = require("@faker-js/faker");
const db = require("../connections/MongoDBConnection");
const TaskModel = require("../../schemas/tasks.schema");
const UserModel = require("../../schemas/user.schema");

const main = async () => {
	await TaskModel.deleteMany({});
	const users = await UserModel.find({});
    const statuses = ["pending", "in progress", "done"];
    const priorities = ["low", "medium", "high"];
    const admins = users.filter(user => user.roles.includes("admin"));
    const adminsFromDB = admins.map(admin => UserModel.findById(admin._id));
	const createFakeTasks = () => {
		const tasks = [];
		for (let i = 0; i < 100; i++) {
			let randomUserID =
                users[faker.random.numeric({ min: 0, max: users.length - 1 })]._id;
            let randomAdminID =
							admins[
								Math.floor(Math.random() * adminsFromDB.length)
							]._id;
			tasks.push({
				title: faker.lorem.sentence(),
				description: faker.lorem.paragraph(),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                priority: priorities[Math.floor(Math.random() * priorities.length)],
                assignedTo: [randomUserID],
                assignedBy: randomAdminID,
                expirationDate: faker.date.future(),
				createdAt: faker.date.past(),
				updatedAt: faker.date.recent(),
			});
		}
		return tasks;
	};

	const tasks = createFakeTasks();
	console.log(tasks);
	console.log("Inserting tasks...");
	tasks.forEach((task) => {
		TaskModel.create(task);
	});
	console.log("Tasks inserted!");
	console.log("Tasks:");
	TaskModel.find({}, (err, tasks) => {
		console.log(tasks);
	});

};

main();
