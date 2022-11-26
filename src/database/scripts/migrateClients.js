const { getAllClients, updateClient } = require("../crud/clientsCrud");
const ClientModel = require("../schemas/client.schema");
const db = require("../connections/MongoDBConnection");

const migrateClientsToMongo = async () => {
    const clients = await getAllClients();
    console.log(clients.rows.length);

	clients.rows.forEach((client) => {
		const model = new ClientModel({
			nickname: client.nickname,
			fullname: client.fullname,
			phone: client.phone,
			mobile: client.mobile,
			email: client.email,
			location: client.location,
			address: client.address,
            type: client.type,
            
        });
        
		model.save();
	});
};

migrateClientsToMongo().then(() => {
	console.log("done");
});
