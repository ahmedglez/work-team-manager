const { config } = require("../../config/enviroment.config");
const { MongoClient } = require("mongodb");
/* migrate collection from database to another */

const migrateCollection = async (collectionName, fromDb, toDb) => {
	const fromCollection = fromDb.collection(collectionName);
	const toCollection = toDb.collection(collectionName);
	const cursor = fromCollection.find();
	while (await cursor.hasNext()) {
		const doc = await cursor.next();
		await toCollection.insertOne(doc);
	}
};

/* migrate all collections from database to another */
const migrateAllCollections = async (fromDb, toDb) => {
	const collections = await fromDb.listCollections().toArray();
	console.log("Collections to migrate: ", collections);
	for (const collection of collections) {
		console.log("Migrating collection: ", collection.name);
		/* create collection on toDB */
		await toDb.createCollection(collection.name);
		await migrateCollection(collection.name, fromDb, toDb);
	}
};

const main = async () => {
	console.log("Connecting to localDB: ", config.development.localDB);
	const fromDb = await MongoClient.connect(config.development.localDB, {});
	console.log("Connecting to remoteDB: ", config.development.dbURL);
	var toDb = await MongoClient.connect(config.development.dbURL, {});
	toDb = toDb.db("virtual-job-board-DB");
	console.log("Migrating data from localDB to remoteDB");
	await migrateAllCollections(fromDb, toDb);
	await fromDb.close();
	await toDb.close();
};

main();
